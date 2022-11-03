import { EuiFormRow, EuiFieldText, EuiForm, EuiButton, EuiText } from "@elastic/eui";
import { FC, useState } from "react";
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

  const [edit_mode, set_edit_mode] = useState(false);
  const complete_form = () => set_edit_mode(false);

  //create new exercise
  if (exercise == undefined) return <Exercise_form workout={workout} />;
  //edit existing exercise
  if (edit_mode) return <Exercise_form exercise={exercise} workout={workout} complete_form={complete_form} />;
  //display current exercise
  return (
    <EuiForm>
      <EuiFormRow>
        <EuiText>{exercise.name}</EuiText>
      </EuiFormRow>

      <EuiFormRow>
        <EuiButton onClick={() => set_edit_mode(true)}>Edit</EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
};

/**
 * conditonal prop types based on which mode is used
 */
type Exercise_form_props =
  | {
      exercise: Exercise;
      workout: Workout;
      complete_form: () => void;
    }
  | {
      exercise?: never;
      workout: Workout;
      complete_form?: never;
    };

/**
 * Display the create/edit form for exercise
 * @param exercise - if this is not undefined than the form will be in edit mode
 */
const Exercise_form: FC<Exercise_form_props> = ({ workout, exercise }) => {
  let defualt_value = exercise;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: defualt_value });

  const onSubmit = (data: Exercise): void => {
    exercise!.edit(data.name);
  };

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
      <EuiButton>{exercise != undefined ? "Edit" : "Create"}</EuiButton>
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
