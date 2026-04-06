import { useEffect, useRef } from "react";

const useChatScroll = (messages) => {
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) return;

    if (lastMsg.isStreaming) return;

    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: lastMsg.role === "ai" ? "start" : "end",
    });
  }, [messages]);

  return { containerRef, lastMessageRef };
};

export default useChatScroll;