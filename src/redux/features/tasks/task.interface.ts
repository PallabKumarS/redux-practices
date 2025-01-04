type TTaskStatus = "Todo" | "In Progress" | "Completed";

type TTaskPriority = "Low" | "Medium" | "High";

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  dueDate: string;
}

export interface ITaskState {
  tasks: ITask[];
  filter:
    | "All"
    | "Completed"
    | "In Progress"
    | "Todo"
    | "High"
    | "Medium"
    | "Low";
}
