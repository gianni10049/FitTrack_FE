import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";
import type { RootState } from "./root-reducer";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();
