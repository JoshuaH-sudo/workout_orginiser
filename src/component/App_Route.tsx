import { FC } from "react";
//import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router-dom";
import useRouter from "../hooks/useRouter";
import Exercise_item from "./pages/Exercise_item";
import Workout_item from "./pages/Workout_item";
import Workout_list from "./pages/Workout_list";

const App_route: FC = () => {
  const { router } = useRouter();
  switch (router.current_page) {
    case "workout_list":
      return <Workout_list {...router.current_page_props} />;
    case "workout_item":
      return <Workout_item {...router.current_page_props} />;
    case "exercise_item":
      return <Exercise_item {...router.current_page_props} />;
    default:
      return <>{`Route: ${router.current_page} not defined`}</>;
  }
};

export default App_route;
