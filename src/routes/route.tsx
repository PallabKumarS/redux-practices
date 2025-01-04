import App from "@/App";
import TaskPage from "@/components/pages/task";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskPage />,
      },
    ],
  },
]);

export default routes;
