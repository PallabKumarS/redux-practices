import { UserModal } from "../module/users/UserModal";
import UserCard from "../module/users/UserCard";
import { useGetUsersQuery } from "@/redux/api/baseApi";
import { IUser } from "../module/users/user.interface";

export default function User() {
  const { data, isLoading } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <h1 className="text-center mx-auto">Loading...</h1>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 mt-20">
      <div className="mt-10 justify-between md:flex items-center gap-4">
        <h1 className="text-4xl font-bold">User Page</h1>

        <UserModal />
      </div>
      <div className="mt-10 justify-between grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-4">
        {!isLoading &&
          data?.users?.map((user: IUser) => (
            <UserCard key={user._id} user={user} />
          ))}
      </div>
    </div>
  );
}
