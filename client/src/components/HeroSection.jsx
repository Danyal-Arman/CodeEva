import React, { useState, useEffect } from "react";

import { useCreateRoomMutation } from "../features/api/roomApi";
import { useJoinRoomMutation } from "../features/api/roomApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const HeroSection = () => {
  const [roomId, setRoomId] = useState("");
  const [setUsername] = useState("");

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
      const name = result?.data?.room?.createdBy?.username;
      setRoomId(id);
      setUsername(name);
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
     <section className="relative md:py-32 px-6 bg-[#0f172a] overflow-hidden min-h-screen flex items-center justify-center">

  {/* Subtle top glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-6xl mx-auto text-center space-y-16">

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
      Practice Coding Interviews Together
      <span className="block text-purple-400 mt-3">
        With On-Demand AI Guidance
      </span>
    </h1>

    <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
      CodeEva is a collaborative coding workspace where students solve DSA problems,
      collaborate in real-time rooms, and get instant AI-powered guidance - all in one workspace.
    </p>

    <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
      <button className="bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-xl font-medium shadow-lg shadow-purple-500/20">
        Start Practicing Free
      </button>

      <button type="button" aria-label="Create room" onClick={handleCreateRoom}  className="border border-slate-700 hover:bg-slate-800 transition px-8 py-4 rounded-xl font-medium">
        Create Mock Interview Room
      </button>
    </div>

  </div>
</section>
  );
};

export default HeroSection;
