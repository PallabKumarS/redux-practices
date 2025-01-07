import App from "@/App";
import User from "@/components/pages/User";
import TaskPage from "@/components/pages/task";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <TaskPage />,
      },
      {
        path: "/users",
        element: <User />,
      },
    ],
  },
]);

export default routes;
