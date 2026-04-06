import React, { useState } from 'react'

const ChatBubble = ({
  setIsChatSidebarOpen,
  handleMessage,
  inputMessage,
  setInputMessage,
  messages,
  username,
  messagesEndRef,
  isAiSidebarOpen
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false)


  return (
    <>
     {!isAiSidebarOpen && <div>
        <button
          className="fixed bottom-4 right-5 z-10 p-2 bg-blue-500/90 rounded-full shadow-lg hover:scale-105 hover:bg-blue-700 transition duration-500 animate-bounce-slow"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <img src="/chat.svg" alt="Chat" className="w-8 h-8" />
        </button>
      </div>}

      {isChatOpen && (
        <div>
          <div className="fixed bottom-20 right-6 z-40 w-80 h-64 bg-white border border-gray-200  dark:border-zinc-800  shadow-xl rounded-xl animate-fadeIn flex flex-col">

            {/* Header */}
            <div className="flex w-full justify-end px-6 border-b dark:border-gray-700 py-2 dark:bg-zinc-800 ">
              <button onClick={() => setIsChatSidebarOpen(true)} className="text-black dark:text-white hover:text-blue-600 text-sm">
                Open Chat
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-2 dark:bg-zinc-800 dark:scrollbar-hide">
               {messages.map((msg, index) => {
                const isOwn = msg.username === username
                return (
                  <div key={index} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex items-end gap-2 max-w-[80%]">
                      {!isOwn && (
                        <img
                          src="https://i.pravatar.cc/40?img=3"
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      )}

                      <div className={`relative py-2 px-3 rounded-2xl text-sm ${isOwn ? 'bg-green-200 rounded-br-none' : 'bg-zinc-300 rounded-bl-none'}`}>
                        <div className="font-semibold text-xs mb-1 text-gray-700">
                          {isOwn ? 'You' : msg.username}
                        </div>
                        <div className="text-gray-800  break-words">{msg.message}</div>

                        {/* Tail */}
                        <div className={`absolute bottom-0 w-0 h-0
                          ${isOwn
                            ? '-right-1 border-t-[10px] border-t-green-200 border-r-[10px] border-r-transparent'
                            : '-left-1 border-t-[10px] border-t-zinc-300 border-l-[10px] border-l-transparent'
                          }`}>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex gap-2 p-2 border-t border-gray-200 dark:border-gray-700 dark:bg-zinc-800">
              <input
                className="bg-zinc-200 text-black rounded-md w-full p-1.5"
                type="text"
                placeholder="Type a message"
                onChange={(e) => setInputMessage(e.target.value)}
                value={inputMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleMessage()
                }}
              />
              <button onClick={handleMessage} className="bg-zinc-700 rounded-full">
                <img src="/send_24dp_FFFFFF.svg" alt="Send" className="w-10 h-7 p-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBubble
