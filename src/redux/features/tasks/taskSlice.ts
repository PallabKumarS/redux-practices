import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  DraftTask,
  ITask,
  ITaskState,
} from "../../../components/module/task/task.interface";
import { RootState } from "@/redux/store";

const initialState: ITaskState = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      status: "ongoing",
      priority: "high",
      dueDate: "2023-09-10",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      status: "completed",
      priority: "medium",
      dueDate: "2023-09-11",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      status: "ongoing",
      priority: "low",
      dueDate: "2023-09-12",
    },
  ],
  filter: "all",
};

const createNewTask = (task: DraftTask): ITask => {
  return {
    id: nanoid(),
    ...task,
    status: "ongoing",
  };
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const newTask = createNewTask(action.payload);

      state.tasks.push(newTask);
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "ongoing" ? "completed" : "ongoing";
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.dueDate = action.payload.dueDate;
        task.priority = action.payload.priority;
      }
    },
  },
});

export const selectTasks = (state: RootState) => state.todo.tasks;

export const selectFilter = (state: RootState) => state.todo.filter;

export const { addTask, toggleStatus, deleteTask, editTask } =
  taskSlice.actions;

export default taskSlice;
