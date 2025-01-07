import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import ConfirmationBox from "../shared/ConfirmationBox";
import { IPropTask } from "./task.interface";
import { TaskModal } from "./TaskModal";
import {
  useDeleteTaskMutation,
  useGetUsersQuery,
  useUpdateTaskMutation,
} from "@/redux/api/baseApi";
import { IUser } from "../users/user.interface";

export default function TaskCard({ task }: IPropTask) {
  const { data: userData, isLoading } = useGetUsersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) {
    return <h1 className="text-center mx-auto">Loading...</h1>;
  }

  const user = userData?.users?.find(
    (user: IUser) => user._id === task.assignedTo
  );

  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-red-500": task.priority === "high",
              "bg-yellow-500": task.priority === "medium",
              "bg-green-500": task.priority === "low",
            })}
          ></div>
          <h1
            className={cn({
              "line-through": task.isCompleted,
            })}
          >
            {task.title}
          </h1>
        </div>

        {/* edit delete and checkbox here  */}
        <div className="flex gap-3 items-center">
          {/* delete button here with alert dialog */}
          <ConfirmationBox
            trigger={<MdDeleteForever className="text-2xl text-red-500" />}
            onConfirm={() => deleteTask(task?._id)}
          ></ConfirmationBox>

          {/* edit button here */}
          <TaskModal
            task={task}
            trigger={<TiEdit className="text-2xl text-blue-500" />}
          />

          {/* checkbox here */}
          <Checkbox
            className="text-2xl"
            checked={task.isCompleted}
            onClick={() =>
              updateTask({
                id: task?._id,
                body: { isCompleted: !task.isCompleted },
              })
            }
          />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
      {user && <p className="mt-5">Assigned to - {user ? user.name : ""}</p>}
    </div>
  );
}
