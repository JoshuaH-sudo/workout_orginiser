import { EuiFormRow, EuiFieldText, EuiForm, EuiButton, EuiText } from "@elastic/eui";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import useWorkouts from "../../hooks/useWorkouts";
import { Exercise, Workout } from "../store/slices/databaseSlice";
import { Workout_loader_data } from "./Workout_item";

interface Exercise_item_props {}

/**
 *Displays the exercise item's value to edit or create new ones
 */
const Exercise_item: FC<Exercise_item_props> = ({}) => {
  const { workout_id, exercise_id } = useLoaderData() as Exercise_loader_data;
  const { workout_store_handler } = useWorkouts();

  const workout = workout_store_handler.get_workout(workout_id);
  const exercise = workout.get_exercise(exercise_id);

  if (exercise == undefined) return <Exercise_form mode="create" workout={workout} />;
  return (
    <EuiForm>
      <Display_exercise exercise={exercise} />
    </EuiForm>
  );
};

interface Display_exercise_props {
  exercise: Exercise;
}

const Display_exercise: FC<Display_exercise_props> = ({ exercise }) => {
  return (
    <>
      <EuiFormRow>
        <EuiText>{exercise.name}</EuiText>
      </EuiFormRow>

      <EuiFormRow>
        <EuiButton>Edit</EuiButton>
      </EuiFormRow>
    </>
  );
};

/**
 *conditonal prop types based on which mode is used
 */
type Exercise_form_props =
  | {
      mode: "edit";
      exercise: Exercise;
      workout: Workout;
    }
  | {
      mode: "create";
      exercise?: never;
      workout: Workout;
    };

/**
 * Display the create/edit form for exercise
 */
const Exercise_form: FC<Exercise_form_props> = ({ mode, workout, exercise }) => {
  let defualt_value = undefined;
  if (mode === "edit") {
    defualt_value = { ...exercise };
  }

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ defaultValues: defualt_value });
  const onSubmit = (data: any) => console.log(data);

  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <EuiForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
          <EuiFormRow label="Name" error={errors.name?.message}>
            <EuiFieldText {...field} />
          </EuiFormRow>
        )}
        control={control}
        name="name"
      />
      <EuiButton>{mode == "create" ? "Create" : "Edit"}</EuiButton>
    </EuiForm>
  );
};

export interface Exercise_loader_data extends Workout_loader_data {
  exercise_id: string;
}
export const exercise_loader = ({ params }: LoaderFunctionArgs): Exercise_loader_data => {
  const { workout_id, exercise_id } = params;
  return { workout_id, exercise_id } as Exercise_loader_data;
};
export default Exercise_item;
