import { selectTasks } from "@/redux/features/tasks/taskSlice";
import { useAppSelector } from "@/redux/hook";
import TaskCard from "../module/task/TaskCard";
import { AddTaskModal } from "../module/task/AddTaskModal";

const TaskPage = () => {
  const tasks = useAppSelector(selectTasks);

  return (
    <div className="mx-auto max-w-7xl px-4 mt-20">
      <div className="mt-10 justify-between flex items-center">
        <h1 className="text-4xl font-bold">Task Page</h1>
        <AddTaskModal />
      </div>
      <div className="mt-5 space-y-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
