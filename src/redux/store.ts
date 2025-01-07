import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import taskSlice from "./features/tasks/taskSlice";
import userSlice from "./features/users/userSlice";
// import logger from "./middlewares/logger";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    taskStore: taskSlice.reducer,
    userStore: userSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
