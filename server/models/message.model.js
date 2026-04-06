import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     message:{
//         type:String,
//         require:true
//     },
//     roomId:{
//         type:String,
//         require:true,
//     },
//     username:String,
//     createdBy: {
//       type:  mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }

// }, {timestamps:true}) 

// export const Message = mongoose.model("Message", messageSchema)


const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  roomId: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  username: String,

  type: {
    type: String,
    enum: ["chat", "askai", "aisummarizer"],
    default: "chat",
  },

  role: {
    type: String,
    enum: ["user", "ai"],
    default: "user",
  },

  aiOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }

}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema)
