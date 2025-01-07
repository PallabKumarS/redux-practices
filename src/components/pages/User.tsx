import { useAppSelector } from "@/redux/hook";
import { UserModal } from "../module/users/UserModal";
import UserCard from "../module/users/UserCard";
import { selectUsers } from "@/redux/features/users/userSlice";

export default function User() {
  const users = useAppSelector(selectUsers);

  return (
    <div className="mx-auto max-w-7xl px-4 mt-20">
      <div className="mt-10 justify-between md:flex items-center gap-4">
        <h1 className="text-4xl font-bold">User Page</h1>

        <UserModal />
      </div>
      <div className="mt-10 justify-between grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-4">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
