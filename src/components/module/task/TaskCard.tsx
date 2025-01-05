import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteTask, toggleStatus } from "@/redux/features/tasks/taskSlice";
import { useAppDispatch } from "@/redux/hook";

import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import ConfirmationBox from "../shared/ConfirmationBox";
import { IPropTask } from "./task.interface";
import { AddTaskModal } from "./AddTaskModal";

export default function TaskCard({ task }: IPropTask) {
  const dispatch = useAppDispatch();

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
        <div className="flex gap-3 items-center">
          {/* delete button here with alert dialog */}
          <ConfirmationBox
            trigger={<MdDeleteForever className="text-2xl text-red-500" />}
            onConfirm={() => dispatch(deleteTask(task?.id as string))}
          ></ConfirmationBox>

          {/* edit button here */}
          <AddTaskModal task={task} trigger={<TiEdit className="text-2xl" />} />

          {/* checkbox here */}
          <Checkbox
            className="text-2xl"
            checked={task.status === "completed"}
            onClick={() => dispatch(toggleStatus(task?.id as string))}
          />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
    </div>
  );
}
