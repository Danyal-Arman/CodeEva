import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useRegisterUserMutation } from "../features/api/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import GoogleLogin from "../components/GoogleLogin";

const Signup = () => {
  const [registerInput, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerUser, { data, isSuccess, error }] = useRegisterUserMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const {setUser} = useAuth();
  const from = location.state?.from || "/";


  const handleSignup = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerInput, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await registerUser(registerInput);
  };
  localStorage.setItem("token", data?.token);

  useEffect(() => {
    if (isSuccess && data?.user) {
      toast.success(data?.message || "Room is successfully created");
      setUser(data.user);
      navigate("/verify-email", {state:{from}});
    }
    if (error) {
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      }
    }
  }, [isSuccess, error, data, navigate, setUser, from]);

  return (
    <div
      className="backdrop-blur-md
     overflow-hidden h-[100%] text-white relative"
    >
      <div
        
        className="flex flex-col px-5 py-20 md:py-48 lg:py-24  space-y-5 absolute top-28 md:top-0 w-full"
      >
      

      <form
        onSubmit={onSubmit}
        className="flex flex-col space-y-5"
      >
        <label
          className="text-2xl font-poppins font-semibold text-center"
          htmlFor="signup"
        >
          SignUp
        </label>

        <div className="space-y-10 relative">
          <div className="flex flex-col relative">
            <input
              onChange={handleSignup}
              className="peer bg-transparent border-none outline-none "
              type="text"
              placeholder=""
              name="username"
              id="username"
              value={registerInput.username}
            />
            <label
              className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-6 duration-300 ${
                registerInput.username ? "-top-6" : "-top-2"
              }`}
              htmlFor="username"
            >
              Name
            </label>
            <span className="border-b-2 border-b-[#e4e4e4] ">
              <User className="absolute bottom-1 right-0" />
            </span>
          </div>

          <div className="flex flex-col relative">
            <input
              onChange={handleSignup}
              className="peer bg-transparent border-none outline-none"
              type="email"
              placeholder=" "
              name="email"
              id="email"
              value={registerInput.email}
            />
            <label
              className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-6 duration-300 ${
                registerInput.email ? "-top-6" : "-top-2"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <span className="border-b-2 border-b-[#e4e4e4]">
              <Mail className="absolute bottom-1 right-0" />
            </span>
          </div>

          <div className="flex flex-col relative">
            <input
              onChange={handleSignup}
              className="peer bg-transparent border-none outline-none"
              type="password"
              placeholder=" "
              name="password"
              id="password"
              value={registerInput.password}
            />
            <label
              className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-6 duration-300 ${
                registerInput.password ? "-top-6" : "-top-2"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <span className="border-b-2 border-b-[#e4e4e4]">
              <Lock className="absolute bottom-1 right-0" />
            </span>
          </div>
          <div className="space-y-5 flex flex-col justify-center items-center">
            <input
              className="bg-[#37ceac] w-full rounded-md py-2 cursor-pointer"
              type="submit"
            />
            <p>
              Already have an Account?{" "}
              <Link className="text-blue-600" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
      {/* Google Login  */}
      <GoogleLogin />
    </div>
        </div>
  );
};

export default Signup;
