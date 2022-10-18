import { FC } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Workout_item, { workout_loader } from "./pages/Workout_item";
import Workout_list from "./pages/Workout_list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workout_list />,
  },
  {
    path: "item/:id",
    element: <Workout_item/>,
    loader: workout_loader 
  },
]);

const App_route: FC = () => <RouterProvider router={router} />;

export default App_route;
