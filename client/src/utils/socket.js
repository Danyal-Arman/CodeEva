import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {

    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  return socket;
};
