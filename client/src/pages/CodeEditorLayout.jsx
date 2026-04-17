import React, { useEffect, useState, useRef, useCallback, Suspense } from "react";
import {
  useCreateVersionMutation,
  useGetFileByIdQuery,
} from "../features/api/fileApi";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import {
  useGetMessagesByRoomQuery,
  useGetRoomQuery,
  useLeaveRoomMutation,
} from "../features/api/roomApi";
import {
  Sun,
  Moon,
  Loader2,
  RotateCw,
  Share2,
  Save,
  MessageSquareMore,
  Users,
} from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { skipToken } from "@reduxjs/toolkit/query";
import { useTheme } from "../context/ThemeContext";
import useCollabotiveFiles from "../utils/collaborativeFiles";
import useChat from "../utils/useChat";
import useResizableLayout from "../utils/useResizableLayout";
import axios from "axios";
import { getSocket } from "../utils/socket";
import { useUserBasic } from "../hooks/useUserBasic";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Tooltip } from "../components/Tooltip";
import WorkSpaceLoader from "../components/Ui/WorkSpaceLoader";
import Navbar from "../components/Navbar";



const CodeEditor = React.lazy(() => import("../components/CodeEditor"));
const RightSidebar = React.lazy(
  () => import("../components/Sidebar/RightSidebar/RightSidebar"),
);
const FileVersions = React.lazy(
  () => import("../components/Sidebar/FileSidebar/FileVersions"),
);
const FileSidebar = React.lazy(
  () => import("../components/Sidebar/FileSidebar/FileSidebar"),
);
const Sidebar = React.lazy(() => import("../components/Sidebar/Sidebar"));

const CodeEditorLayout = () => {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [inputMessage, setInputMessage] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [output, setOutput] = useState("");
  const [activePanel, setActivePanel] = useState("users");
  const [isFileSidebarOpen, setIsFileSidebarOpen] = useState(false);
  const [isVersionSidebarOpen, setIsVersionSidebarOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [languageId, setLanguageId] = useState(63);
  const { currentTheme, toggleTheme } = useTheme();
  const [roomUsers, setRoomUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const isSidebarOpen = activePanel !== null;

  const {isRightCollapsed, rightWidth, toggleRight, startResize} = useResizableLayout() 


  const editorRef = useRef(null);
  const socket = getSocket();

  const { roomId, fileId } = useParams();
  const { id, username } = useUserBasic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const currentUserId = id;
  const isAdmin = roomUsers?.some(
    (user) => user.userId === currentUserId && user.role === "admin",
  );

  const [createVersion, { isLoading }] = useCreateVersionMutation();

  const { data } = useGetMessagesByRoomQuery(roomId, {
    skip: !roomId,
    refetchOnMountOrArgChange: true,
  });
  const { data: fileData, isFetching } = useGetFileByIdQuery(
    fileId ? { roomId, fileId } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const {
    data: roomData,
    error: roomError,
    isLoading: roomIsLoading,
  } = useGetRoomQuery(roomId ? { roomId } : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const [leaveRoom, { data: leaveRoomData, isSuccess, error }] =
    useLeaveRoomMutation();

  const handleLeaveRoom = async () => {
    await leaveRoom({ roomId });
  };
  const handleCreateVersion = async () => {
    await createVersion({ roomId, fileId, content: currentCode });
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, [socket]);

  useEffect(() => {
    if (!roomId || !username || !roomData) return;

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {

      socket.emit("join-room", { roomId, username });
    };

    socket.off("connect", handleConnect); // prevent duplicates
    socket.on("connect", handleConnect);

    // If already connected → trigger manually
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [roomId, username, roomData, socket]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [activePanel]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [isFileSidebarOpen, isVersionSidebarOpen]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    if (!roomId || !user) return;
    if (roomIsLoading) return;
    if (roomError) {
      toast.error(roomError?.data?.message || "Room not found he he");
      navigate("/");
    }
  }, [roomId, user, roomData, roomError, roomIsLoading, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(leaveRoomData?.message || "Room left successfully");
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, leaveRoomData, navigate]);

  useEffect(() => {
    if (!username) return;
    let currentUsername = username;
    const handleUserJoined = ({ username }) => {
      if (username !== currentUsername) {
        toast(`${username || "someone"} joined the room`, { icon: "👋" });
      }
    };
    socket.on("user-joined", handleUserJoined);

    return () => {
      socket.off("user-joined", handleUserJoined);
    };
  }, [username, socket]);

  useEffect(() => {
    let currentUsername = username;
    const handleUserLeft = ({ username }) => {
      if (username !== currentUsername) {
        toast(`${username} left the room`, { icon: "👋" });
      }
    };

    socket.on("user-left-room", handleUserLeft);

    return () => {
      socket.off("user-left-room", handleUserLeft);
    };
  }, [username, socket]);

  useEffect(() => {
    const handleRoomUsers = (users) => {
      setRoomUsers(users);
    };

    socket.on("room-users", handleRoomUsers);
    return () => {
      socket.off("room-users", handleRoomUsers);
    };
  }, [socket]);

  useEffect(() => {
    setCurrentCode("");
  }, [fileId]);

  useEffect(() => {
    if (!isFetching && fileData?.file?.content !== undefined) {
      setCurrentCode(fileData.file.content);
    }
  }, [fileData, isFetching]);


const onReceive = useCallback((msg) => {
  setMessages((prev) => [...prev, msg]);
}, []);

  const { sendMessage } = useChat({
    roomId,
    username,
    onReceive,
  });
  const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    c: 50,
    typescript: 74,
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const handleLanguage = (e) => {
    const language = e.target.value;
    setCurrentLanguage(language);
    setLanguageId(languageMap[language]);
  };

  const runCode = async () => {
    setIsTerminalOpen(true);

    try {
      const res = await axios.post("https://codeeva.onrender.com/output/run-code", {
        source_code: currentCode,
        language_id: languageId,
      });
      const { stdout, stderr, compile_output, status } = res.data;

      const result = ` ${stdout ? stdout : ""}  ${stderr ? stderr : ""}  ${compile_output ? "compile Info:" + compile_output : ""}  ${status.description === "Accepted" ? "" : `Status ${status.description}`}  `;
      setOutput(result);
    } catch (error) {
      setOutput(
        `Error: ${error.message === "Request failed with status code 429" ? "You have reached your limit of 50 req/day " : error.message}`,
      );
    }
  };

  const handleRunCode = () => {
    setIsTerminalOpen(true);
    runCode();
  };

  const handleMessage = () => {
    if (inputMessage?.trim()) {
      const message = inputMessage;
      sendMessage(message);
      setInputMessage("");
    }
  };

  const handleShare = async () => {
    const inviteLink = `${window.location.origin}/editor/${roomId}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Link copied");
    } catch (error) {
      toast.error(error.message || "Failed to copy link");
    }
  };

  useCollabotiveFiles({ fileId, roomId, username });

  const togglePanel = (panel)=>{
      setActivePanel((prev)=> prev === panel ? null : panel)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Loader overlay */}
      {!isEditorReady && (
        <WorkSpaceLoader />
      )}
      <div className="flex flex-col h-full">
      <Navbar />
        <div className=" p-2 dark:bg-zinc-900/85 text-white flex justify-between items-center border-b dark:border-gray-500">
          <label htmlFor="language-select" className="sr-only">
            Select programming language
          </label>
          <select
            id="language-select"
            className="p-1 rounded bg-zinc-900/20 border border-zinc-700"
            value={currentLanguage}
            onChange={handleLanguage}
          >
            <option className="bg-zinc-900 text-white" value="plaintext">
              PlainText
            </option>
            <option className="bg-zinc-900 text-white" value="javascript">
              Javascript
            </option>
            <option className="bg-zinc-900 text-white" value="java">
              Java
            </option>
            <option className="bg-zinc-900 text-white" value="python">
              Python
            </option>
            <option className="bg-zinc-900 text-white" value="cpp">
              C++
            </option>
            <option className="bg-zinc-900 text-white" value="c">
              C
            </option>
            <option className="bg-zinc-900 text-white" value="typescript">
              Typescript
            </option>
            <option className="bg-zinc-900 text-white" value="node">
              Node.js
            </option>
            <option className="bg-zinc-900 text-white" value="go">
              Go
            </option>
            <option className="bg-zinc-900 text-white" value="rust">
              Rust
            </option>
            <option className="bg-zinc-900 text-white" value="bash">
              Bash
            </option>
          </select>
          <div className="bg-zinc-900/20 px-1 py-1 rounded-md flex gap-2 items-center">
            <button
              type="button"
              aria-label="Run code"
              onClick={handleRunCode}
              className="bg-zinc-900/20 border border-zinc-700 px-3 py-1 rounded-md flex gap-2 text-sm"
            >
              <span className="py-[2.5px]">
                <RotateCw className="w-4 h-4 dark:text-white" />
              </span>
              Run
            </button>
          </div>
          <div className="space-x-4 flex items-center overflow-visible">
            <Tooltip text="Create file version">
              <button
                type="button"
                aria-label="Create file version"
                onClick={handleCreateVersion}
                disabled={isLoading}
                className="bg-zinc-900/20 border border-zinc-700 px-2 py-1 rounded-md flex gap-2 text-sm"
              >
                {isLoading && <Loader2 className="animate-spin w-5 h-5 " />}
                <span>
                  <Save className="w-7 h-5 text-white" />
                </span>{" "}
              </button>
            </Tooltip>
            <Tooltip text="Share room">
              <button
                type="button"
                aria-label="Share room"
                onClick={handleShare}
                className="bg-zinc-900/20 border border-zinc-700 px-2 py-1 rounded-md flex gap-2 text-sm items-center"
              >
                <span>
                  <Share2 className="w-7 h-5 dark:text-white" />
                </span>
              </button>
            </Tooltip>
            <Tooltip text="Toggle theme">
              <button
                type="button"
                aria-label="Toggle theme"
                className="dark:hover:bg-zinc-700 hover:bg-slate-800 p-2 rounded-md hover:cursor-pointer"
                onClick={toggleTheme}
              >
                {currentTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </Tooltip>
            <div className="relative flex gap-2">
              <Tooltip text="Ask AI">
                <button
                  type="button"
                  aria-label="Ask AI"
                  onClick={() => togglePanel("ai")}
                  className="bg-zinc-900/20 border border-zinc-700 px-2 py-1 rounded-md flex gap-2 text-sm items-center"
                >
                  {" "}
                  <SparklesIcon className="w-7 h-5 text-yellow-300 fill-yellow-200" />
                </button>
              </Tooltip>

              <Tooltip text="Chat">
                <button
                  type="button"
                  aria-label="Chat"
                  onClick={() => togglePanel("chat")}
                  className="bg-zinc-900/20 border border-zinc-700 px-2 py-1 rounded-md flex gap-2 text-sm items-center"
                >
                  {" "}
                  <MessageSquareMore className="w-7 h-5" />
                </button>
              </Tooltip>
              <Tooltip text="Participants">
                <button
                  type="button"
                  aria-label="Participants"
                  onClick={() => togglePanel("users")}
                  className="relative bg-zinc-900/20 border border-zinc-700 px-2 py-1 rounded-md flex gap-2 text-sm items-center"
                >
                  {" "}
                  <Users className="w-7 h-5" />
                  <span className="absolute -top-1 -right-1 text-xs bg-purple-700 text-white px-1.5 rounded-full">
                    {roomUsers?.length}
                  </span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex flex-1 w-full flex-col  overflow-y-hidden">
          <div className="flex flex-1 overflow-hidden">
            <Suspense fallback={<div className="w-full h-full bg-zinc-900" />}>
              <Sidebar
                onFileClick={() => setIsFileSidebarOpen(!isFileSidebarOpen)}
                setIsFileSidbarOpen={setIsFileSidebarOpen}
                isVersionSidebarOpen={isVersionSidebarOpen}
                setIsVersionSidebarOpen={setIsVersionSidebarOpen}
              />
            </Suspense>
            <Suspense fallback={<div className="w-full h-full bg-zinc-900" />}>
              <FileSidebar
                isFileSidebarOpen={isFileSidebarOpen}
                username={username}
              />
            </Suspense>
            <Suspense fallback={<div className="w-full h-full bg-zinc-900" />}>
              <FileVersions
                isVersionSidebarOpen={isVersionSidebarOpen}
                fileId={fileId}
              />
            </Suspense>
            <div
              className="flex-1 min-w-[350px] overflow-hidden"
              style={{
                paddingRight: activePanel ? rightWidth : 0,
              }}
            >
              <Suspense
                fallback={<div className="w-full h-full bg-zinc-900" />}
              >
                <CodeEditor
                  currentLanguage={currentLanguage ?? "javascript"}
                  roomId={roomId ?? ""}
                  userId={id ?? ""}
                  username={username ?? ""}
                  currentCode={currentCode ?? ""}
                  setCurrentCode={setCurrentCode}
                  output={output ?? ""}
                  isTerminalOpen={isTerminalOpen}
                  setIsTerminalOpen={setIsTerminalOpen}
                  editorRef={editorRef}
                  onEditorReady={() => setIsEditorReady(true)}
                  isSidebarOpen={isSidebarOpen}
                  isFileSidebarOpen={isFileSidebarOpen}
                  isVersionSidebarOpen={isVersionSidebarOpen}
                  roomData={roomData}
                  rightWidth={rightWidth}
                />
              </Suspense>
            </div>
            <Suspense fallback={<div className="w-full h-full bg-zinc-900" />}>
              <RightSidebar
                username={username}
                handleMessage={handleMessage}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                messagesEndRef={messagesEndRef}
                messages={messages}
                isSidebarOpen={isSidebarOpen}
                setActivePanel={setActivePanel}
                activePanel={activePanel}
                users={roomUsers}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                handleLeaveRoom={handleLeaveRoom}
                isRightCollapsed={isRightCollapsed}
                rightSidebarWidth={rightWidth}
                toggleRight={toggleRight}
                startResize={startResize}
                editorRef={editorRef}
              />
            </Suspense>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CodeEditorLayout;
