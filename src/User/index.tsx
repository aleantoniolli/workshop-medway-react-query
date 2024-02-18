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

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {isFetching ? <span> Loading...</span> : null}{" "}
      <h1>GitHub Followers of {username}</h1>
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
              key={follower.id}
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
