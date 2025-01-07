import { MdDeleteForever } from "react-icons/md";
import { IUser } from "./user.interface";
import { TiEdit } from "react-icons/ti";
import { useAppDispatch } from "@/redux/hook";
import ConfirmationBox from "../shared/ConfirmationBox";
import { deleteUser } from "@/redux/features/users/userSlice";
import { UserModal } from "./UserModal";

export default function UserCard({ user }: { user: IUser }) {
  const dispatch = useAppDispatch();

  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <div className="flex gap-3 items-center">
          {/* delete button here with alert dialog */}
          <ConfirmationBox
            trigger={<MdDeleteForever className="text-2xl text-red-500" />}
            onConfirm={() => dispatch(deleteUser(user.id))}
          />

          {/* edit button here */}
          <UserModal
            trigger={<TiEdit className="text-2xl text-blue-500" />}
            user={user}
          />
        </div>
      </div>
      <p className="mt-5">{user.email}</p>
    </div>
  );
}
