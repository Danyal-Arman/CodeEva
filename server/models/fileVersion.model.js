import mongoose from "mongoose";

const fileVersionSchema = new mongoose.Schema({
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        require: true
    },
    versionNumber: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require: true
    }
},{timestamps:true})
 
export const FileVersion = mongoose.model("FileVersion", fileVersionSchema)