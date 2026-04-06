import { Room } from "../models/room.model.js";

export const getRoomUsers = async(roomId, roomPresence)=>{
        const room = await Room.findOne({roomId}).populate('participants.userId', 'createdBy username');


        console.log("Room found", !!room)
        console.log("Room ID RECIEVED", roomId)
        if(!room) return []

        const presenceMap = roomPresence.get(roomId) || new Map();
        console.log("presenceMap",presenceMap)

         const users = room.participants.map((p)=>({
             userId:p.userId?._id.toString(),
             username:p.userId?.username,
             role:p.role,
             status:presenceMap.has(p.userId?._id.toString())? "online" : "offline",
        }))
        console.log("users",users)
        return users  
} 


export const handleJoinRoom = async (roomId, userId) => {

  const roomExists = await Room.exists({ roomId });

  if (!roomExists) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error; 
  }

  const result = await Room.updateOne(
    {
      roomId,
      "participants.userId": { $ne: userId }
    },
    {
      $push: {
        participants: {
          userId,
          role: "editor"
        }
      }
    }
  );  

  return result;
};
