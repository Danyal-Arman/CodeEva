import React, { Suspense } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { MessageSquareMore, Users } from "lucide-react";
import ChatSkeleton from "../../Skeleton/ChatSkeleton";
import UsersSkeleton from "../../Skeleton/UserSkeleton";
import AISkeleton from "../../Skeleton/AISkeleton";

const AIPanel = React.lazy(() => import("./Panels/AIPanel"));
const ChatPanel = React.lazy(() => import("./Panels/ChatPanel"));
const UsersPanel = React.lazy(() => import("./Panels/UserPanel"));

const RightSidebar = (props) => {
  return (
    <div
      className="fixed right-0 h-screen min-h-0 flex flex-col bg-white dark:bg-zinc-950
             border-l border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-10"
      style={{
        transform: props.isSidebarOpen ? "translateX(0)" : "translateX(100%)",
        width: props.isRightCollapsed ? "0" : props.rightSidebarWidth,
      }}
    >
      <div
        onMouseDown={() => props.startResize("right")}
       className="absolute top-0 h-full w-2 hover:bg-zinc-500 cursor-col-resize "/>

      {/* <div className="flex justify-between text-center font-semibold dark:text-white text-black">
        <button
          type="button"
          aria-label="Ask AI"
          className="border-r px-11 dark:border-gray-700"
          onClick={() => togglePanel("ai")}
        >
          <SparklesIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Chat"
          className="border-r px-11 dark:border-gray-700"
          onClick={() => togglePanel("chat")}
        >
          <MessageSquareMore className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Users"
          className="border-r px-11 dark:border-gray-700"
          onClick={() => togglePanel("users")}
        >
          <Users className="w-5 h-5" />
        </button>
      </div> */}

      <div className="flex-1 overflow-y-auto min-h-0">
        {props.activePanel === "ai" && (
          <Suspense
            fallback={
              <>
                <AISkeleton />
              </>
            }
          >
            <AIPanel editorRef={props.editorRef} rightWidth={props.rightSidebarWidth}/>
          </Suspense>
        )}
        {props.activePanel === "chat" && (
          <Suspense
            fallback={
              <>
                <ChatSkeleton />
              </>
            }
          >
            <ChatPanel
              username={props.username}
              setIsChatSidebarOpen={props.setIsChatSidebarOpen}
              inputMessage={props.inputMessage}
              setInputMessage={props.setInputMessage}
              handleMessage={props.handleMessage}
              messages={props.messages}
              messagesEndRef={props.messagesEndRef}
            />
          </Suspense>
        )}
        {props.activePanel === "users" && (
          <Suspense fallback={<UsersSkeleton />}>
            <UsersPanel
              users={props.users}
              currentUserId={props.currentUserId}
              isAdmin={props.isAdmin}
              handleLeaveRoom={props.handleLeaveRoom}
            />
            {/* <UsersSkeleton /> */}
          </Suspense>
        )}
      </div>

    </div>
  );
};

export default RightSidebar;
