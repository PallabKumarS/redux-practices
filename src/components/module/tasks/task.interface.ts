export interface ITask {
  _id?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignedTo?: string | null;
}

export interface ITaskState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

export type DraftTask = Pick<
  ITask,
  | "title"
  | "description"
  | "dueDate"
  | "priority"
  | "isCompleted"
  | "assignedTo"
>;

export interface IPropTask {
  task: ITask;
}
