import { configureStore } from "@reduxjs/toolkit";
import type { ApolloClient } from "@apollo/client";
import { rootReducer } from "./root-reducer";
import { modalSlice } from "./slices/modal";
import type { ThunkExtra } from "./thunk-extra";

export function makeStore(apolloClient: ApolloClient) {
  const extra: ThunkExtra = { apolloClient };

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: extra },
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
