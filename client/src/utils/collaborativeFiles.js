import { useEffect } from "react";
import { getSocket } from "./socket";
import fileApi from "../features/api/fileApi";
import store from "../app/store";

const useCollabotiveFiles = ({ fileId, roomId, username }) => {
  // const hasJoinedRoom = useRef(false)
  const socket = getSocket();

  useEffect(() => {
    if (!roomId || !username) return;

    socket.on("file-created", (newFile) => {
      store.dispatch(
        fileApi.util.updateQueryData("getFiles", roomId, (draft) => {
          draft.push(newFile);
        }),
      );
    });

    socket.on("version-created", (newVersion) => {
      store.dispatch(
        fileApi.util.updateQueryData("getAllVersion", { fileId }, (draft) => {
          draft.fileVersions.unshift(newVersion);
        }),
      );
    });

    socket.on("delete-version", (deletedVersion) => {
      store.dispatch(
        fileApi.util.updateQueryData("getAllVersion", { fileId }, (draft) => {
          draft.fileVersions = draft.fileVersions.filter(
            (version) => version._id !== deletedVersion._id,
          );
        }),
      );
    });
    return () => {
      socket.off("file-created");
      socket.off("version-created");
      socket.off("delete-version");
    };
  }, [roomId, username, fileId]);
};
export default useCollabotiveFiles;
