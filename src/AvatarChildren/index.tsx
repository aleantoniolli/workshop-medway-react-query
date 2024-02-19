import React from "react";
import { useParams } from "react-router-dom";
import { useMutationUserData, useUserData } from "../hooks-queries";

const AvatarChildren = () => {
  let { username } = useParams();
  const { data: userData } = useUserData(username);
  const mutation = useMutationUserData();

  if (!userData) return null;

  const handleMutation = () => {
    mutation.mutate({ username: username });
  };

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
      <button onClick={handleMutation} disabled={mutation?.isPending}>
        {mutation?.isPending ? "Carregando..." : "Change image"}
      </button>
    </div>
  );
};

export default AvatarChildren;
