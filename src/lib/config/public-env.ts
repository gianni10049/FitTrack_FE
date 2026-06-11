/**
 * Variabili pubbliche (prefisso `NEXT_PUBLIC_`) per URL GraphQL e branding.
 * Default allineati al backend: HTTP/WS su porta 4000, path `/graphql`.
 */
export const publicEnv = {
  graphqlHttpUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? "http://localhost:4000/graphql",
  graphqlWsUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ?? "ws://localhost:4000/graphql",
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "FitTrack",
} as const;
