export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: "ongoing" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface ITaskState {
  tasks: ITask[];
  filter: "all" | "completed" | "high" | "medium" | "low" | "ongoing";
}

export type DraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority"
>;
