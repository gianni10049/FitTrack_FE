import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getGraphqlJwtFromStorage } from "@/lib/auth/graphql-jwt-storage";
import { publicEnv } from "@/lib/config/public-env";

const errorLink = new ErrorLink(({ error }) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  if (process.env.NEXT_PUBLIC_GRAPHQL_DEBUG_ERRORS === "0") {
    return;
  }
  const errs = Array.isArray(error) ? error : [error];
  for (const e of errs) {
    console.error("[GraphQL]", e);
  }
});

const authLink = new SetContextLink((prevContext) => {
  const token = getGraphqlJwtFromStorage();
  if (!token) {
    return {};
  }
  return {
    headers: {
      ...prevContext.headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export function createBrowserApolloClient() {
  const httpLink = new HttpLink({
    uri: publicEnv.graphqlHttpUrl,
    credentials: "include",
    // Avoid dropping variables that HttpLink considers "unused" vs. the sent AST
    // (can trigger server errors like missing $permissionKey for havePermission).
    includeUnusedVariables: true,
  });

  const wsLink =
    typeof window === "undefined"
      ? null
      : new GraphQLWsLink(
          createClient({
            url: publicEnv.graphqlWsUrl,
            connectionParams: () => {
              const token = getGraphqlJwtFromStorage();
              return token
                ? { authorization: `Bearer ${token}` }
                : {};
            },
          }),
        );

  const splitLink =
    wsLink === null
      ? httpLink
      : split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === "OperationDefinition" &&
              def.operation === "subscription"
            );
          },
          wsLink,
          httpLink,
        );

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, splitLink]),
    cache: new InMemoryCache(),
  });
}
