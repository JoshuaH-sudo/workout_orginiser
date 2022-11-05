import { v4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../component/store/hooks";
import { Exercise, set_data_in_store, Workout } from "../component/store/slices/database_slice";

const useWorkouts = () => {
  const stored_workouts = useAppSelector((state) => state.database.workouts);
  const dispatch = useAppDispatch();

  //this class will allow a easier method of accessing and mainipulating the store state
  class Workout_store_handler {
    workouts: Workout[] = [];

    constructor(workouts: Workout[]) {
      this.workouts = workouts;
    }

    create_workout(name: string) {
      this.workouts.push({ id: v4(), name, exercises: [] });
      dispatch(set_data_in_store({ workouts: this.workouts }));
    }

    //retirves the workout from the database
    get_workout(workout_id: string): Workout {
      const current_workout_index = this.get_workout_index(workout_id);
      const current_workout = this.workouts[current_workout_index];
      return current_workout;
    }

    private get_workout_index(workout_id: string) {
      return this.workouts.findIndex((workout) => workout.id === workout_id);
    }
  }

  class Exercise_handler {
    id: string;
    name: string;

    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
    }

    public get_info() {
      return {
        id: this.id,
        name: this.name,
      };
    }
    public edit(name: string) {
      this.name = name;
    }
  }

  class Workout_handler {
    id: string;
    name: string;
    exercises: Exercise[];

    constructor(id: string, name: string, exercises: Exercise[] = []) {
      this.id = id;
      this.name = name;
      this.exercises = exercises;
    }

    public add_exercise(new_execerise: Exercise) {
      this.exercises.push(new_execerise);
    }

    public get_exercise(exercise_id: string) {
      return this.exercises.find((exercise) => exercise.id == exercise_id);
    }
  }

  const workout_store_handler = new Workout_store_handler(stored_workouts);

  return { workout_store_handler, stored_workouts, Exercise_handler, Workout_handler };
};

export default useWorkouts;
