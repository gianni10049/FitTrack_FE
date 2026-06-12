import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, hydrationSlice, modalSlice, workoutSlice } from "./slices";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  hydration: hydrationSlice.reducer,
  workout: workoutSlice.reducer,
  modal: modalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
