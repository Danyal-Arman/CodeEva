import React, { useState, useEffect } from "react";

import { useCreateRoomMutation } from "../../features/api/roomApi";
import { useJoinRoomMutation } from "../../features/api/roomApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// const HeroSection = () => {
 

  
  
//   return (
//      <section className="relative md:py-32 px-6 bg-[#0f172a] overflow-hidden min-h-screen flex items-center justify-center">

//   {/* Subtle top glow */}
//   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_60%)] pointer-events-none" />

//   <div className="relative max-w-6xl mx-auto text-center space-y-16">

//     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
//       Practice Coding Interviews Together
//       <span className="block text-purple-400 mt-3">
//         With On-Demand AI Guidance
//       </span>
//     </h1>

//     <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
//       CodeEva is a collaborative coding workspace where students solve DSA problems,
//       collaborate in real-time rooms, and get instant AI-powered guidance - all in one workspace.
//     </p>

//     <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
//       <button className="bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-xl font-medium shadow-lg shadow-purple-500/20">
//         Start Practicing Free
//       </button>

//       <button type="button" aria-label="Create room" onClick={handleCreateRoom}  className="border border-slate-700 hover:bg-slate-800 transition px-8 py-4 rounded-xl font-medium">
//         Create Mock Interview Room
//       </button>
//     </div>

//   </div>
// </section>
//   );
// };

// export default HeroSection;


import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

import GradientButton from "../GradientButton";
import GhostButton from "../GhostButton";
import ProductPreview from "./ProductPreview";


const Hero = () => {
   const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const [createRoom, { data, isLoading, isSuccess, error }] =
    useCreateRoomMutation();

  const [
    {
      data: joinData,
      isSuccess: joinSuccess,
      error: joinError,
    },
  ] = useJoinRoomMutation();

  const handleCreateRoom = async () => {
    const result = await createRoom();
    if (result?.data) {
      const id = result?.data?.room?.roomId;
      // const name = result?.data?.room?.createdBy?.username;
      setRoomId(id);
    }
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Room is successfully created");
      navigate(`/editor/${roomId}`);
    }
    if (error) {
      const message = error?.data?.message || "Something went wrong";
      toast.error(message);
      if (error?.status === 403) {
        navigate("/verify-email", { replace: true });
      }
    }
  }, [isLoading, isSuccess, error, roomId,  data?.message,  navigate]);

  useEffect(() => {
    if (joinSuccess) {
      toast.success(joinData?.message || "Room successfully joined");

      if (roomId) {
        navigate(`/editor/${roomId}`, { replace: true });
      }
    }

    if (joinError) {
      const message = joinError?.data?.message || "Something went wrong";

      toast.error(message);

      if (joinError?.status === 403) {
        navigate("/verify-email", { replace: true });
      }
    }
  }, [joinSuccess, joinError, joinData?.message, roomId, navigate]);

  return (
    <section className="relative pb-24 pt-40 sm:pb-32 sm:pt-48">
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">

          {/* Announcement */}

          <a
            href="#"
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] text-muted-foreground transition hover:text-foreground animate-fade-up"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
            </span>

            <span>
              Introducing CodeEva 2.0 — AI Pair Programming
            </span>

            <ChevronRight className="h-3.5 w-3.5" />
          </a>

          {/* Heading */}

          <h1
            className="text-gradient max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-[76px] animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Practice coding interviews{" "}
            <span className="text-gradient-violet font-display font-normal italic">
              together.
            </span>
          </h1>

          {/* Subtitle */}

          <p
            className="mt-6 max-w-xl text-balance text-[16px] leading-relaxed text-muted-foreground sm:text-[17px] animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Code in real time. Solve problems together. Get AI guidance.
            Ace technical interviews inside a collaborative browser workspace.
          </p>

          {/* CTA */}

          <div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <GradientButton
              size="lg"
              // to={isLoggedIn ? "/dashboard" : "/register"}
              onClick={handleCreateRoom}
            >
              {/* <button type="button" aria-label="Create Room" onClick={handleCreateRoom}> */}
                Start Coding Free
              {/* </button> */}
            </GradientButton>

            <GhostButton
              onClick={() =>
                document
                  .getElementById("product-preview")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Live Demo
            </GhostButton>
          </div>

          {/* Features */}

          <div
            className="mt-6 flex items-center gap-4 text-[12.5px] text-muted-foreground animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-violet" />
              Free forever plan
            </span>

            <span className="text-white/20">•</span>

            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-violet" />
              No credit card
            </span>
          </div>
        </div>

        {/* Product Preview */}

        <div
          id="product-preview"
          className="relative mt-16 animate-fade-up"
          style={{ animationDelay: "420ms" }}
        >
          <div className="absolute -bottom-10 -top-10 -inset-x-20 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.14_165/0.25),transparent_60%)] blur-2xl" />

          <ProductPreview />
        </div>
      </div>
    </section>
  );
};

export default Hero;