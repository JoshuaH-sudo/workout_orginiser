export type Exercise = {
  name: string;
};

export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
};

export const workouts: Workout[] = [
  {
    id: "0",
    name: "Workout 0",
    exercises: [{ name: "pushups" }, { name: "chest fly" }],
  },
  {
    id: "1",
    name: "Workout 1",
    exercises: [{ name: "sit-ups" }],
  },
];
