import type { RootState } from "@/lib/redux/root-reducer";

export const selectWorkout = (state: RootState) => state.workout;

export const selectTodayWorkoutTemplate = (state: RootState) =>
  state.workout.today_workout_template;

export const selectTodayWorkoutTemplateStatus = (state: RootState) =>
  state.workout.today_workout_template_status;

export const selectTodayWorkoutTemplateError = (state: RootState) =>
  state.workout.today_workout_template_error;

export const selectTodayWorkoutTemplateLoading = (state: RootState) =>
  state.workout.today_workout_template_status === "loading";

export const selectIsWorkoutRestDay = (state: RootState) => {
  const { today_workout_template_status, today_workout_template, today_workout_template_error } =
    state.workout;
  return (
    today_workout_template_status === "idle" &&
    today_workout_template === null &&
    today_workout_template_error === null
  );
};
