import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  DraftTask,
  ITask,
  ITaskState,
} from "../../../components/module/tasks/task.interface";
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

// add few info into the task
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
    // add new task
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const newTask = createNewTask(action.payload);

      state.tasks.push(newTask);
    },

    // toggle status
    toggleStatus: (state, action: PayloadAction<ITask["id"]>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "ongoing" ? "completed" : "ongoing";
      }
    },

    // delete task
    deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // edit task
    editTask: (state, action: PayloadAction<ITask>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.dueDate = action.payload.dueDate;
        task.priority = action.payload.priority;
        task.assignee = action.payload.assignee;
      }
    },

    // update filter
    updateFilter: (state, action: PayloadAction<ITaskState["filter"]>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTask, (state, action) => {
      state.tasks.forEach((task) =>
        task.assignee === action.payload ? (task.assignee = null) : task
      );
    });
  },
});

export const selectTasks = (state: RootState) => {
  // filter tasks based on the filter
  if (state.taskStore.filter === "all") {
    return state.taskStore.tasks;
  } else {
    return state.taskStore.tasks.filter(
      (task) => task.priority === state.taskStore.filter
    );
  }
};

export const selectFilter = (state: RootState) => state.taskStore.filter;

export const { addTask, toggleStatus, deleteTask, editTask, updateFilter } =
  taskSlice.actions;

export default taskSlice;
