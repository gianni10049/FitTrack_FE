import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { modalSlice } from "./slices/modal";

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [modalSlice.actions.open.type],
          ignoredPaths: ["modal.modals"],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
