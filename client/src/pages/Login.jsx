import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useLoginUserMutation } from "../features/api/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import GoogleLogin from "../components/GoogleLogin";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [loginUser, { data, error, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const from = location.state?.from || "/";

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await loginUser(loginInput);
  };
  localStorage.setItem("token", data?.token);

  useEffect(() => {
    if (isSuccess && data?.user) {
      toast.success(data?.message || "Logged in successfully");
      setUser(data.user);
      navigate(from, { replace: true });
    }
    if (error) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, error, data]);

  return (
    <div className="backdrop-blur-md overflow-hidden h-[100%] text-white relative">
      <div
        className="flex flex-col px-5 py-24 md:py-48 lg:py-24 space-y-5 absolute w-full top-28 md:top-0"
      >

      <form
        onSubmit={onSubmit}
        className="flex flex-col space-y-10 md:space-y-5"
        action=""
      >
        <label
          className="text-2xl font-poppins font-semibold text-center"
          htmlFor="Login"
        >
          Login
        </label>

        <div className="space-y-10 relative">
          <div className="flex flex-col relative">
            <input
              onChange={handleLoginInput}
              className="peer bg-transparent border-none outline-none"
              type="email"
              placeholder=" "
              name="email"
              id="email"
              value={loginInput.email}
            />
            <label
              className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-5 duration-300 ${
                loginInput.email ? "-top-5" : "-top-2"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <span className="border-b-2 border-b-[#e4e4e4] ">
              <Mail className="absolute right-0 bottom-1" />
            </span>
          </div>

          <div className="flex flex-col relative">
            <input
              onChange={handleLoginInput}
              className="peer bg-transparent border-none outline-none"
              type="password"
              placeholder=" "
              name="password"
              id="password"
              value={loginInput.password}
            />
            <label
              className={`absolute left-0  transition-all peer-placeholder-shown:-top-2  peer-focus:-top-5 duration-300 ${
                loginInput.password ? "-top-5" : "-top-2"
              }`}
              htmlFor="Password"
            >
              Password
            </label>
            <span className="border-b-2 border-b-[#e4e4e4] ">
              <Lock className="absolute right-0 bottom-8" />
            </span>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-blue-500 ">
                <Link to={"/reset-password"}>Forgot Password?</Link>
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <input
              className="bg-[#37ceac] w-full rounded-md py-2 cursor-pointer"
              type="submit"
            />

            <p>
              Don't have an account?
              <Link className="text-blue-500" to="/register" state={{ from }}>
                {" "}
                Create an account
              </Link>
            </p>
        </div>
          </div>
      </form>
      <GoogleLogin />
        </div>
    </div>
  );
};

export default Login;
