import { Message } from "../models/message.model.js";
import { Room } from "../models/room.model.js";

export const createMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;
    const { message } = req.body;

    const room = await Room.findOne({ roomId: roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      }); 
    }
    const user = room.participants.some((p) => {
      return p.userId.toString() === userId;
    });
    if (!user) {
      return res
        .status(403)
        .json({ error: "You are not allowed to send messages in this room" });
    }

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "No message found, You need to give message",
      });
    }

    const newMessage = await Message.create({
      message,
      roomId,
      createBy: userId,
    });

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
      console.error("Error in createMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUsersChatMessageByRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    const user = room.participants.some((p) => {
      return p.userId.toString() === userId;
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view messages in this room",
      });
    }

    const messages = await Message.find({ roomId: roomId, type: "chat" }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in getUsersChatMessageByRoom:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserAIChatMessagesByRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    const user = room.participants.some((p) => {
      return p.userId.toString() === userId;
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view messages in this room",
      });
    }

    const messages = await Message.find({ roomId: roomId, type: "askai" }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in getUserAIChatMessagesByRoom:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getUserAISummarizerMessagesByRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    const user = room.participants.some((p) => {
      return p.userId.toString() === userId;
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view messages in this room",
      });
    }

    const messages = await Message.find({ roomId: roomId, type: "aisummarizer" }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in getUserAISummarizerMessagesByRoom:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};