import { generateUserColor } from "../utils/generateUserColor";
import React from "react";

const Avatar = ({
  username,
  avatar,
  id,
  isHome,
  width,
  height,
  rounded = "rounded-full",
  text = "text-xl",
}) => {
  const bgColor = generateUserColor(id);
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`flex flex-col justify-center items-center ${rounded}`}
      style={{ width: width, height: height, backgroundColor: bgColor }}
    >
      {avatar && !imgError ? (
        <img
          src={avatar}
          alt="avatar"
          className={`${isHome? "" : "rounded-full"} w-full h-full object-cover`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`${text}`}>{username.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export default Avatar;
