import { FC } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Exercise_item, { exercise_loader } from "./pages/Exercise_item";
import Workout_item, { workout_loader } from "./pages/Workout_item";
import Workout_list from "./pages/Workout_list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workout_list />,
  },
  {
    path: "workout/:workout_id",
    element: <Workout_item />,
    loader: workout_loader,
  },
  {
    path: "workout/:workout_id/exercise/:exercise_id",
    element: <Exercise_item />,
    loader: exercise_loader,
  },
]);

const App_route: FC = () => <RouterProvider router={router} />;

export default App_route;
