import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileIcon } from "lucide-react";
import { useCreateFileAndFolderMutation } from "../../../features/api/fileApi";
import { useNavigate, useParams } from "react-router-dom";

const FileTree = ({ item, id, selectedItem, setSelectedItem }) => {
  const [itemExpanded, setItemExpanded] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { roomId } = params;

  const [createFileAndFolder] = useCreateFileAndFolderMutation();

  const folder = item?.type === "folder";

  const handleCreate = async (e) => {
    if (e.key === "Enter") {
      await createFileAndFolder({
        name: inputName,
        type: inputType,
        room: id,
        parent: item._id,
      });
      setInputName("");
      setInputType(null);
    }
    if (e.key === "Escape") {
      setInputName("");
      setInputType(null);
    }
  };

  const handleSelectedItem = (e) => {
    e.stopPropagation();
    setSelectedItem(item._id);
  };

  const fileId = item._id;

  return (
    <div onClick={handleSelectedItem} className={`pl-2 mt-1`}>
      <div
        className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded hover:dark:bg-[#2a2d2e] hover:bg-[#E0E0E0] `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setItemExpanded(!itemExpanded);
          }}
          className={`flex gap-1 w-full dark:text-[#CCCCCC] text-[#333333] `}
        >
          {folder ? (
            itemExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <div className="w-4" /> // Empty space for alignment
          )}
          {folder ? <Folder size={16} /> : <FileIcon size={16} />}

          <span
            onClick={() => navigate(`/editor/${roomId}/${fileId}`)}
            className={`text-sm w-full`}
          >
            {item?.name}
          </span>
        </div>

        {folder && (
          <div className="flex gap-1 ml-auto">
            <i
              onClick={() => {
                (setInputType("file"), setInputName(""), setItemExpanded(true));
              }}
              className="codicon codicon-new-file font-codicon text-green-500 text-[32px] dark:text-zinc-400 "
              title="New File"
            />
            <i
              onClick={() => {
                (setInputType("folder"),
                  setInputName(""),
                  setItemExpanded(true));
              }}
              className="codicon codicon-new-folder font-codicon text-[32px] text-yellow-500  dark:text-zinc-400"
              title="New File"
            />
          </div>
        )}
      </div>
      {inputType && (
        <div className="flex justify-center">
          <input
            type="text"
            className="  bg-zinc-700/90 border outline-none border-blue-600 "
            onChange={(e) => setInputName(e.target.value)}
            autoFocus
            onKeyDown={handleCreate}
            onBlur={() => {
              (setInputName(""), setInputType(null));
            }}
          />
        </div>
      )}

      {itemExpanded &&
        item.Children?.map((child) => (
          <FileTree
            key={child._id}
            item={child}
            id={id}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
    </div>
  );
};

export default FileTree;
