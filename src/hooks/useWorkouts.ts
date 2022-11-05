import { v4 } from "uuid";
import { useAppSelector, useAppDispatch } from "../component/store/hooks";
import { Exercise, set_data_in_store, Workout } from "../component/store/slices/database_slice";

const useWorkouts = () => {
  const stored_workouts = useAppSelector((state) => state.database.workouts);
  const dispatch = useAppDispatch();

  //this class will allow a easier method of accessing and mainipulating the store state
  class Workout_store_handler {
    workouts: Workout[];

    constructor(workouts: Workout[] = []) {
      this.workouts = workouts;
    }

    create_workout(name: string) {
      const new_workout: Workout = { id: v4(), name, exercises: [] };
      this.workouts.push(new_workout);
      this.update_workouts_store();
    }

    get_workout_data(workout_id: string): Workout {
      const current_workout_index = this.get_workout_index(workout_id);
      const current_workout = this.workouts[current_workout_index];
      return current_workout;
    }

    get_workout_handler(workout_id: string): Workout_handler {
      const workout_data = this.get_workout_data(workout_id)
      return new Workout_handler(workout_data)
    }

    update_workout(workout: Workout) {
      const current_workout_index = this.get_workout_index(workout.id);
      this.workouts[current_workout_index] = { ...workout };
      this.update_workouts_store();
    }

    private update_workouts_store() {
      dispatch(set_data_in_store({ workouts: this.workouts }));
    }

    private get_workout_index(workout_id: string) {
      return this.workouts.findIndex((workout) => workout.id === workout_id);
    }
  }

  /**
   * This handler takes workout data and provides methods,
   * to make it easier to preform manipulation
   */
  class Workout_handler extends Workout_store_handler {
    id: string;
    name: string;
    exercises: Exercise[];

    constructor(workout: Workout) {
      super(stored_workouts);
      this.id = workout.id;
      this.name = workout.name;
      this.exercises = workout.exercises;
    }

    public create_exercise(name: string) {
      const new_execerise: Exercise = { id: v4(), name, workout_id: this.id };
      this.exercises.push(new_execerise);
      this.update_workout(this.get_info());
    }

    /*
     * As the the exercise data is nested within workout in an array,
     * it is better for the Workout_handler to have the responsiablity of mangaging its exercise property within its class and
     * any data nested within exercise can be handled by the Exercise_handler
     */

    public update_exercise(update_exercise: Exercise) {
      const update_exercise_index = this.exercises.findIndex((exercise) => exercise.id == update_exercise.id);
      this.exercises[update_exercise_index] = { ...update_exercise };
      this.update_workout(this.get_info());
    }

    public get_exercise(exercise_id: string) {
      return this.exercises.find((exercise) => exercise.id == exercise_id);
    }

    public get_info(): Workout {
      return {
        id: this.id,
        name: this.name,
        exercises: this.exercises,
      };
    }
  }

  /**
   * @param workout_handler - This allows the exercise class to use methods provided in the workout_handler class
   */
  class Exercise_handler extends Workout_store_handler {
    id: string = v4();
    name: string;
    workout_id: string;
    workout_handler: Workout_handler;

    constructor(exercise: Exercise) {
      super(stored_workouts);
      this.id = exercise.id;
      this.name = exercise.name;
      this.workout_id = exercise.workout_id;

      const workout_data = this.get_workout_data(this.workout_id);
      this.workout_handler = new Workout_handler(workout_data);
    }

    public get_info(): Exercise {
      return {
        id: this.id,
        name: this.name,
        workout_id: this.workout_id,
      };
    }

    public edit(exercise: Exercise) {
      this.name = exercise.name;
      this.workout_handler.update_exercise(this.get_info());
    }
  }

  const workout_store_handler = new Workout_store_handler(stored_workouts);

  return { workout_store_handler, stored_workouts, Exercise_handler, Workout_handler };
};

export default useWorkouts;
