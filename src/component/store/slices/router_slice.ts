import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Exercise_item_props} from "../../pages/Exercise_item";
import { Workout_item_props } from "../../pages/Workout_item";

interface Pages_component_map {
  workout_list: any;
  workout_item: Workout_item_props;
  exercise_item: Exercise_item_props;
}

export type Pages = keyof Pages_component_map;

export interface Router_state<T extends keyof Pages_component_map> {
  current_page: T;
  current_page_props: Pages_component_map[T];
}

export type Route_page_map = Router_state<Pages>;

const initial_state: Route_page_map = {
  current_page: "workout_list",
  current_page_props: null,
};

export const router_slice = createSlice({
  name: "router",
  initialState: initial_state,
  reducers: {
    switch_page: (state, action: PayloadAction<Route_page_map>) => {
      state.current_page = action.payload.current_page;
      state.current_page_props = action.payload.current_page_props;
    },
  },
});

export const { switch_page } = router_slice.actions;

export default router_slice.reducer;
