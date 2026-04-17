import { useUserBasic } from "../hooks/useUserBasic";
import { Link } from "react-router-dom";
import { useGetUserStatsQuery } from "../features/api/userApi";
import { useLogoutUserMutation } from "../features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const [isReady, setIsReady] = useState(false);
  const {
    id,
    username,
    email,
    bio,
    avatar,
    location,
    createdAt,
    isAuthLoading,
  } = useUserBasic();
  const { setUser } = useAuth();

  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const userStats = useGetUserStatsQuery({ refetchOnMountOrArgChange: true });
  const [logoutUser, { data, isSuccess, error }] = useLogoutUserMutation();
  const navigate = useNavigate();

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
  }, [isSuccess, error, data, setUser, navigate]);

  const isLoading =
    isAuthLoading ||
    (!id && !username && !email && !bio && !avatar && !location && !createdAt);

  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  return (
    <section
      className={`bg-zinc-900 m-3.5 md:m-0 transition-all duration-700 ${
        isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="max-w-6xl md:py-[180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ================= LEFT PROFILE CARD ================= */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <Avatar
                username={username}
                avatar={avatar}
                id={id}
                width={100}
                height={100}
                rounded="rounded-full"
                text="text-3xl"
              />

              {/* Username */}
              <h2 className="mt-4 text-lg font-semibold text-white">
                {username}
              </h2>
            </div>

            {/* Stats */}
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Rooms Created</span>
                <span className="text-white font-medium">
                  {userStats?.data?.stats?.created || 0}
                </span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Collaborations</span>
                <span className="text-white font-medium">
                  {userStats?.data?.stats?.collaborations || 0}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <Link
                to="/profile/edit"
                className="block w-full text-center py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-sm font-medium"
              >
                Edit Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* ================= RIGHT ACCOUNT INFO ================= */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-8 text-white">
              Account Information
            </h3>

            <div className="space-y-8">
              {/* Email */}
              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <p className="text-base font-medium text-white mt-1">{email}</p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm text-zinc-400">Location</p>
                <p className="text-base font-medium text-white mt-1">
                  {location || "Not specified"}
                </p>
              </div>

              {/* Bio */}
              <div>
                <p className="text-sm text-zinc-400">Bio</p>
                <p className="text-base leading-relaxed text-gray-300 mt-1">
                  {bio || "No bio added yet."}
                </p>
              </div>

              {/* Joined */}
              <div>
                <p className="text-sm text-zinc-400">Joined</p>
                <p className="text-base font-medium text-white mt-1">
                  {joinedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Profile;
