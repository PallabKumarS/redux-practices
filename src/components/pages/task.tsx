import TaskCard from "../module/tasks/TaskCard";
import { TaskModal } from "../module/tasks/TaskModal";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useGetTasksQuery } from "@/redux/api/baseApi";
import { ITask } from "../module/tasks/task.interface";
const TaskPage = () => {
  const { data, isLoading } = useGetTasksQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <h1 className="text-center mx-auto">Loading...</h1>;

  return (
    <div className="mx-auto max-w-7xl px-4 mt-20">
      <div className="mt-10 justify-between md:flex items-center gap-4">
        <h1 className="text-4xl font-bold">Task Page</h1>

        <div className="flex gap-5 mt-5 md:mt-0">
          {/* tab view here  */}
          <Tabs defaultValue="all" className="mr-20">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <TabsTrigger
                // onClick={() => dispatch(updateFilter("all"))}
                value="all"
              >
                All Tasks
              </TabsTrigger>
              <TabsTrigger
                // onClick={() => dispatch(updateFilter("low"))}
                value="low"
              >
                Low
              </TabsTrigger>
              <TabsTrigger
                // onClick={() => dispatch(updateFilter("medium"))}
                value="medium"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger
                // onClick={() => dispatch(updateFilter("high"))}
                value="high"
              >
                High
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <TaskModal />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {!isLoading &&
          data?.tasks?.map((task: ITask) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default TaskPage;
