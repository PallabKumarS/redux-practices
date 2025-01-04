import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import taskSlice from "./features/tasks/taskSlice";
// import logger from "./middlewares/logger";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todo: taskSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
