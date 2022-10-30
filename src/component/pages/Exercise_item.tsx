import {EuiFormRow, EuiFieldText} from "@elastic/eui";
import {FC} from "react";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Exercise} from "../store/workouts";
import {get_workout} from "./Workout_item";

interface Exercise_item_props {}

const Exercise_item: FC<Exercise_item_props> = ({}) => {
    const current_exercise = useLoaderData() as Exercise;
const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

    return (
    <EuiFormRow
            label="Text field"
  helpText="I am some friendly help text."
>
  <EuiFieldText />
        </EuiFormRow>
)
};

export const excercise_loader = ({params}: LoaderFunctionArgs): Exercise => {
    const workout_id = params.workout_id as string
    const current_workout = get_workout(workout_id)

    const excercise_id = params.exercise_id
    const current_exercise_index = current_workout.exercises.findIndex((exercise) => exercise.id === excercise_id)
    const current_exercise = current_workout.exercises[current_exercise_index] ?? null

    return current_exercise
}
export default Exercise_item;
