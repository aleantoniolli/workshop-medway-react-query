import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserFollowers = async (username?: string, page?: number) => {
  const url = page
    ? `https://api.github.com/users/${username}/followers?page=${page}`
    : `https://api.github.com/users/${username}/followers`;
  const { data } = await axios.get(url);
  return data;
};

const useUserFollowers = (
  username?: string,
  page?: number,
  enableQueries = true
) => {
  return useQuery({
    queryKey: ["userFollowers", username, page],
    queryFn: () => fetchUserFollowers(username, page),
    staleTime: 300000, //5 minutes
    enabled: enableQueries,
  });
};

export default useUserFollowers;
