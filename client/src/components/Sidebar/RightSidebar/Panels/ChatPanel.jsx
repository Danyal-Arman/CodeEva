import React from "react";
import { PanelRightClose, Send } from "lucide-react";

const ChatPanel = ({
  messages,
  inputMessage,
  setInputMessage,
  handleMessage,
  username,
  messagesEndRef,
  setIsChatSidebarOpen,
}) => {
  const handleSend = () => {
    if (inputMessage.trim()) {
      handleMessage();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col h-full min-h-0">
        <div className="p-4 font-bold text-violet-500 border-b border-zinc-200 dark:border-zinc-700 flex justify-between">
          <h1>Room Chat</h1>
          <button
            onClick={() => setIsChatSidebarOpen(false)}
            className="text-gray-700 dark:text-gray-300"
          >
            <PanelRightClose />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide custom-scrollbar  p-4 space-y-3">
          <section className="flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <article
                key={idx}
                className={`flex ${
                  msg.username === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-xl min-w-[50%] max-w-[70%] relative ${
                    msg.username === username
                      ? "bg-purple-600 border border-purple-800 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                  }`}
                >
                  {/* Header: Username + Time */}
                  <header className="flex items-center justify-between gap-2 mb-1 text-sm opacity-70 px-3 pt-3">
                    <span className="font-medium">{msg.username}</span>
                  </header>

                  {/* Message Text */}

                  <p className="break-words px-3 pb-3.5">{msg?.message}</p>
                  <time
                    className="text-xs opacity-60 text-right absolute right-1 bottom-0"
                    dateTime={msg?.createdAt}
                  >
                    {new Date(msg?.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  {/* </div> */}
                </div>
              </article>
            ))}
          </section>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-3 pt-3 pb-[3.2rem] mb-12 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 p-[0.65rem] rounded-md text-sm dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-md bg-purple-700 text-white text-sm font-medium hover:bg-blue-700 transition-all"
          >
            <Send />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
