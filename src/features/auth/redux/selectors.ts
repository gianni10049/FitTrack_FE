import type { RootState } from "@/lib/redux/root-reducer";

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.status === "loading";
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
