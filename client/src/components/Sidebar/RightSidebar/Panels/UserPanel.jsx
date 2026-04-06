import { Crown, MoreVertical } from "lucide-react";

const UsersPanel = ({
  users,
  currentUserId,
  isAdmin,
  onRemoveUser,
  onChangeRole,
  handleLeaveRoom,
}) => {
  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b text-black dark:text-white border-zinc-200 dark:border-zinc-700">
        <h2 className="font-semibold">Participants ({users.length})</h2>
      </div>

      {/* Users List */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-1">
        {users.map((user) => {
          const isYou = user.userId === currentUserId;

          return (
            <div
              key={user.userId}
              className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {/* Left: status + name */}
              <div className="flex items-center gap-3">
                {/* Status dot */}
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    user.status === "online" ? "bg-green-500" : "bg-red-500"
                  }`}
                />

                {/* Name + role */}
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-zinc-700 dark:text-white">
                      {user.username}
                      {isYou && (
                        <span className="ml-1 text-xs text-blue-500">
                          (You)
                        </span>
                      )}
                    </span>

                    {user.role === "admin" && (
                      <Crown size={14} className="text-yellow-500 ml-1" />
                    )}
                  </div>

                  <span className="text-xs text-zinc-300 capitalize">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Right: admin actions */}
              {isAdmin && !isYou && (
                <div className="relative hidden group-hover:block">
                  <button className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700">
                    <MoreVertical size={16} />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-10">
                    <button
                      onClick={() => onRemoveUser(user.userId)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      Remove
                    </button>

                    {user.role !== "viewer" && (
                      <button
                        onClick={() => onChangeRole(user.userId, "viewer")}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Make Viewer
                      </button>
                    )}

                    {user.role !== "editor" && (
                      <button
                        onClick={() => onChangeRole(user.userId, "editor")}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        Make Editor
                      </button>
                    )}
                  </div>
                </div>
              )}
              {/* Right: you actions */}
              {isYou && (
                <div className="hidden group-hover:block">
                  <button type="button" aria-label="User actions" className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700">
                    <MoreVertical size={16} />
                  </button>
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-50">
                    <button
                      type="button"
                      aria-label="Leave room"
                      onClick={handleLeaveRoom}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-500"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersPanel;
