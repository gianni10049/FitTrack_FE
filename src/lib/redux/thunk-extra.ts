import type { ApolloClient } from "@apollo/client";

export interface ThunkExtra {
  apolloClient: ApolloClient;
}
