import { v4 as uuidv4 } from "uuid";
import { Room } from "../models/room.model.js";
import { handleJoinRoom } from "../services/room.service.js";
import { User } from "../models/user.model.js";
import { getIO } from "../socket.js";

export const createRoom = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } 
    if (!user.isAccountVerified) {
      return res.status(403).json({
        message: "Verify your account first",
      });
    }
    const room = await Room.create({
      roomId: uuidv4(),
      createdBy: req.user.id,
      participants: [
        {
          userId: req.user.id,
          role: "admin",
        },
      ],
    });
    await room.populate("createdBy", "username");

    return res.status(201).json({
      message: "Room created succesfully",
      room,
    });
  } catch (error) {
    console.error("Error in createRoom:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      }); 
    }
    if (!user.isAccountVerified) {
      return res.status(403).json({
        message: "Verify your account first",
      });
    }

    if (!roomId) {
      return res.status(400).json({
        message: "Room id is required",
      });
    }

    await handleJoinRoom(roomId, userId);

    return res.status(200).json({
      success: true,
      message: `joined the room successfully`,
    });
  } catch (error) {
    console.error("Error in joinRoom:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId } = req.params;

    const updatedRoom = await Room.findOneAndUpdate(
      { roomId, "participants.userId": userId },
      { $pull: { participants: { userId } } },
      { new: true },
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found or you are not a participant",
      });
    }

    const io = getIO();

    io.to(roomId).emit("user-left-room", {
      userId,
      username: req.user.username,
    });

    const sockets = await io.in(roomId).fetchSockets();

    for (const s of sockets) {
      if (s.user?.id === userId) {
        s.disconnect(true); 
      }
    }

    return res.status(200).json({
      success: true,
      message: "Left the room successfully",
    });
  } catch (error) {
    console.error("Error in leaveRoom:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found handle" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
