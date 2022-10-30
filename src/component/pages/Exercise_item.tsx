import { EuiFormRow, EuiFieldText, EuiForm } from "@elastic/eui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Exercise } from "../store/workouts";
import { get_workout } from "./Workout_item";

interface Exercise_item_props {}

const Exercise_item: FC<Exercise_item_props> = ({}) => {
    const current_exercise = useLoaderData() as Exercise;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => console.log(data);

    console.log(watch("name")); // watch input value by passing the name of it

    return (
        <EuiForm onSubmit={handleSubmit(onSubmit)}> 
            <EuiFormRow label="Name"> 
                <EuiFieldText {...register('name')}/>
            </EuiFormRow>
        </EuiForm>
    );
};

export const excercise_loader = ({ params }: LoaderFunctionArgs): Exercise => {
    const workout_id = params.workout_id as string;
    const current_workout = get_workout(workout_id);

    const excercise_id = params.exercise_id;
    const current_exercise_index = current_workout.exercises.findIndex((exercise) => exercise.id === excercise_id);
    const current_exercise = current_workout.exercises[current_exercise_index] ?? null;

    return current_exercise;
};
export default Exercise_item;
