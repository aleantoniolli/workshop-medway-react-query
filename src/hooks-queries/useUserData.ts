import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserData = async (username?: string) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  return data;
};

const useUserData = (username?: string, enableQueries = true) => {
  return useQuery({
    queryKey: ["userData", username],
    queryFn: () => fetchUserData(username),
    staleTime: 300000, //5 minutes
    enabled: !!(enableQueries && username),
  });
};

export default useUserData;
