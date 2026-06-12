import { createSlice } from "@reduxjs/toolkit";
import type { WaterIntakeDayGql } from "@/lib/graphql/graphql";
import {
  onLogWaterIntake,
  onMyWaterIntakeHistory,
  onMyWaterIntakeToday,
} from "./thunks";

type AsyncStatus = "idle" | "loading" | "failed";

export interface HydrationSliceState {
  my_water_intake_today_status: AsyncStatus;
  my_water_intake_today: WaterIntakeDayGql | null;
  my_water_intake_today_error: string | null;
  my_water_intake_history_status: AsyncStatus;
  my_water_intake_history: WaterIntakeDayGql[];
  my_water_intake_history_error: string | null;
  log_water_intake_status: AsyncStatus;
  log_water_intake_error: string | null;
}

const initialState: HydrationSliceState = {
  my_water_intake_today_status: "idle",
  my_water_intake_today: null,
  my_water_intake_today_error: null,
  my_water_intake_history_status: "idle",
  my_water_intake_history: [],
  my_water_intake_history_error: null,
  log_water_intake_status: "idle",
  log_water_intake_error: null,
};

export const hydrationSlice = createSlice({
  name: "hydration",
  initialState,
  reducers: {
    clearHydrationErrors(state) {
      state.my_water_intake_today_error = null;
      state.my_water_intake_history_error = null;
      state.log_water_intake_error = null;
      if (state.my_water_intake_today_status === "failed") {
        state.my_water_intake_today_status = "idle";
      }
      if (state.my_water_intake_history_status === "failed") {
        state.my_water_intake_history_status = "idle";
      }
      if (state.log_water_intake_status === "failed") {
        state.log_water_intake_status = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onMyWaterIntakeToday.pending, (state) => {
        state.my_water_intake_today_status = "loading";
        state.my_water_intake_today_error = null;
      })
      .addCase(onMyWaterIntakeToday.fulfilled, (state, action) => {
        state.my_water_intake_today_status = "idle";
        state.my_water_intake_today = action.payload;
        state.my_water_intake_today_error = null;
      })
      .addCase(onMyWaterIntakeToday.rejected, (state, action) => {
        state.my_water_intake_today_status = "failed";
        state.my_water_intake_today_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })

      .addCase(onMyWaterIntakeHistory.pending, (state) => {
        if (state.my_water_intake_history.length === 0) {
          state.my_water_intake_history_status = "loading";
        }
        state.my_water_intake_history_error = null;
      })
      .addCase(onMyWaterIntakeHistory.fulfilled, (state, action) => {
        state.my_water_intake_history_status = "idle";
        state.my_water_intake_history = action.payload;
        state.my_water_intake_history_error = null;
      })
      .addCase(onMyWaterIntakeHistory.rejected, (state, action) => {
        state.my_water_intake_history_status = "failed";
        state.my_water_intake_history = [];
        state.my_water_intake_history_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })

      .addCase(onLogWaterIntake.pending, (state) => {
        state.log_water_intake_status = "loading";
        state.log_water_intake_error = null;
      })
      .addCase(onLogWaterIntake.fulfilled, (state, action) => {
        state.log_water_intake_status = "idle";
        state.log_water_intake_error = null;
        state.my_water_intake_today = action.payload;
      })
      .addCase(onLogWaterIntake.rejected, (state, action) => {
        state.log_water_intake_status = "failed";
        state.log_water_intake_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      });
  },
});

export const { clearHydrationErrors } = hydrationSlice.actions;
