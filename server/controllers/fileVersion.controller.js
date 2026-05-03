import { FileVersion } from "../models/fileVersion.model.js";
import { File } from "../models/file.model.js";

export const createVersion = async (req, res) => {
  try {
    const { fileId, roomId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File is required to create version",
      });
    }
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "To create  new file version content is required",
      });
    }

    const fileVersionCount = await FileVersion.countDocuments({ file: fileId });

    const newFileVersion = await FileVersion.create({
      file: fileId,
      content,
      createdBy: userId,
      versionNumber: fileVersionCount + 1,
    });

    const io = req.app.get("io");
    io.to(`${roomId}-${fileId}`).emit("version-created", newFileVersion);

    return res.status(201).json({
      success: true,
      newFileVersion,
      message: "New File version Created successfully",
    });
  } catch (error) {
    console.error("Error in createVersion:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllFileVersionsById = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const versions = await FileVersion.find({ file: fileId })
      .sort({ versionNumber: -1 })
      .populate("file", "name");

    return res.status(200).json({
      success: true,
      fileVersions: versions,
    });
  } catch (error) {
    console.error("Error in getAllFileVersionsById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteFileByVersionNumber = async (req, res) => {
  try {
    const { roomId, fileId } = req.params;

    const { versionNumber } = req.body;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const fileVersion = await FileVersion.findOneAndDelete({
      file: fileId,
      versionNumber: versionNumber,
    });
    if (!fileVersion) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }
    const io = req.app.get("io");
    io.to(`${roomId}-${fileId}`).emit("delete-version", fileVersion);

    return res.status(200).json({
      success: true,
      message: `Version number ${versionNumber} deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteFileByVersionNumber:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const restoreFileByVersionNumber = async (req, res) => {
  try {
    const { fileId } = req.params;

    let { versionNumber } = req.body;

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    let restoreFile = await FileVersion.findOne({
      file: fileId,
      versionNumber: versionNumber,
    });

    if (!restoreFile) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    file.content = restoreFile.content;

    await file.save();

    return res.status(200).json({
      success: false,
      message: `File restored to version ${versionNumber}`,
      restoreContent: restoreFile.content,
    });
  } catch (error) {
    console.error("Error in restoreFileByVersionNumber:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
