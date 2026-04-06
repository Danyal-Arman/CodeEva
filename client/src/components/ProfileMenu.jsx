import React, { useEffect } from "react";
import { useUserBasic } from "../hooks/useUserBasic";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../features/api/authApi";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import { useAuth } from "../hooks/useAuth";


const ProfileMenu = ({isHome}) => {
  const { id, username, avatar, isAccountVerified } = useUserBasic();
  const {setUser} = useAuth();
  const [logoutUser, { data, isSuccess, error }] = useLogoutUserMutation();
  const navigate = useNavigate();
  

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully");
      setUser(null);
      navigate("/");
    }
    if (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  }, [isSuccess, data, error]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        className="flex items-center justify-center"
      >
        <Avatar
          username={username}
          avatar={avatar}
          id={id}
          width={isHome? 40 : 30}
          height={isHome? 40 : 30}
          rounded={isHome? "rounded-md" : "rounded-full"}
          text={isHome ? "text-xl" : "text-md"}
          isHome={isHome}
        />
        {/* <img src={avatar} /> */}
      </button>
      {isMenuOpen && (
        <div className={`absolute flex flex-col w-48 top-10 right-0 text-black shadow-lg rounded-md ${isHome ? "btn-secondary" : "dark:bg-zinc-800 dark:text-white p-2 bg-gray-50"}`}>
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Avatar
              username={username}
              avatar={avatar}
              id={id}
              width={100}
              height={100}
              text="text-4xl"
            />
            <span>{username}</span>
          </div>
          <div class="border-t border-gray-700 my-2 h-1 w-full"></div>
          <nav>
            <ul className="flex flex-col gap-1">
              {!isAccountVerified ? (
                <li className="hover:bg-gray-700/20 pl-4 py-1">
                  <Link to="/verify-email">Verify Account</Link>
                </li>
              ) : (
                <>
                  <li className="hover:bg-gray-700/20 pl-4 py-1">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="hover:bg-gray-700/20 pl-4 py-1">
                    <Link to="/settings">Settings</Link>
                  </li>
                </>
              )}
              <li className="hover:bg-gray-700/20 pl-4 py-1 text-red-500">
                <button onClick={handleLogout}>Sign out</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
