import React, { useEffect, useRef, useState } from "react";
import { Mail, Lock } from "lucide-react";
import {
  useRequestPasswordResetMutation,
  useVerifyResetPasswordOtpMutation,
  useResetPasswordMutation,
} from "../features/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState(null); 
  const [isMailSent, setIsMailSent] = useState(false);
  const [isOtpSubmittedSuccessfull, setIsOtpSubmittedSuccessfull] = useState(false);
  const inputRefs = useRef([]);

  const [requestPasswordReset, { data, error, isSuccess, reset }] =
    useRequestPasswordResetMutation();

  const [
    verifyResetPasswordOtp,
    { data: otpData, error: otpError, isSuccess: otpIsSuccess },
  ] = useVerifyResetPasswordOtpMutation();

  const [
    resetPassword,
    { data: resetData, error: resetError, isSuccess: resetIsSuccess },
  ] = useResetPasswordMutation();

  const navigate = useNavigate();

  const onSubmitEmailHandler = async (e) => {
    e.preventDefault();
    console.log("email submitted:", email);
    await requestPasswordReset({ email });
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus();
    }
  };
  const onSubmitOtpHandler = async (e) => {
    e.preventDefault();
    const eachIndexValue = inputRefs.current.map((e) => e.value);
    const otpValue = eachIndexValue.join("");
    await verifyResetPasswordOtp({ email, otp: otpValue });
  };
  
  const onSubmitNewPasswordHandler = async (e) => {
    e.preventDefault()
    if(!resetToken) return null;
    console.log("Submitting new password with resetToken:", resetToken, "and newPassword:", newPassword);
    await resetPassword({ resetToken, newPassword });
  };
  
  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data?.message || "OTP sent to your email");
      setIsMailSent(true);
      reset();
    }
    
    if (error) {
      toast.error(error.data?.message || "Error sending OTP");
    }
  }, [
    isSuccess,
    data,
    error,
    reset,
  ]);
  
  useEffect(()=>{
    if(otpIsSuccess && otpData){
      toast.success(otpData?.message || "OTP verified successfully");
      console.log("Received resetToken:", otpData?.resetToken);
      setResetToken(otpData?.resetToken);
      setIsOtpSubmittedSuccessfull(true);
  }
  if(otpError){
    toast.error(otpError.data?.message || "Error verifying OTP");
  }
  },[otpData, otpIsSuccess, otpError])

  useEffect(()=>{
if (resetIsSuccess && resetData) {
      toast.success(resetData?.message || "Password reset successfully");
      navigate("/login");
    }
    if (resetError) {
      toast.error(resetError.data?.message || "Error resetting password");
    }
  }, [resetData, resetIsSuccess, resetError, navigate])

  return (
    <div className="backdrop-blur-md overflow-hidden h-[100%] text-white relative ">
      {!isMailSent && (
        <form
          className="flex flex-col px-5 py-24 md:py-48 lg:py-24 space-y-10 absolute w-full top-28 md:top-0"
          onSubmit={onSubmitEmailHandler}
        >
          <label
            className="text-2xl font-poppins font-semibold text-center"
            htmlFor="Reset Password"
          >
            Reset Password
          </label>
          <h2 className="text-center text-lg">
            Enter the registered email address
          </h2>

          <div className="space-y-10 relative ">
            <div className="flex flex-col relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="peer bg-transparent border-none outline-none"
                type="email"
                placeholder=" "
                name="email"
                id="email"
                value={email}
                required
              />
              <label
                className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-5 duration-300 ${
                  email ? "-top-5" : "-top-2"
                }`}
                htmlFor="email"
              >
                Email
              </label>
              <span className="border-b-2 border-b-[#e4e4e4] ">
                <Mail className="absolute right-0 bottom-1" />
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <input
              className="bg-[#37ceac] py-2 px-10 rounded-md w-fit hover:cursor-pointer"
              type="submit"
            />
          </div>
        </form>
      )}
      {isMailSent && !isOtpSubmittedSuccessfull && (
        <form
          onSubmit={onSubmitOtpHandler}
          className="flex flex-col px-5 py-20 md:py-28 space-y-10 md:space-y-16 absolute w-full top-28 md:top-0"
        >
          <label
            className="text-2xl font-poppins font-semibold text-center"
            htmlFor="reset password oTP"
          >
            Reset Password OTP
          </label>
          <h2 className="text-center text-lg">
            Enter the 6-digit otp sent to your email
          </h2>

          <div className="flex justify-center gap-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(e) => {
                    inputRefs.current[index] = e;
                  }}
                  onInput={(e) => handleInput(e, index)}
                  type="text"
                  key={index}
                  maxLength={"1"}
                  required
                  className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-md text-center text-xl outline-none focus:ring-1 focus:ring-[#37ceac]"
                />
              ))}
          </div>
          {/* <div className="flex justify-center"> */}
          <input className="bg-[#37ceac] py-2 rounded-md mx-20" type="submit" />
          {/* </div> */}
        </form>
      )}
      {isMailSent && isOtpSubmittedSuccessfull && (
        <form
          className="flex flex-col px-5 py-24 space-y-10 md:space-y-5 absolute w-full top-28 md:top-0"
          onSubmit={onSubmitNewPasswordHandler}
        >
          <label
            className="text-2xl font-poppins font-semibold text-center"
            htmlFor="Reset Password"
          >
            Reset Password
          </label>

          <h2 className="text-center text-lg">Enter the new password below</h2>

          <div className="space-y-10 relative ">
            <div className="flex flex-col relative">
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer bg-transparent border-none outline-none"
                type="password"
                placeholder=" "
                name="password"
                value={newPassword}
                required
              />
              <label
                className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-5 duration-300 ${
                  newPassword ? "-top-5" : "-top-2"
                }`}
                htmlFor="Name"
              >
                Password
              </label>
              <span className="border-b-2 border-b-[#e4e4e4] ">
                <Lock className="absolute right-0 bottom-1" />
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <input
              className="bg-[#37ceac] py-2 px-10 rounded-md w-fit hover:cursor-pointer"
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
