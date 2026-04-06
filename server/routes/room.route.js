import express from "express";
import { createRoom, getRoomById, joinRoom, leaveRoom } from "../controllers/room.controller.js";
import isAuthenticated  from "../middleware/isAuthenticated.js";
import { createMessage, getUsersChatMessageByRoom, getUserAIChatMessagesByRoom, getUserAISummarizerMessagesByRoom } from "../controllers/message.controller.js";

const router = express.Router()

router.post("/create",isAuthenticated ,createRoom)
router.post("/join",isAuthenticated, joinRoom)
router.post("/messages/create/:roomId", isAuthenticated, createMessage)
router.get("/messages/:roomId", isAuthenticated, getUsersChatMessageByRoom)
router.get("/messages/ai/:roomId", isAuthenticated, getUserAIChatMessagesByRoom)
router.get("/messages/ai-summarizer/:roomId", isAuthenticated, getUserAISummarizerMessagesByRoom)
router.get("/get-room/:roomId", isAuthenticated, getRoomById)
router.post("/leave/:roomId", isAuthenticated, leaveRoom)
 
export default router;     