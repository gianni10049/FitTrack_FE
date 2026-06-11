import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch } from "./app-dispatch";
import type { RootState } from "./root-reducer";
import type { ThunkExtra } from "./thunk-extra";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: ThunkExtra;
  rejectValue: string;
}>();
