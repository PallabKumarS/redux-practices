import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteTask, toggleStatus } from "@/redux/features/tasks/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import ConfirmationBox from "../shared/ConfirmationBox";
import { IPropTask } from "./task.interface";
import { TaskModal } from "./TaskModal";
import { selectUsers } from "@/redux/features/users/userSlice";

export default function TaskCard({ task }: IPropTask) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const user = users.find((user) => user.id === task.assignee);

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
              "line-through": task.status === "completed",
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
            onConfirm={() => dispatch(deleteTask(task?.id))}
          ></ConfirmationBox>

          {/* edit button here */}
          <TaskModal
            task={task}
            trigger={<TiEdit className="text-2xl text-blue-500" />}
          />

          {/* checkbox here */}
          <Checkbox
            className="text-2xl"
            checked={task.status === "completed"}
            onClick={() => dispatch(toggleStatus(task?.id))}
          />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
      {user && <p className="mt-5">Assigned to - {user ? user.name : ""}</p>}
    </div>
  );
}
