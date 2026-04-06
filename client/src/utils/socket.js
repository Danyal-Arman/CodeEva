import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    // const token = localStorage.getItem("token");

    // if (!token) console.warn("⚠️ No token found in localStorage!");

    socket = io("http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  return socket;
};
