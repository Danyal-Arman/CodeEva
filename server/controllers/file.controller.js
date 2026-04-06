import { File } from "../models/file.model.js";
import { Room } from "../models/room.model.js";

export const create = async (req, res) => {
  try {
    const { name, type, parent, language, content, room } = req.body;

    if (!room) {
      return res
        .status(404)
        .json({ message: "No room Found, to create file or folder" });
    }
    if (!name) {
      return res
        .status(404)
        .json({ message: "File or Folder name is required" });
    }
    console.log(room, typeof room);
    const findRoom = await Room.findById(room);
    const roomId = findRoom?.roomId;

    const newFile = new File({
      name, 
      type,
      room,
      parent: parent || null,
      language: language || null,
      content: content || (type === "file" ? "" : null),
    });

    const savedFile = await newFile.save();
 
    const io = req.app.get("io");
    io.to(roomId).emit("file-created", savedFile);

    return res.status(201).json(savedFile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } 
};
 
export const saveCodeInDB = async (roomId, fileId, code) => {
  // console.log("room", roomId, "file", fileId, "and your code", code)
  const room = await Room.findOne({ roomId: roomId });
  if (!room) {
    console.log("No room");
    throw new Error("Room not found");
  }
  const file = await File.findOne({ _id: fileId, type: "file" });
  if (!file) return;
  return File.findByIdAndUpdate(
    fileId,
    { room: room._id, content: code, updatedAt: new Date() },
    { new: true }
  );
};

export const getFilesByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({ message: "No room Found" });
    }

    const files = await File.find({ room: room._id });
    return res.status(200).json(files);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getFileById = async (req, res) => {
  try {
    const { roomId, fileId } = req.params;

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "No room Found" });
    }
    const file = await File.findOne({ room: room._id, _id: fileId });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    return res.status(200).json({
      success: true,
      file,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const editFilesOrFolder = async (req, res) => {
  try {
    const { itemId, reName } = req.body;

    const itemUpdated = await File.findByIdAndUpdate(
      { _id: itemId },
      { name: reName },
      { new: true }
    );
    if (!itemUpdated) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    return res.status(200).json(itemUpdated); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error", 
    });
  }
};

export const deleteFilesOrFolderById = async (req, res) => {
  try {
    const { itemId } = req.body;

    const deltedItem = await File.deleteOne({ _id: itemId });

    if (!deltedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const deleteChildItems = await File.deleteMany({ parent: itemId });

    return res.status(200).json({
      deltedItem: deltedItem.deletedCount,
      deleteChildItems: deleteChildItems.deletedCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
