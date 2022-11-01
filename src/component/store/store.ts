import { configureStore } from "@reduxjs/toolkit";
import databaseSlice from "./slices/databaseSlice";

const store = configureStore({
  reducer: {
    database: databaseSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store
