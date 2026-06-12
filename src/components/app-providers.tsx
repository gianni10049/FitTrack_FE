"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useEffect, useMemo, type ReactNode } from "react";
import { Provider } from "react-redux";
import { ModalHost } from "@/components/modal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createBrowserApolloClient } from "@/lib/apollo-client";
import { registerApolloClient } from "@/lib/graphql/make-apollo-client";
import { registerAppStore } from "@/lib/redux/app-store-ref";
import { makeStore } from "@/lib/redux/store";

export function AppProviders({ children }: { children: ReactNode }) {
  const apolloClient = useMemo(() => createBrowserApolloClient(), []);
  const store = useMemo(() => makeStore(), []);

  useEffect(() => {
    registerApolloClient(apolloClient);
    registerAppStore(store);
    return () => registerAppStore(undefined);
  }, [apolloClient, store]);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <TooltipProvider>
          {children}
          <ModalHost />
        </TooltipProvider>
      </Provider>
    </ApolloProvider>
  );
}
