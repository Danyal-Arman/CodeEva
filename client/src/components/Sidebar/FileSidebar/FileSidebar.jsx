import React, { useState, useEffect } from "react";
import { FolderPlus, FilePlus } from "lucide-react";
import { useGetRoomQuery } from "../../../features/api/roomApi";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useCreateFileAndFolderMutation,
  useGetFilesQuery,
} from "../../../features/api/fileApi";
import FileTree from "./FileTree";
import buildFileTree from "../../../utils/buildFileTree.js";

const FileSidebar = ({ isFileSidebarOpen }) => {
  const [inputType, setInputType] = useState(null);
  const [inputName, setInputName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const params = useParams();
  const { roomId} = params;
  const { data } = useGetRoomQuery({ roomId });
  const [createFileAndFolder] = useCreateFileAndFolderMutation();
  const { data: getFileData, isLoading } = useGetFilesQuery(roomId, {
    refetchOnMountOrArgChange: true,
  });
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const id = data?._id;


  const handleCreate = async (e) => {
    if (e.key === "Enter") {
      createFileAndFolder({
        name: inputName,
        type: inputType,
        room: id,
      });
      setInputType(null);
      setInputName("");
    }
    if (e.key === "Escape") {
      setInputType(null);
      setInputName("");
    }
  };
  
  useEffect(() => {}, [selectedItem]);

  if (isLoading) return;
  
  


  const tree = buildFileTree(getFileData);

  return (
    <div
      className={`transition-width duration-300 h-screen dark:text-white border dark:border-none text-black dark:bg-zinc-900 bg-[#F3F3F3] overflow-hidden ${
        isFileSidebarOpen ? "min-w-[290px]" : "w-0"
      }`}
    >
      <div className="p-4 font-semibold border-b border-gray-700">
        File Explorer
      </div>

      {/* File structure */}
      <div className="flex text-gray-500 justify-end gap-2 border-b border-gray-700 hover:cursor-pointer ">
        <FilePlus
          className="w-5 "
          onClick={() => {
            setInputType("file");
            setInputName("");
          }}
        />

        <FolderPlus
          onClick={() => {
            setInputType("folder");
            setInputName("");
          }}
        />
      </div>
      {inputType && (
        <div className="flex justify-end w-full">
          <input
            type="text"
            className=" bg-zinc-700/70 border border-blue-500 focus:outline-none w-[80%]"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            autoFocus
            onKeyDown={handleCreate}
            onBlur={() => {
              setInputType(null), setInputName("");
            }}
          />
        </div>
      )}
      <div>
        {tree?.map((item) => {
          return (
            <FileTree
              item={item}
              id={id}
              key={item._id}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              roomId={roomId}
              fileId={id}
              username={username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FileSidebar;
