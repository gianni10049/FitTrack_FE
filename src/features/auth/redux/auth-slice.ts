import { createSlice } from "@reduxjs/toolkit";
import { standaloneTranslator as t } from "@/i18n/standalone-translator";
import { clearGraphqlJwtFromStorage } from "@/lib/auth/graphql-jwt-storage";
import { login } from "./thunks";

type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

interface AuthState {
  status: AuthStatus;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  status: "idle",
  error: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearGraphqlJwtFromStorage();
      state.status = "idle";
      state.error = null;
      state.isAuthenticated = false;
    },
    clearAuthError(state) {
      state.error = null;
      if (state.status === "failed") {
        state.status = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? t("errors.loginFailed");
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
