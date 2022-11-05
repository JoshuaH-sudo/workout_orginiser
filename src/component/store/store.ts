import { configureStore } from "@reduxjs/toolkit";
import database_slice from "./slices/database_slice";
import router_slice from "./slices/router_slice";

const store = configureStore({
  reducer: {
    database: database_slice,
    router: router_slice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store
