import type { WorkoutTemplateGql } from "@/lib/graphql/graphql";
import { requestTodayWorkoutTemplate } from "@/lib/graphql/Workout/workoutRequests";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

function rejectMessage(error: unknown, fallback: string): string {
  const message = extractGraphqlErrorMessage(error);
  if (message) {
    return message;
  }
  return error instanceof Error ? error.message : fallback;
}

/**** WORKOUT ****/

export const onTodayWorkoutTemplate = createAppAsyncThunk(
  "workout/todayWorkoutTemplate",
  async (_, { rejectWithValue }) => {
    try {
      return await requestTodayWorkoutTemplate();
    } catch (error: unknown) {
      return rejectWithValue(
        rejectMessage(error, "Impossibile caricare il workout di oggi."),
      );
    }
  },
);

export type { WorkoutTemplateGql };
