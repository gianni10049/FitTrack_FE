import type { RootState } from "@/lib/redux/root-reducer";

export const selectHydration = (state: RootState) => state.hydration;

export const selectMyWaterIntakeToday = (state: RootState) =>
  state.hydration.my_water_intake_today;

export const selectMyWaterIntakeTodayStatus = (state: RootState) =>
  state.hydration.my_water_intake_today_status;

export const selectMyWaterIntakeTodayError = (state: RootState) =>
  state.hydration.my_water_intake_today_error;

export const selectMyWaterIntakeTodayLoading = (state: RootState) =>
  state.hydration.my_water_intake_today_status === "loading";

export const selectMyWaterIntakeHistory = (state: RootState) =>
  state.hydration.my_water_intake_history;

export const selectMyWaterIntakeHistoryStatus = (state: RootState) =>
  state.hydration.my_water_intake_history_status;

export const selectMyWaterIntakeHistoryError = (state: RootState) =>
  state.hydration.my_water_intake_history_error;

export const selectMyWaterIntakeHistoryLoading = (state: RootState) =>
  state.hydration.my_water_intake_history_status === "loading";

export const selectLogWaterIntakeStatus = (state: RootState) =>
  state.hydration.log_water_intake_status;

export const selectLogWaterIntakeError = (state: RootState) =>
  state.hydration.log_water_intake_error;

export const selectIsLoggingWaterIntake = (state: RootState) =>
  state.hydration.log_water_intake_status === "loading";

export const selectHydrationTotalMl = (state: RootState) =>
  state.hydration.my_water_intake_today?.totalMl ?? 0;

export const selectHydrationTargetMl = (state: RootState) =>
  state.hydration.my_water_intake_today?.targetMl ?? 3500;
