export type Exercise = {
  id: string;
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
    exercises: [{id: '0', name: "pushups" }, { id: '1', name: "chest fly" }],
  },
  {
    id: "1",
    name: "Workout 1",
    exercises: [{ id: '0', name: "sit-ups" }],
  },
];
