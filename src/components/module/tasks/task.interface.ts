export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: "ongoing" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignee?: string | null;
}

export interface ITaskState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

export type DraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority"
>;

export interface IPropTask {
  task: ITask;
}
