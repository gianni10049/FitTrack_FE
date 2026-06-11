import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/redux";
import { modalSlice } from "./slices/modal";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  modal: modalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
