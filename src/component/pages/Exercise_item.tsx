import { EuiFormRow, EuiFieldText, EuiForm, EuiButton, EuiText } from "@elastic/eui";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useWorkouts from "../../hooks/useWorkouts";
import { Exercise, Workout } from "../store/slices/database_slice";

export interface Exercise_item_props {
  workout_id: string;
  exercise_id?: string;
}

/**
 *Displays the exercise item's value to edit or create new ones
 */
const Exercise_item: FC<Exercise_item_props> = ({ workout_id, exercise_id }) => {
  const { workout_store_handler } = useWorkouts();

  const workout = workout_store_handler.get_workout_handler(workout_id);
  const exercise = exercise_id ? workout.get_exercise(exercise_id) : undefined;

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
 * @param exercise - if this is defined than the form will be in edit mode
 */
const Exercise_form: FC<Exercise_form_props> = ({ workout, exercise, complete_form }) => {
  let defualt_value = exercise;
  const { Exercise_handler } = useWorkouts();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: defualt_value });

  const onSubmit = (data: Exercise): void => {
    const exercise_handler = new Exercise_handler(data);
    exercise_handler.edit(data);
    complete_form!();
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
      <EuiButton type="submit">{exercise != undefined ? "Confirm" : "Create"}</EuiButton>
    </EuiForm>
  );
};

export default Exercise_item;
