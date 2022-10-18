import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiListGroup,
  EuiListGroupItem,
  EuiPageSection,
} from "@elastic/eui";
import { FC } from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { Exercise, Workout, workouts } from "../store/workouts";

const Workout_item: FC = () => {
  // @ts-ignore
  const current_workout = useLoaderData() as Workout;
  return (
    <>
      <EuiPageSection color="subdued" bottomBorder={true}>
        {current_workout.name}
      </EuiPageSection>

      <EuiPageSection color="subdued" bottomBorder={true}>
        <Exercise_list exercises={current_workout.exercises} />
      </EuiPageSection>
    </>
  );
};
interface Exercise_list_props {
  exercises: Exercise[];
}

const Exercise_list: FC<Exercise_list_props> = ({ exercises }) => {
  return (
    <EuiListGroup flush={true} bordered={true}>
      {exercises.map((exercise) => (
        <EuiListGroupItem label={exercise.name} />
      ))}
    </EuiListGroup>
  );
};

export const workout_loader = ({ params }: LoaderFunctionArgs): Workout => {
  const workout_id = params.id;
  const current_workout_index = workouts.findIndex(
    (workout) => workout.id === workout_id
  );
  const current_workout = workouts[current_workout_index];
  return current_workout;
};

export default Workout_item;
