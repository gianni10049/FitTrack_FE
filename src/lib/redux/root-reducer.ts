import { combineReducers } from "@reduxjs/toolkit";
import { demoReducer } from "@/features/graphql-smoke/redux";
import { modalSlice } from "./slices/modal";

export const rootReducer = combineReducers({
  demo: demoReducer,
  modal: modalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
