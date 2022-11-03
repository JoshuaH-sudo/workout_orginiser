import { EuiListGroup, EuiListGroupItem, EuiPageSection } from "@elastic/eui";
import { FC } from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { v4 } from "uuid";
import useWorkouts from "../../hooks/useWorkouts";
import { Workout, Exercise } from "../store/slices/databaseSlice";

const Workout_item: FC = () => {
  const { workout_id } = useLoaderData() as Workout_loader_data;
  const { workout_store_handler } = useWorkouts();
  const current_workout = workout_store_handler.get_workout(workout_id);

  return (
    <>
      <EuiPageSection color="subdued" bottomBorder={true}>
        {current_workout.name}
      </EuiPageSection>

      <EuiPageSection color="subdued" bottomBorder={true}>
        <Exercise_list workout_id={current_workout.id} exercises={current_workout.exercises} />
      </EuiPageSection>
    </>
  );
};

interface Exercise_list_props {
  workout_id: string;
  exercises: Exercise[];
}

const Exercise_list: FC<Exercise_list_props> = ({ workout_id, exercises }) => {
  const get_url = (id: string) => `/workout/${workout_id}/exercise/${id}`;
  return (
    <EuiListGroup flush={true} bordered={true}>
      {exercises.map((exercise) => (
        <EuiListGroupItem label={exercise.name} href={get_url(exercise.id)} />
      ))}

      <EuiListGroupItem label={"Add exercise"} href={get_url(v4())} />
    </EuiListGroup>
  );
};

export interface Workout_loader_data {
  workout_id: string;
}
/**
 *gets the workout id form params
 */
export const workout_loader = ({ params }: LoaderFunctionArgs): Workout_loader_data => {
  return { workout_id: params.workout_id as string };
};

export default Workout_item;
