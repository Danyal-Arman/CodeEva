import { useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { getSocket } from "./socket"; // 💡 Use dynamic socket getter

const useCollaborativeCode = ({
  roomId,
  username,
  onIncomingCodeUpdate,
  getCurrentCode,
  editorRef,
  fileId,
}) => {
  const debounceRef = useRef(null);
  const socket = getSocket();
  const prevFileRef = useRef(null);
  const prevRoomRef = useRef(null);

  // useEffect(() => {
  //   if (!roomId || !username) return;

  //   const handleConnect = () => {
  //     socket.emit("join-room", {
  //       roomId,
  //       username,
  //     });
  //   };

  //   if (!socket.connected) {
  //     socket.connect();
  //   }
  //   socket.once("connect", handleConnect);

  //   if (socket.connected) {
  //     handleConnect();
  //   }

  //   return () => {
  //     socket.off("connect", handleConnect);
  //   };
  // }, [roomId, username]);

  useEffect(() => {
    if (!socket.connected || !roomId || !username) return;

    const prevRoomId = prevRoomRef.current;

    // Leave previous room
    if (prevRoomId && prevRoomId !== roomId) {
      socket.emit("leave-room", { roomId: prevRoomId });
    }
    prevRoomRef.current = roomId;
  }, [roomId]);

  useEffect(() => {
    if (!roomId || !fileId || !username) return;

    const handleRoomJoined = () => {
      socket.emit("join-file", {
        roomId,
        username,
        fileId,
      });

      socket.emit("sync-code-request", {
        roomId,
        socketId: socket.id,
        fileId,
      });
    };

    socket.on("room-joined", handleRoomJoined);

    return () => {
      socket.off("room-joined", handleRoomJoined);
    };
  }, [roomId, fileId, username]);

  useEffect(() => {
    if (!roomId || !fileId || !username || !socket.connected) return;

    const prevFileId = prevFileRef.current;

    if (prevFileId && prevFileId !== fileId) {
      socket.emit("leave-file", { roomId, fileId: prevFileId });
    }

    socket.emit("join-file", { roomId, fileId, username });
    socket.emit("sync-code-request", {
      roomId,
      socketId: socket.id,
      fileId,
    });

    prevFileRef.current = fileId;
  }, [fileId]);

  useEffect(() => {
    if (roomId && fileId) {
      debounceRef.current = debounce((latestCode) => {
        const latestCursorPosition = editorRef.current?.getPosition();
        socket.emit("code-update", {
          roomId,
          code: latestCode,
          fileId,
          position: latestCursorPosition,
          from: socket.id,
          username,
        });
      }, 40);
    }

    return () => {
      debounceRef.current?.cancel();
    };
  }, [roomId, username, fileId]);

  const sendCodeUpdate = useCallback((code) => {
    if (debounceRef.current) {
      debounceRef.current(code);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const handleIncomingCodeUpdate = ({
      code,
      from,
      position,
      username,
      fileId: incomingFileId,
    }) => {
      if (from === socket.id) return;
      if (incomingFileId !== fileId) return;

      const current = getCurrentCode?.();
      if (current === code) return;
      onIncomingCodeUpdate?.({ newCode: code, position, username, fileId });
    };

    const handleSyncCodeRequest = ({ socketId }) => {
      if (!socketId) return;
      const code = getCurrentCode?.();
      if (code) {
        socket.emit("sync-code-response", { socketId, code, from: username });
      }
    };

    const handleInitialCode = ({ code, from }) => {
      if (code) {
        onIncomingCodeUpdate?.({
          newCode: code,
          position: null,
          username: from,
        });
      }
    };

    socket.on("code-update", handleIncomingCodeUpdate);
    socket.on("sync-code-request", handleSyncCodeRequest);
    socket.on("sync-code-response", handleInitialCode);

    return () => {
      socket.off("code-update", handleIncomingCodeUpdate);
      socket.off("sync-code-request", handleSyncCodeRequest);
      socket.off("sync-code-response", handleInitialCode);
    };
  }, [roomId, username, onIncomingCodeUpdate, getCurrentCode, editorRef]);

  return { sendCodeUpdate };
};

export default useCollaborativeCode;
