/**
 * Variabili pubbliche (prefisso `NEXT_PUBLIC_`) per URL GraphQL e branding.
 * Default allineati al backend template: HTTP/WS su porta 4000, path `/graphql`.
 */
export const publicEnv = {
  graphqlHttpUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? "http://localhost:4000/graphql",
  graphqlWsUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ?? "ws://localhost:4000/graphql",
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "App starter",
} as const;

/**
 * `POST` body `{ sub }` → `{ access_token }`. Default: origine dell’URL GraphQL + `/dev/auth/token`.
 * Sovrascrivi se l’API REST non coincide con l’host GraphQL.
 */
export function getDevAuthTokenUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_DEV_AUTH_TOKEN_URL?.trim();
  if (explicit) {
    return explicit;
  }
  try {
    const origin = new URL(publicEnv.graphqlHttpUrl).origin;
    return `${origin}/dev/auth/token`;
  } catch {
    return "http://localhost:4000/dev/auth/token";
  }
}
