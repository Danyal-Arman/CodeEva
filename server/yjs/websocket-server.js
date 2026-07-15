import http from "http";
import { WebSocketServer } from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";

const server = http.createServer();

const wss = new WebSocketServer({
  server,
});

wss.on("connection", (conn, req) => {
  setupWSConnection(conn, req);
});
 
const PORT = 1234;  

 
server.listen(PORT, () => {
  console.log(`Yjs WebSocket Server running on port ${PORT}`);
});