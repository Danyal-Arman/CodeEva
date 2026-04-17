import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Hand, Send, User } from "lucide-react";
import { Bot } from "lucide-react";

import { getSocket } from "../../../../utils/socket";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useTheme } from "../../../../context/ThemeContext";
import { useParams } from "react-router-dom";
import {
  useGetAIChatMessagesByRoomQuery,
  useGetAISummarizerMessagesByRoomQuery,
} from "../../../../features/api/roomApi";
import useAIStream from "../../../../utils/useAIStream";
import useChatScroll from "../../../../utils/useChatScroll";

const CodeMirror = React.lazy(() => import("@uiw/react-codemirror"));

const AIPanel = ({ editorRef }) => {
  const [activeTab, setActiveTab] = useState("chat"); // "chat" or "summarizer"
  const [chatMessages, setChatMessages] = useState([]);
  const [summarizerMessages, setsummarizerMessages] = useState([]);
  const [prompt, setPrompt] = useState(""); // used for chat
  const [codeInput, setCodeInput] = useState(""); // used for summarizer
  const { currentTheme } = useTheme();
  const [streamingText, setStreamingText] = useState("");
  const [summarizerStreamingText, setSummarizerStreamingText] = useState("");
  const [collapsedMessages, setCollapsedMessages] = useState({});

  const params = useParams();
  const { roomId } = params;

  const { data: AskAIData } = useGetAIChatMessagesByRoomQuery(roomId);
  const { data: AISummarizerData } =
    useGetAISummarizerMessagesByRoomQuery(roomId);

  const socket = getSocket();

  useAIStream(
    socket,
    setChatMessages,
    setStreamingText,
    setsummarizerMessages,
    setSummarizerStreamingText,
  );

  const handleAskAIChatBot = () => {
    if (!prompt.trim() || !roomId || !socket.connected) return;
    socket.emit("ask-ai", { roomId, prompt });
  };

  const handleAskAICodeSummarizer = () => {
    if (!codeInput.trim() || !roomId || !socket.connected) return;
    socket.emit("ask-ai-summarizer", {
      roomId,
      prompt: codeInput,
      code: editorRef?.current?.getValue() || "",
    });
  };

  useEffect(() => {
    if (AskAIData?.messages && chatMessages.length === 0 && !streamingText) {
      setChatMessages(AskAIData.messages);
    }
  }, [AskAIData, chatMessages.length, streamingText]);

  useEffect(() => {
    if (
      AISummarizerData?.messages &&
      summarizerMessages.length === 0 &&
      !summarizerStreamingText
    ) {
      setsummarizerMessages(AISummarizerData?.messages);
    }
  }, [AISummarizerData, summarizerMessages.length, summarizerStreamingText]);

  const isLastMessageAI = chatMessages[chatMessages.length - 1]?.role === "ai";

  const messagesToRender =
    streamingText && !isLastMessageAI
      ? [
          ...chatMessages,
          { role: "ai", message: streamingText, isStreaming: true },
        ]
      : chatMessages;

  const isLastSummarizerMessageAI =
    summarizerMessages[summarizerMessages.length - 1]?.role === "ai";

  const summarizerMessagesToRender =
    summarizerStreamingText && !isLastSummarizerMessageAI
      ? [
          ...summarizerMessages,
          { role: "ai", message: summarizerStreamingText, isStreaming: true },
        ]
      : summarizerMessages;

  const messages =
    activeTab === "chat" ? messagesToRender : summarizerMessagesToRender;
  const { lastMessageRef } = useChatScroll(messages);

  const groupedMessages = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === "user") {
      groupedMessages.push({
        user: messages[i],
        ai: messages[i + 1] || null,
      });
    }
  }


  const toggleCollapse = (id) => {
    setCollapsedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Tabs */}
      <div className="flex border-b text-black dark:text-white border-gray-300 dark:border-gray-800 relative">
        <button
          type="button"
          aria-label="AI chat"
          className={`flex-1 border-r text-black dark:text-white  dark:border-gray-800 py-3 text-sm font-semibold `}
          onClick={() => setActiveTab("chat")}
        >
          Ask AI
        </button>
        <button
          type="button"
          aria-label="AI code summarizer"
          className={`flex-1 py-3 text-sm font-semibold 
         
              `}
          onClick={() => setActiveTab("summarizer")}
        >
          AI Summarizer
        </button>

        <span
          className={`absolute top-8 z-10 ${
            activeTab === "summarizer" ? "right-[35%]" : "right-[60%]"
          } trasition-all duration-700 right-4 dark:text-purple-500`}
        >
          <Hand className="dark:fill-black fill-white" />
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar">
        <div className="lg:max-w-7xl mx-auto">
          {activeTab === "chat" ? (
            groupedMessages?.length > 0 ? (
              <>
                {groupedMessages.map((group, i) => {
                  let { user, ai } = group;

                  const id = user?._id || `group-${i}`;

                  let collapsed =
                    collapsedMessages[id] ?? i < groupedMessages.length - 2;
                  if (ai?.isStreaming) {
                    collapsed = false;
                  }
                  return (
                    // <>
                    <div
                      ref={
                        i === groupedMessages.length - 1 ? lastMessageRef : null
                      }
                      // key={
                      //   msg._id ||
                      //   `${msg.isStreaming ? "streaming" : "final"}-${i}`
                      // }
                      key={id}
                      className={`flex flex-col gap-3 mb-6`}
                    >
                     
                      <div className="flex justify-start gap-2">
                        <span className="bg-purple-800 dark:bg-zinc-700/40 h-fit p-1 rounded-lg">
                          <User className="w-4 h-4" />
                        </span>
                        <div
                          onClick={() => toggleCollapse(id)}
                          className="flex items-center gap-2 cursor-pointer 
               bg-gray-100 dark:bg-zinc-800 
               border dark:border-zinc-700 
               px-3 py-2 rounded-lg 
               hover:bg-gray-200 dark:hover:bg-zinc-700 
               transition max-w-[80%]"
                        >
                          {/* User icon */}

                          <span className="text-xs">
                            {collapsed ? "▶" : "▼"}
                          </span>
                          <p
                            className={`text-sm font-medium text-black dark:text-white ${collapsed ? "line-clamp-1" : ""}`}
                          >
                            {user?.message}
                          </p>
                        </div>
                      </div>

                      {/* PREVIEW WHEN COLLAPSED */}
                      {collapsed && ai && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 px-1">
                          {ai.message}
                        </p>
                      )}

                      {/* AI RESPONSE */}
                      {!collapsed && ai && (
                        <div className="mt-2 flex gap-3">
                          <span className="bg-purple-600 h-fit rounded-lg p-1">
                            <Bot className="w-5 h-5" />
                          </span>

                          <div
                            className="p-3 rounded-lg 
                          bg-gray-50 dark:bg-zinc-700/20 
                          border dark:border-zinc-800 
                          text-black dark:text-white 
                          max-w-[90%] whitespace-pre-wrap break-words"
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeHighlight]}
                            >
                              {ai.message}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}
                      {/* {msg.role === "user" && (
                      <span className="bg-purple-800 dark:bg-zinc-700/40 h-fit p-1 rounded-lg">
                        <User className="w-5 h-5" />
                      </span>
                    )} */}
                    </div>
                    // </>
                  );
                })}
              </>
            ) : (
              <p className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                Ask AI anything...
              </p>
            )
          ) : groupedMessages.length > 0 ? (
            <>
              {groupedMessages.map((group, i) => {
                  let { user, ai } = group;

                  const id = user?._id || `group-${i}`;

                  let collapsed =
                    collapsedMessages[id] ?? i < groupedMessages.length - 2;
                  if (ai?.isStreaming) {
                    collapsed = false;
                  }
                  return (
                    // <>
                    <div
                      ref={
                        i === groupedMessages.length - 1 ? lastMessageRef : null
                      }
                      // key={
                      //   msg._id ||
                      //   `${msg.isStreaming ? "streaming" : "final"}-${i}`
                      // }
                      key={id}
                      className={`flex flex-col gap-3 mb-6`}
                    >
                     
                      <div className="flex justify-start gap-2">
                        <span className="bg-purple-800 dark:bg-zinc-700/40 h-fit p-1 rounded-lg">
                          <User className="w-4 h-4" />
                        </span>
                        <div
                          onClick={() => toggleCollapse(id)}
                          className="flex items-center gap-2 cursor-pointer 
               bg-gray-100 dark:bg-zinc-800 
               border dark:border-zinc-700 
               px-3 py-2 rounded-lg 
               hover:bg-gray-200 dark:hover:bg-zinc-700 
               transition max-w-[80%]"
                        >
                          {/* User icon */}

                          <span className="text-xs">
                            {collapsed ? "▶" : "▼"}
                          </span>
                          <p
                            className={`text-sm font-medium text-black dark:text-white ${collapsed ? "line-clamp-1" : ""}`}
                          >
                            {user?.message}
                          </p>
                        </div>
                      </div>

                      {/* PREVIEW WHEN COLLAPSED */}
                      {collapsed && ai && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 px-1">
                          {ai.message}
                        </p>
                      )}

                      {/* AI RESPONSE */}
                      {!collapsed && ai && (
                        <div className="mt-2 flex gap-3">
                          <span className="bg-purple-600 h-fit rounded-lg p-1">
                            <Bot className="w-5 h-5" />
                          </span>

                          <div
                            className="p-3 rounded-lg 
                          bg-gray-50 dark:bg-zinc-700/20 
                          border dark:border-zinc-800 
                          text-black dark:text-white 
                          max-w-[90%] whitespace-pre-wrap break-words"
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeHighlight]}
                            >
                              {ai.message}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}
                      {/* {msg.role === "user" && (
                      <span className="bg-purple-800 dark:bg-zinc-700/40 h-fit p-1 rounded-lg">
                        <User className="w-5 h-5" />
                      </span>
                    )} */}
                    </div>
                    // </>
                  );
                })}
            </>
          ) : (
            <p className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm text-center">
              Ask and get what you want a code <br /> summary, Bug fix,
              explanation...
            </p>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 mb-[5.5rem] border-t dark:border-gray-700 flex  gap-2  w-full lg:max-w-7xl lg:mx-auto">
        {activeTab === "chat" ? (
          <textarea
            type="text"
            rows={2}
            className={`w-full resize-none p-2.5 rounded-md dark:border-gray-600
  bg-white dark:bg-zinc-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-600
  text-sm text-black dark:text-white scrollbar-hide whitespace-normal break-normal 
  transition-all duration-500 ${prompt.length < 1 ? "h-10" : "h-28"}`}
            placeholder="Type a message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        ) : (
          <CodeMirror
            value={codeInput}
            placeholder={"Paste your code and get the summarization..."}
            height={codeInput.length < 1 ? "40px" : "120px"}
            width="100vw"
            theme={currentTheme === "dark" ? vscodeDark : githubLight}
            extensions={[loadLanguage("javascript") || []]}
            onChange={(value) => setCodeInput(value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden whitespace-normal break-normal "
          />
        )}
        <div className="h-full flex items-end">
          <button
            type="button"
            onClick={
              activeTab === "chat"
                ? handleAskAIChatBot
                : handleAskAICodeSummarizer
            }
            className="bg-purple-700 p-[0.5rem] rounded-md"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPanel;
