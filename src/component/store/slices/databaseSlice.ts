import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export class Exercise {
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

export class Workout {
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

interface Database_state {
  user_data: string;
  workouts: Workout[];
}

/**
 * A temporary function to retrive a temp database for testing
 */
const get_store_data = (): Database_state => {
  let retrived_database: Database_state;

  const stored_data = localStorage.getItem("data");

  if (stored_data == null) {
    //create a temp database it it does not exsist
    retrived_database = {
      user_data: "yeet",
      workouts: [
        new Workout("0", "Gym", [new Exercise("0", "pushups"), new Exercise("1", "chest fly")]), 
        new Workout("1", "Home", [new Exercise("0", "sit ups")])],
    };

    //save the new test database
    localStorage.setItem("database", JSON.stringify(retrived_database));
  } else {
    retrived_database = JSON.parse(stored_data);
  }

  return retrived_database;
};

// Define the initial state using that type
const initial_database_state: Database_state = get_store_data();

type Set_data_action = Partial<Database_state>;

export const databaseSlice = createSlice({
  name: "database",
  initialState: initial_database_state,
  reducers: {
    set_data_in_store: (state, action: PayloadAction<Set_data_action>) => {
      state = { ...state, ...action.payload };
    },
    get_data: (state, action: PayloadAction<Workout>) => {
    },
  },
});

export const { get_data, set_data_in_store } = databaseSlice.actions;

export default databaseSlice.reducer;
