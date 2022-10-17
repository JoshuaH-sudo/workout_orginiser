import { FC } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Workout_item from "./pages/Workout_item";
import Workout_list from "./pages/Workout_list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workout_list />,
  },
  {
    path: "item/:id",
    element: <Workout_item/>,
  },
]);

const App_route: FC = () => <RouterProvider router={router} />;

export default App_route;
