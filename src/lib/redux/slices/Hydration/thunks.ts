import type {
  LogWaterIntakeInput,
  QueryMyWaterIntakeHistoryArgs,
  WaterIntakeDayGql,
} from "@/lib/graphql/graphql";
import {
  requestLogWaterIntake,
  requestMyWaterIntakeHistory,
  requestMyWaterIntakeToday,
} from "@/lib/graphql/Hydration/hydrationRequests";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

function rejectMessage(error: unknown, fallback: string): string {
  const message = extractGraphqlErrorMessage(error);
  if (message) {
    return message;
  }
  return error instanceof Error ? error.message : fallback;
}

export type LogWaterIntakeThunkArgs = {
  input: LogWaterIntakeInput;
  historyLimit: number;
};

/**** HYDRATION ****/

export const onMyWaterIntakeToday = createAppAsyncThunk(
  "hydration/myWaterIntakeToday",
  async (_, { rejectWithValue }) => {
    try {
      return await requestMyWaterIntakeToday();
    } catch (error: unknown) {
      return rejectWithValue(
        rejectMessage(error, "Impossibile caricare l'idratazione di oggi."),
      );
    }
  },
);

export const onMyWaterIntakeHistory = createAppAsyncThunk(
  "hydration/myWaterIntakeHistory",
  async (args: QueryMyWaterIntakeHistoryArgs = {}, { rejectWithValue }) => {
    try {
      return await requestMyWaterIntakeHistory(args);
    } catch (error: unknown) {
      return rejectWithValue(
        rejectMessage(error, "Impossibile caricare lo storico idratazione."),
      );
    }
  },
);

export const onLogWaterIntake = createAppAsyncThunk(
  "hydration/logWaterIntake",
  async (
    { input, historyLimit }: LogWaterIntakeThunkArgs,
    { rejectWithValue },
  ) => {
    try {
      const logged = await requestLogWaterIntake(input, historyLimit);
      if (!logged) {
        return rejectWithValue("Risposta idratazione non valida.");
      }
      return logged;
    } catch (error: unknown) {
      return rejectWithValue(
        rejectMessage(error, "Impossibile registrare l'idratazione."),
      );
    }
  },
);

export type { WaterIntakeDayGql };
