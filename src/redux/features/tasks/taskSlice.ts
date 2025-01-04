import { createSlice } from "@reduxjs/toolkit";
import { ITaskState } from "./task.interface";
import { RootState } from "@/redux/store";

const initialState: ITaskState = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      description: "Task 1 description",
      dueDate: "2021-10-10",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Task 2 description",
      dueDate: "2021-10-10",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Task 3 description",
      dueDate: "2021-10-10",
      priority: "Low",
      status: "In Progress",
    },
  ],
  filter: "All",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
});

export const selectTasks = (state: RootState) => state.todo.tasks;

export const selectFilter = (state: RootState) => state.todo.filter;

export const { addTask } = taskSlice.actions;

export default taskSlice;
