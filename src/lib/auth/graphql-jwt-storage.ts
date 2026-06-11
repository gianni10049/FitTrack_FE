/** Chiave `localStorage` per JWT usato su HTTP (Authorization) e WS (`connectionParams`). */
export const BUCKET_GRAPHQL_JWT_KEY = "bucket_graphql_jwt";

export function getGraphqlJwtFromStorage(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return localStorage.getItem(BUCKET_GRAPHQL_JWT_KEY);
  } catch {
    return null;
  }
}

export function setGraphqlJwtInStorage(token: string): void {
  localStorage.setItem(BUCKET_GRAPHQL_JWT_KEY, token);
}

export function clearGraphqlJwtFromStorage(): void {
  localStorage.removeItem(BUCKET_GRAPHQL_JWT_KEY);
}
