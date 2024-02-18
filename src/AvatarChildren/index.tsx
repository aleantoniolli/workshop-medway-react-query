import React from "react";
import { useParams } from "react-router-dom";
import { useUserData } from "../hooks-queries";

const AvatarChildren = () => {
  let { username } = useParams();

  const { data: userData } = useUserData(username);
  if (!userData) return null;
  return (
    <div
      key={userData.id}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <img
        src={userData.avatar_url}
        alt={userData.login}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
    </div>
  );
};

export default AvatarChildren;
