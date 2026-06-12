import type { ApolloClient } from "@apollo/client";

let browserClient: ApolloClient | undefined;

/** Registra il client creato in `AppProviders` (browser only). */
export function registerApolloClient(client: ApolloClient): void {
  browserClient = client;
}

export function getApolloClient(): ApolloClient {
  if (!browserClient) {
    throw new Error(
      "Apollo client non inizializzato. Montare AppProviders prima delle chiamate GraphQL.",
    );
  }
  return browserClient;
}

/** Alias usato nei moduli `*Requests.ts` (stile FacileDoc / esempi repo). */
export function makeApolloClient(): ApolloClient {
  return getApolloClient();
}
