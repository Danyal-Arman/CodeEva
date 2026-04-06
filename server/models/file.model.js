import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['file', 'folder'],
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  language: String,
  content: String,

}, {timestamps:true})
export const File = mongoose.model("File", fileSchema)