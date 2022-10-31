import { v4 } from "uuid";

/*
        {
            id: "0",
            name: "Workout 0",
            exercises: [
                { id: "0", name: "pushups" },
                { id: "1", name: "chest fly" },
            ],
        },
        {
            id: "1",
            name: "Workout 1",
            exercises: [{ id: "0", name: "sit-ups" }],
        },
*/

export class Workout_store_handler {
    private static instance: Workout_store_handler;
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {}

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Workout_store_handler {
        if (!Workout_store_handler.instance) {
            Workout_store_handler.instance = new Workout_store_handler();
        }

        return Workout_store_handler.instance;
    }

    workouts: Workout[] = [
        new Workout("Gym", [
            { id: "0", name: "pushups" },
            { id: "1", name: "chest fly" },
        ]),
        new Workout("Home", [{ id: "0", name: "sit ups" }]),
    ];

    create_workout(name: string) {
        this.workouts.push(new Workout(name));
    }

    //retirves the workout from the database
    get_workout(workout_id: string) {
        const current_workout_index = this.get_workout_index(workout_id);
        const current_workout = this.workouts[current_workout_index];
        return current_workout;
    }

    private get_workout_index(workout_id: string) {
        return this.workouts.findIndex((workout) => workout.id === workout_id);
    }
}

export type Exercise = {
    id: string;
    name: string;
};

export class Workout {
    id = v4();
    name: string;
    exercises: Exercise[];

    constructor(name: string, exercises: Exercise[] = []) {
        this.name = name;
        this.exercises = exercises;
    }

    public add_exercise(new_execerise: Exercise) {
        this.exercises.push(new_execerise);
    }
}
