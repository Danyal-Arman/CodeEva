import { Message } from "./models/message.model.js";
import { saveCodeInDB } from "./controllers/file.controller.js";
import { getRoomUsers, handleJoinRoom } from "./services/room.service.js";
import { askGroqAI } from "./services/together.service.js";
import debounce from "lodash.debounce";
import { groqCodeSummarizationApi } from "./services/groqSummarization.service.js";
import { streamAI } from "./utils/streamAI.js";
const saveTimers = new Map();
const roomPresence = new Map();
const disconnectTimers = new Map();

let ioInstance;

export default function initSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    const emitRoomUsers = async (roomId) => {
      const users = await getRoomUsers(roomId, roomPresence);
      io.to(roomId).emit("room-users", users);
    };
    console.log("✅ [SOCKET CONNECTED] ID:", socket.id);

    socket.on("join-room", async ({ roomId, username }) => {
      console.log("🎉 [JOIN ROOM] ID:", socket.id, "ROOM:", roomId);
      if (!roomId || !socket.user?.id) return;
      try {
        const userId = socket.user.id.toString();

        socket.roomId = roomId;
        socket.userId = userId;
        const timerKey = `${roomId}-${userId}`;

        if (disconnectTimers.has(timerKey)) {
          clearTimeout(disconnectTimers.get(timerKey));
          disconnectTimers.delete(timerKey);
        }
        if (!roomPresence.has(roomId)) {
          roomPresence.set(roomId, new Map());
        }

        // User already present (resume / forward nav / duplicate emit)
        const usersInRoom = roomPresence.get(roomId);
        const existingSocketId = usersInRoom.get(userId);

        // Case 1: User already exists in presence
        if (existingSocketId) {
          if (existingSocketId !== socket.id) {
            usersInRoom.set(userId, socket.id);
          }

          // 🔄 Different socket → refresh or reconnect
          console.log("🔄 Replacing old socket for user:", userId);

          socket.join(roomId);
          socket.emit("room-joined", { roomId, resumed: true });

          await emitRoomUsers(roomId);

          return;
        }

        // 🆕 Case 2: Truly new join
        console.log("🆕 User joined room:", roomId, userId);

        // Only now call DB
        await handleJoinRoom(roomId, userId);

        usersInRoom.set(userId, socket.id);
        socket.join(roomId);

        socket.emit("room-joined", { roomId, resumed: false });
        socket.to(roomId).emit("user-joined", { username });

        await emitRoomUsers(roomId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("join-file", ({ roomId, fileId }) => {
      const fileRoom = `${roomId}-${fileId}`;
      socket.join(fileRoom);
    });

    socket.on("leave-file", ({ roomId, fileId }) => {
      const fileRoom = `${roomId}-${fileId}`;
      socket.leave(fileRoom);
    });

    socket.on(
      "code-update",
      ({ roomId, code, position, from, username, fileId }) => {
        try {
          const saveTimer = `${roomId}-${fileId}`;

          io.in(`${roomId}-${fileId}`).emit("code-update", {
            code,
            position,
            from,
            username,
            fileId,
          });

          if (!saveTimers.has(saveTimer)) {
            saveTimers.set(
              saveTimer,
              debounce(async (code) => {
                await saveCodeInDB(roomId, fileId, code);
              }, 2000),
            );
          }
          saveTimers.get(saveTimer)(code);
        } catch (error) {
          console.log(error);
          socket.emit("error", { message: "Internal server error" });
        }
      },
    );

    socket.on("sync-code-request", ({ roomId, socketId, fileId }) => {
      try {
        socket.broadcast
          .to(`${roomId}-${fileId}`)
          .emit("sync-code-request", { socketId, fileId });
      } catch (error) {
        console.log("sync-code-req error", error.message);
      }
    });

    socket.on("sync-code-response", ({ socketId, code, from, fileId }) => {
      try {
        io.to(socketId).emit("sync-code-response", { code, from, fileId });
      } catch (error) {
        console.log("sync-code-res error", error.message);
      }
    });

    socket.on("disconnect", async () => {
      const roomId = socket.roomId;
      const userId = socket.userId;

      if (!roomId || !userId) return;

      const timer = setTimeout(async () => {
        const users = roomPresence.get(roomId);
        if (!users) return;

        if (users.get(userId) !== socket.id) {
          console.log("⏩ User reconnected, skipping removal");
          return;
        }

        users.delete(userId);
        if (users.size === 0) {
          roomPresence.delete(roomId);
        }

        await emitRoomUsers(roomId);

        console.log("👋 User left room:", roomId, userId);
      }, 2000);

      disconnectTimers.set(`${roomId}-${userId}`, timer);
    });

    // Chat feature
    socket.on("send-message", async ({ username, message, roomId }) => {
      if (!message) return;
      try {
        const newMessage = await Message.create({
          message,
          roomId,
          createdBy: socket.user?.id,
          username,
          type: "chat",
        });
        io.to(roomId).emit("receive-message", newMessage);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("ask-ai", async ({ roomId, prompt, code }) => {
      try {
        const userId = socket.user.id;

        const userMessage = await Message.create({
          message: prompt,
          roomId,
          createdBy: userId,
          username: socket.user.username,
          type: "askai",
          role: "user",
        });

        io.to(socket.id).emit("receive-ask-ai-message", userMessage);

        const conversationHistory = await Message.find({
          roomId,
          type: "askai",
          aiOwner: userId,
        })
          .sort({ createdAt: 1 })
          .limit(10);

        const formattedHistory = conversationHistory.map((message) => ({
          role: message.role,
          content: message.message,
        }));

        const stream = await askGroqAI([
          ...formattedHistory,
          {
            role: "user",
            content: prompt,
          },
        ]);
        const streamId = Date.now().toString();

        io.to(socket.id).emit("ai-stream-start", { streamId });

       const fullResponse = await streamAI({ stream, socket, streamId, eventName: "ai-stream" });

        const aiMessage = await Message.create({
          message: fullResponse,
          roomId,
          createdBy: null,
          username: "AI",
          type: "askai",
          role: "ai",
          aiOwner: userId,
        });

        io.to(socket.id).emit("ai-stream-end", {
          aiMessage,
          streamId,
        });
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("ask-ai-summarizer", async ({ roomId, prompt, code }) => {
      try {
        const userId = socket.user.id;

        const userMessage = await Message.create({
          message: prompt,
          roomId,
          createdBy: userId,
          username: socket.user.username,
          type: "aisummarizer",
          role: "user",
        });

        io.to(socket.id).emit("receive-ai-summarizer-message", userMessage);

        const conversationHistory = await Message.find({
          roomId,
          type: "aisummarizer",
          aiOwner: userId,
        })
          .sort({ createdAt: 1 })
          .limit(5);

        const formattedHistory = conversationHistory.map((message) => ({
          role: message.role,
          content: message.message,
        }));

        const stream = await groqCodeSummarizationApi([
          ...formattedHistory,
          {
            role: "user",
            content: prompt,
          },
        ], code);

        const streamId = Date.now().toString();

        io.to(socket.id).emit("ai-summarizer-stream-start", { streamId });

        const fullResponse = await streamAI({ stream, socket, streamId, eventName: "ai-summarizer-stream" });

        const aiMessage = await Message.create({
          message: fullResponse,
          roomId,
          createdBy: null,
          username: "AI",
          type: "aisummarizer",
          role: "ai",
          aiOwner: userId,
        });

        io.to(socket.id).emit("ai-summarizer-stream-end", {
          aiMessage,
          streamId,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
}

export const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }
  return ioInstance;
};
