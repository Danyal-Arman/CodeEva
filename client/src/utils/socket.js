import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {

    socket = io(import.meta.env.VITE_API_URL || "http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket"],
      autoConnect: false,
    });
  }
   
  return socket;
};
