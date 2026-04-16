import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from "dotenv";
import { socketAuth } from "./middleware/socketAuth.js";
import initSocket from "./socket.js";
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.set("io", io);

socketAuth(io);
initSocket(io);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`This is port  ${port}`);
});
