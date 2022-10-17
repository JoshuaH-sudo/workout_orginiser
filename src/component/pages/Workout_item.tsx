import { FC } from "react"
import { workouts } from "../store/workouts"

const Workout_item: FC = () => {
    const workout_id = "1"
    const current_workout_index = workouts.findIndex((workout) => workout.id === workout_id)
    const current_workout = workouts[current_workout_index]

    return (
        <h1>{current_workout.name}</h1>
    )
}

export default Workout_item