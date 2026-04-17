import { useEffect } from "react";
import { getSocket } from "./socket";

const useChat = ({ roomId, username, onReceive }) => {
  const socket = getSocket();

  useEffect(() => {
    if (!roomId || !username) return;

    const handleReceiveMessage = (newMessage) => {
      onReceive(newMessage); // let parent handle state
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [roomId, username, socket, onReceive]);

  const sendMessage = (message) => {
    socket.emit("send-message", {
      roomId,
      message,
      username,
    });
  };
  return { sendMessage };
};

export default useChat;
