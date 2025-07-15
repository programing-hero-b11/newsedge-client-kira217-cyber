import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useStatus = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: userStatus,
    isLoading: isStatusLoading,
    refetch,
  } = useQuery({
    queryKey: ["userStatus", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/userStatus/${user?.email}`);
      return data;
    },
  });
  console.log(userStatus, isStatusLoading);

  return [userStatus?.userStatus, isStatusLoading,refetch];
};

export default useStatus;
