import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const SERVER_URL = "ws://localhost:1234";
// console.log("Yjs WebSocket Server URL:", SERVER_URL);

export const createYjsProvider = (roomId) => {
    //   console.log("CreatingYjsProvider with roomId:", roomId);

  const ydoc = new Y.Doc();
  const ytext = ydoc.getText("code");
  const provider = new WebsocketProvider(SERVER_URL, roomId, ydoc);


//   provider.on("status", (e) => {
//   console.log("yjs connection status:",e.status);
// });
// provider.on("sync", (isSynced) => {
//   console.log("Yjs synced:", isSynced);
// });
// provider.on("synced", (state) => {
//   console.log("SYNCED EVENT", state);
// });
// ydoc.on("update", () => {
//   console.log("YDOC UPDATED");
// });
  return { provider, ydoc, ytext };

};

export default createYjsProvider;
