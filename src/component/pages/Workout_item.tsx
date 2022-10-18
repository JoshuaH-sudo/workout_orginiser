import { FC } from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { Workout, workouts } from "../store/workouts";

const Workout_item: FC = () => {
  // @ts-ignore
  const { current_workout } = useLoaderData();
  return <h1>{current_workout.name}</h1>;
};

export const workout_loader = ({
  params,
}: LoaderFunctionArgs): {
  current_workout: Workout;
} => {
  const workout_id = params.id;
  const current_workout_index = workouts.findIndex(
    (workout) => workout.id === workout_id
  );
  const current_workout = workouts[current_workout_index];
  return { current_workout };
};

export default Workout_item;
