import { createSlice } from "@reduxjs/toolkit";
import type { WorkoutTemplateGql } from "@/lib/graphql/graphql";
import { onTodayWorkoutTemplate } from "./thunks";

type AsyncStatus = "idle" | "loading" | "failed";

export interface WorkoutSliceState {
  today_workout_template_status: AsyncStatus;
  today_workout_template: WorkoutTemplateGql | null;
  today_workout_template_error: string | null;
}

const initialState: WorkoutSliceState = {
  today_workout_template_status: "loading",
  today_workout_template: null,
  today_workout_template_error: null,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    clearWorkoutErrors(state) {
      state.today_workout_template_error = null;
      if (state.today_workout_template_status === "failed") {
        state.today_workout_template_status = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onTodayWorkoutTemplate.pending, (state) => {
        state.today_workout_template_status = "loading";
        state.today_workout_template_error = null;
      })
      .addCase(onTodayWorkoutTemplate.fulfilled, (state, action) => {
        state.today_workout_template_status = "idle";
        state.today_workout_template = action.payload;
        state.today_workout_template_error = null;
      })
      .addCase(onTodayWorkoutTemplate.rejected, (state, action) => {
        state.today_workout_template_status = "failed";
        state.today_workout_template_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      });
  },
});

export const { clearWorkoutErrors } = workoutSlice.actions;
