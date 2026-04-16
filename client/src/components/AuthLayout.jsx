import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="bg-black min-h-screen relative">
        <div className="bg-[url('/bg.jpg')] w-full h-screen bg-no-repeat bg-cover bg-center lg:blur-[10px] z-0 relative"></div>
        <div className="bg-[url('/bg.jpg')] absolute  h-[620px] w-[75%] bg-cover bg-center  bg-no-repeat top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">

          <div className="text-white lg:p-16 p-4 flex lg:flex-none lg:block justify-center ">
            <h1 className="text-2xl font-bold font-poppins text-center md:text-start z-10">
              CodeEva
            </h1>
            <div className="absolute lg:top-80 top-16 flex whitespace-normal break-normal flex-wrap justify-center lg:flex-none lg:block gap-1 ">
              <h1 className="font-bold lg:text-3xl text-2xl font-poppins blur-none z-10">
                Welcome{" "}
              </h1>
              <span className="font-bold lg:text-3xl text-2xl font-poppins z-20">
                To CoderClub
              </span>
              <p className="hidden lg:block">
                We've delighted to have you here. If you need <br />
                any assistance feel free to reach out.
              </p>
            </div>
          </div>
          <div className=" absolute top-0   right-0 w-full lg:w-[calc(100%-60%)] h-[100%] bg-transparent overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
