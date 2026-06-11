import {
  BumpCounterDocument,
  HelloDocument,
  type BumpCounterMutation,
  type HelloQuery,
} from "@/features/graphql-smoke/graphql/operations";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

export const fetchHello = createAppAsyncThunk(
  "demo/fetchHello",
  async (_, { extra, rejectWithValue }) => {
    try {
      const result = await extra.apolloClient.query<HelloQuery>({
        query: HelloDocument,
        fetchPolicy: "network-only",
      });
      if (result.error) {
        return rejectWithValue(result.error.message);
      }
      return result.data?.hello ?? "";
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Errore query hello";
      return rejectWithValue(msg);
    }
  },
);

export const bumpCounter = createAppAsyncThunk(
  "demo/bumpCounter",
  async (_, { extra, rejectWithValue }) => {
    try {
      const result = await extra.apolloClient.mutate<BumpCounterMutation>({
        mutation: BumpCounterDocument,
      });
      if (result.error) {
        return rejectWithValue(result.error.message);
      }
      return result.data?.bumpCounter ?? null;
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Errore mutation bumpCounter";
      return rejectWithValue(msg);
    }
  },
);
