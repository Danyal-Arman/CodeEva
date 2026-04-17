import React, { useRef, useEffect } from "react";
import { useVerifyEmailMutation } from "../features/api/authApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserBasic } from "../hooks/useUserBasic";
import { useAuth } from "../hooks/useAuth";

const EmailVerify = () => {
  const inputRefs = useRef([]);
  const [verifyEmail, { data, isSuccess, error }] = useVerifyEmailMutation();
  const {isLoggedIn, isAccountVerified} = useUserBasic();
  const navigate = useNavigate();
  const location = useLocation();
  const {refetchUser} = useAuth();

  const from = location.state?.from || "/";
  const hasShownToastRef = useRef(false);

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
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const eachIndexValue = inputRefs.current.map((e) => e.value);
    const otp = eachIndexValue.join("");
    await verifyEmail({otp});
  };

 useEffect (()=>{
      if (isSuccess && data?.user && !hasShownToastRef.current) {
        hasShownToastRef.current = true;
        toast.success(data?.message || "Email verified successfully");
        const verifyAndRedirect = async () => {
          await refetchUser();
          navigate(from, { replace: true });
        }
        verifyAndRedirect();
      }
      if(error){
        hasShownToastRef.current = true;
        toast.error(error.data?.message || "Error verifying email");
      }
      if(isLoggedIn && isAccountVerified) {
       navigate("/")
      }
  },[isSuccess, error, data, isLoggedIn, isAccountVerified, navigate, from, refetchUser])
  return (
    <div className="backdrop-blur-md overflow-hidden h-[100%] text-white relative">
      <form
        className="flex flex-col px-5 py-20 md:py-48 lg:py-20 space-y-10 md:space-y-16 absolute w-full top-28 md:top-0"
        onSubmit={onSubmitHandler}
      >
        <label
          className="text-2xl font-poppins font-semibold text-center"
          htmlFor="Verify Account"
        >
          Verify Account
        </label>

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
        <input
          className="bg-[#37ceac] py-2 rounded-md mx-20"
          type="submit"
        />
      </form>
    </div>
  );
};

export default EmailVerify;
