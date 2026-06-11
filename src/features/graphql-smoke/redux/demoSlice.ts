import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { bumpCounter, fetchHello } from "./thunks";

export type AsyncStatus = "idle" | "loading" | "failed";

export interface DemoState {
  hello: {
    status: AsyncStatus;
    value: string | null;
    error: string | null;
  };
  bump: {
    status: AsyncStatus;
    lastResult: number | null;
    error: string | null;
  };
  subscriptionCounter: number | null;
}

const initialState: DemoState = {
  hello: { status: "idle", value: null, error: null },
  bump: { status: "idle", lastResult: null, error: null },
  subscriptionCounter: null,
};

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    subscriptionCounterReceived: (state, action: PayloadAction<number>) => {
      state.subscriptionCounter = action.payload;
    },
    resetDemo: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHello.pending, (state) => {
        state.hello.status = "loading";
        state.hello.error = null;
      })
      .addCase(fetchHello.fulfilled, (state, action) => {
        state.hello.status = "idle";
        state.hello.value = action.payload;
      })
      .addCase(fetchHello.rejected, (state, action) => {
        state.hello.status = "failed";
        state.hello.error = action.payload ?? action.error.message ?? "Errore";
      })
      .addCase(bumpCounter.pending, (state) => {
        state.bump.status = "loading";
        state.bump.error = null;
      })
      .addCase(bumpCounter.fulfilled, (state, action) => {
        state.bump.status = "idle";
        state.bump.lastResult =
          typeof action.payload === "number" ? action.payload : null;
      })
      .addCase(bumpCounter.rejected, (state, action) => {
        state.bump.status = "failed";
        state.bump.error = action.payload ?? action.error.message ?? "Errore";
      });
  },
});

export const { subscriptionCounterReceived, resetDemo } = demoSlice.actions;
export const demoReducer = demoSlice.reducer;
