import React, { useState } from "react";
import {
  ClockIcon,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import {
  useDeleteVersionMutation,
  useGetAllVersionQuery,
  useRestoreVersionMutation,
} from "../../../features/api/fileApi";
import { useParams } from "react-router-dom";

const FileVersions = ({ isVersionSidebarOpen }) => {
  const [openVersionId, setOpenVersionId] = useState(null);
  const { roomId, fileId } = useParams();
  const { data } = useGetAllVersionQuery(
    { fileId },
    { skip: !fileId, refetchOnMountOrArgChange: true },
  );
  const [restoreVersion, { isLoading }] = useRestoreVersionMutation();
  const [deleteVersion] = useDeleteVersionMutation();

  const versions = data?.fileVersions;

  const toggleVersion = (versionId) => {
    setOpenVersionId(openVersionId === versionId ? null : versionId);
  };

  const handleRestoreVersion = async (versionNumber) => {
    await restoreVersion({ fileId, versionNumber });
  };
  const handleDeleteVersion = async (versionNumber, e) => {
    e.stopPropagation();
    if (confirm("Are you sure to delete this version")) {
      await deleteVersion({ roomId, fileId, versionNumber });
    }
  };

  return (
    <div
      className={`dark:bg-zinc-900 bg-zinc-200 border-r border-zinc-300 dark:border-none ${isVersionSidebarOpen ? "min-w-[290px]" : "w-0"} h-screen flex flex-col `}
    >
      <div
        className={` px-4 py-5  dark:border-gray-700 flex items-center justify-between min-w-[290px]  ${isVersionSidebarOpen && "fixed  z-10"}`}
      >
        <h2
          className={`font-semibold text-gray-800 dark:text-gray-200  ${isVersionSidebarOpen ? "block" : "hidden"}`}
        >
          Version History
        </h2>
        <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <div className=" flex-1 overflow-y-auto scrollbar-hide my-16">
        {versions?.map((version) => (
          <React.Fragment key={version._id}>
            <div
              onClick={() => toggleVersion(version._id)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-950 cursor-pointer  flex justify-between"
            >
              <div className="flex items-center gap-2 ">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate ">
                  Version - {version.versionNumber} —
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Aug 13, 12:00 PM
                </p>
              </div>
              <div className="items-end space-x-2">
                <button className="text-green-400 dark:text-white">
                  {openVersionId !== version._id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <button
                  className="text-red-500 dark:text-white"
                  onClick={(e) => handleDeleteVersion(version.versionNumber, e)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {openVersionId === version._id && (
              <div className="mx-4 my-1 rounded-b-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-950 transition-all duration-200 ease-in-out">
                <div className="bg-gray-200 dark:bg-zinc-800 px-3 py-1.5 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
                    {version.file.name}
                  </span>
                  <div className="space-x-2">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      Preview
                    </span>
                    <button
                      onClick={() =>
                        handleRestoreVersion(version.versionNumber)
                      }
                      disabled={isLoading}
                      className="text-[11px]  bg-lime-400 text-white dark:text-black px-2 py-[1px] rounded-md"
                    >
                      Restore
                    </button>
                  </div>
                </div>
                <pre className="p-3 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                  <code className="dark:text-green-400 ">
                    {version?.content}
                  </code>
                </pre>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FileVersions;
