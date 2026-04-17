import { useEffect, useRef } from "react";

const useAIStream = (
  socket,
  setChatMessages,
  setStreamingText,
  setSummarizerMessages,
  setSummarizerStreamingText,
) => {
  // 🔥 queue system
  const queueRef = useRef({
    askAI: [],
    AISummarizer: [],
  });
  const typingRef = useRef({
    askAI: false,
    AISummarizer: false,
  });

  let currentStreamIdRef = useRef(null); // to track which stream is active

  const getDelay = (char) => {
    if (char === ".") return 80;
    if (char === ",") return 40;
    if (char === "\n") return 60;
    return 60;
  };
  useEffect(() => {
    if (!socket) return;

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    const processQueue = async (type) => {
      if (typingRef.current[type]) return;
      typingRef.current[type] = true;

      while (queueRef.current[type].length > 0) {
        const token = queueRef.current[type].shift();

        for (let char of token) {
          if (type === "askAI") {
            setStreamingText((prev) => prev + char);
          } else {
            setSummarizerStreamingText((prev) => prev + char);
          }
          await sleep(getDelay(char)); // 🔥 control speed
        }
      }

      typingRef.current[type] = false;
    };
    const handleAIStreamStart = ({ streamId }) => {
      currentStreamIdRef.current = streamId; // update current stream ID
      setStreamingText(""); // reset streaming text for new response
    };
    const handleAIStream = ({ streamId, token }) => {
      if (streamId !== currentStreamIdRef.current) return;
      queueRef.current.askAI.push(token);
      processQueue("askAI");
    };

    const handleAIStreamEnd = ({ streamId, aiMessage: finalMsg }) => {
      if (streamId !== currentStreamIdRef.current) return;
      setStreamingText("");
      setChatMessages((prev) => [...prev, finalMsg]);
      queueRef.current.askAI.length = 0; // reset queue
    };

    const handleSummarizerStreamStart = ({ streamId }) => {
      currentStreamIdRef.current = streamId; // update current stream ID
      setSummarizerStreamingText(""); // reset streaming text for new response
    };

    const handleSummarizerStream = ({ streamId, token }) => {
      if (streamId !== currentStreamIdRef.current) return;
      queueRef.current.AISummarizer.push(token);
      processQueue("AISummarizer");
    };

    const handleSummarizerStreamEnd = ({streamId, aiMessage: finalMsg}) => {
        if (streamId !== currentStreamIdRef.current) return;
      setSummarizerStreamingText("");
      setSummarizerMessages((prev) => [...prev, finalMsg]);
      queueRef.current.AISummarizer.length = 0;
    };

    const handleMessage = (msg) => { 
      setChatMessages((prev) => [...prev, msg]);
    };

    const handleSummarizerMessage = (msg) => {
      setSummarizerMessages((prev) => [...prev, msg]);
    };
    // ✅ register listeners
    socket.on("ai-stream-start", handleAIStreamStart);
    socket.on("ai-stream", handleAIStream);
    socket.on("ai-stream-end", handleAIStreamEnd);

    socket.on("ai-summarizer-stream-start", handleSummarizerStreamStart);
    socket.on("ai-summarizer-stream", handleSummarizerStream);
    socket.on("ai-summarizer-stream-end", handleSummarizerStreamEnd);

    socket.on("receive-ask-ai-message", handleMessage);
    socket.on("receive-ai-summarizer-message", handleSummarizerMessage);

    // ✅ cleanup (VERY IMPORTANT)
    return () => {
      socket.off("ai-stream-start", handleAIStreamStart);
      socket.off("ai-stream", handleAIStream);
      socket.off("ai-stream-end", handleAIStreamEnd);

      socket.off("ai-summarizer-stream-start", handleSummarizerStreamStart);
      socket.off("ai-summarizer-stream", handleSummarizerStream);
      socket.off("ai-summarizer-stream-end", handleSummarizerStreamEnd);
      
      socket.off("receive-ask-ai-message", handleMessage);
      socket.off("receive-ai-summarizer-message", handleSummarizerMessage);
    };
  }, [socket, setChatMessages, setSummarizerMessages, setStreamingText, setSummarizerStreamingText]);
};

export default useAIStream;
