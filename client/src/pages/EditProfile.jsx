import { useEffect, useState } from "react";
import { useUpdateUserProfileMutation } from "../features/api/userApi";
import { useUserBasic } from "../hooks/useUserBasic";

export default function EditProfile() {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const { username, website, bio, location, isAuthLoading } = useUserBasic();
  const [formData, setFormData] = useState({
    username: "",
    website: "",
    bio: "",
    location: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(formData);
  };

  useEffect(() => {
    if (isLoading) {
      setIsSaving(true);
    } else {
      setIsSaving(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!username && !website && !bio && !location) return;
    if (username) {
      setFormData({
        username: username,
        website: website,
        bio: bio,
        location: location,
      });
    }
  }, [username, website, bio, location]);

  const isDataLoading =
      isAuthLoading ||
      ( !username && !website && !bio && !location );
  
    useEffect(() => {
      if (!isDataLoading) {
        setIsReady(true);
      }
    }, [isDataLoading]);

  return (
    <section className={`relative max-w-7xl mx-auto min-h-[calc(100vh-40px)] bg-zinc-900 flex items-center justify-center px-4 transition-all duration-700 ${isReady ? "opacity-100 translate-y-0" : "opacity-0"}`}>
      <div className="w-full max-w-xl border-4 border-zinc-700 text-white rounded-2xl shadow-sm p-8">
        {/* Heading */}
        <h2 className="absolute top-10 left-4 text-2xl font-semibold text-red-600">
          Edit Profile
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-2 py-0.5 bg-zinc-600/40 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-zinc-900/60 transition-all duration-200"
              // placeholder="Enter your name"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="2"
              className="w-full px-2 py-1 bg-zinc-600/40 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-zinc-900/60 transition-all duration-200"
              // placeholder="Tell us about yourself"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-2 py-1 bg-zinc-600/40 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-zinc-900/60 transition-all duration-200"
              // placeholder="Enter your location" 
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-2">
              Website(optional)
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-2 py-1 bg-zinc-600/40 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-zinc-900/60 transition-all duration-200"
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-sm border border-zinc-600/50 hover:bg-gray-100 hover:text-gray-950 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-sm bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
