import express from "express";
import cors from "cors"
import connectDB from "./database/connection.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import roomRoute from "./routes/room.route.js"
import fileRoute from "./routes/file.route.js"
import judge0Route from "./routes/judge0.route.js"
import aiRoute from "./routes/ai.route.js"
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json())
app.use(cookieParser())

dotenv.config()

if (process.env.NODE_ENV !== "test") {
    connectDB();  
}

app.use(cors({
    origin: "http://localhost:4000",
    credentials: true,  
}))  
 
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});  

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/room", roomRoute)
app.use("/output",judge0Route) 
app.use("/file", fileRoute)
app.use("/ai", aiRoute)
 
export default app      