import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserData, useUserFollowers } from "../hooks-queries";

const User = () => {
  let { username } = useParams();
  const [enableQueries, setEnableQueries] = useState(true);
  const { isLoading, error, data, isFetching } = useUserFollowers(
    username,
    undefined,
    enableQueries
  );

  const { data: userData } = useUserData(username, enableQueries);

  const totalFollowers = userData?.followers;
  const totalFollowing = userData?.following;

  if (isLoading) return "Loading...";

  if (error)
    return (
      "An error has occurred: " + error?.response?.data?.message ||
      error?.message
    );

  return (
    <div>
      {isFetching ? <span> Loading...</span> : null}{" "}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h1>GitHub Followers of {username}</h1>
        <img
          src={userData?.avatar_url}
          alt={userData?.login}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginLeft: "10px",
          }}
        />
      </div>
      <p>Total Followers: {totalFollowers}</p>
      <p>Total following: {totalFollowing}</p>
      <button
        onClick={() => setEnableQueries(!enableQueries)}
        style={{ marginBottom: "15px" }}
      >
        {enableQueries ? "Disabled Queries" : "Enable Queries"}
      </button>
      <div>
        {data?.map((follower) => (
          <Link
            to={`/user/${follower.login}`}
            key={follower.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={follower.avatar_url}
                alt={follower.login}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <p>{follower.login}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default User;
