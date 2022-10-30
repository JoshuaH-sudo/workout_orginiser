import { EuiFormRow, EuiFieldText, EuiForm, EuiButton } from "@elastic/eui";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Exercise, Workout_store } from "../store/workouts";

interface Exercise_item_props {}

//will only see this if user is editing or crating a item
const Exercise_item: FC<Exercise_item_props> = ({}) => {
    const current_exercise = useLoaderData() as Exercise;
    const new_mode = current_exercise === null;

    let defualt_value = undefined;
    if (!new_mode) {
        defualt_value = { ...current_exercise };
    }

    //if current_exercise is null make new exercise
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
                        <EuiFieldText disabled={!new_mode} {...field} />
                    </EuiFormRow>
                )}
                control={control}
                name="name"
            />
            <EuiButton>{new_mode ? 'Create' : 'Edit' }</EuiButton>
        </EuiForm>
    );
};

export const excercise_loader = ({ params }: LoaderFunctionArgs): Exercise => {
    const workout_id = params.workout_id as string;
    const Workouts = Workout_store.getInstance();
    const current_workout = Workouts.get_workout(workout_id);

    const excercise_id = params.exercise_id;
    const current_exercise_index = current_workout.exercises.findIndex((exercise) => exercise.id === excercise_id);
    const current_exercise = current_workout.exercises[current_exercise_index] ?? null;

    return current_exercise;
};
export default Exercise_item;
