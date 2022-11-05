import { EuiListGroup, EuiListGroupItem, EuiPageSection } from "@elastic/eui";
import { FC } from "react";
import { v4 } from "uuid";
import useRouter from "../../hooks/useRouter";
import useWorkouts from "../../hooks/useWorkouts";
import { Exercise } from "../store/slices/database_slice";

export interface Workout_item_props {
  workout_id: string;
}

const Workout_item: FC<Workout_item_props> = ({ workout_id }) => {
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
  const { go_to_page } = useRouter();
  return (
    <EuiListGroup flush={true} bordered={true}>
      {exercises.map((exercise) => (
        <EuiListGroupItem label={exercise.name} onClick={() => go_to_page("exercise_item", { workout_id, exercise_id: exercise.id })} />
      ))}

      <EuiListGroupItem label={"Add exercise"} onClick={() => go_to_page("exercise_item", { workout_id })} />
    </EuiListGroup>
  );
};

export default Workout_item;
