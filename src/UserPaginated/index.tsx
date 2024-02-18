import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useUserData, useUserFollowers } from "../hooks-queries";

const UserPaginated = () => {
  let { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams?.get("page") || "1");
  const [enableQueries, setEnableQueries] = useState(true);

  const { isLoading, error, data, isFetching, isPlaceholderData } =
    useUserFollowers(username, page, enableQueries);

  const { data: userData } = useUserData(username, enableQueries);

  const setPage = (newPage: string) => {
    setSearchParams({ page: newPage });
  };

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
            to={`/user-pagination/${follower.login}?page=1`}
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
      <div>Current Page: {page}</div>
      <button
        onClick={() => setPage(Math.max(page - 1, 1).toString())}
        disabled={page === 1}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => setPage(String(data?.length > 0 ? page + 1 : page))}
        disabled={isPlaceholderData || !(data?.length > 0)}
      >
        Next Page
      </button>
    </div>
  );
};

export default UserPaginated;
