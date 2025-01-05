import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DraftTask, ITask, ITaskState } from "./task.interface";
import { RootState } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";

const initialState: ITaskState = {
  tasks: [],
  filter: "all",
};

const createNewTask = (task: DraftTask): ITask => {
  return {
    id: uuidv4(),
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
  },
});

export const selectTasks = (state: RootState) => state.todo.tasks;

export const selectFilter = (state: RootState) => state.todo.filter;

export const { addTask, toggleStatus } = taskSlice.actions;

export default taskSlice;
