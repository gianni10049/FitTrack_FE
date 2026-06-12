import { createSlice } from "@reduxjs/toolkit";
import type {
  AuthTokenPayload,
  PasswordResetCompletePayload,
  PasswordResetRequestPayload,
  PasswordResetVerificationPayload,
  RegistrationPayload,
} from "@/lib/graphql/graphql";
import {
  clearGraphqlJwtFromStorage,
  setGraphqlJwtInStorage,
} from "@/lib/auth/graphql-jwt-storage";
import {
  onCompletePasswordReset,
  onLogin,
  onRegister,
  onRequestPasswordReset,
  onVerifyPasswordResetOtp,
} from "./thunks";

type AsyncStatus = "idle" | "loading" | "failed";

export interface AuthSliceState {
  login_status: AsyncStatus;
  login_error: string | null;
  login_response: AuthTokenPayload | null;
  is_authenticated: boolean;
  is_auth_loading: boolean;
  register_status: AsyncStatus;
  register_error: string | null;
  register_response: RegistrationPayload | null;
  request_password_reset_status: AsyncStatus;
  request_password_reset_error: string | null;
  request_password_reset_response: PasswordResetRequestPayload | null;
  verify_password_reset_otp_status: AsyncStatus;
  verify_password_reset_otp_error: string | null;
  verify_password_reset_otp_response: PasswordResetVerificationPayload | null;
  complete_password_reset_status: AsyncStatus;
  complete_password_reset_error: string | null;
  complete_password_reset_response: PasswordResetCompletePayload | null;
}

const initialState: AuthSliceState = {
  login_status: "idle",
  login_error: null,
  login_response: null,
  is_authenticated: false,
  is_auth_loading: false,
  register_status: "idle",
  register_error: null,
  register_response: null,
  request_password_reset_status: "idle",
  request_password_reset_error: null,
  request_password_reset_response: null,
  verify_password_reset_otp_status: "idle",
  verify_password_reset_otp_error: null,
  verify_password_reset_otp_response: null,
  complete_password_reset_status: "idle",
  complete_password_reset_error: null,
  complete_password_reset_response: null,
};

function clearAsyncField(
  state: AuthSliceState,
  statusKey: keyof AuthSliceState,
  errorKey: keyof AuthSliceState,
) {
  const status = state[statusKey];
  if (status === "failed") {
    (state[statusKey] as AsyncStatus) = "idle";
  }
  (state[errorKey] as string | null) = null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearGraphqlJwtFromStorage();
      state.login_status = "idle";
      state.login_error = null;
      state.login_response = null;
      state.is_authenticated = false;
      state.is_auth_loading = false;
    },
    clearLoginError(state) {
      state.login_error = null;
      if (state.login_status === "failed") {
        state.login_status = "idle";
      }
    },
    clearRegisterError(state) {
      state.register_response = null;
      clearAsyncField(state, "register_status", "register_error");
    },
    clearRequestPasswordResetError(state) {
      state.request_password_reset_response = null;
      clearAsyncField(
        state,
        "request_password_reset_status",
        "request_password_reset_error",
      );
    },
    clearVerifyPasswordResetOtpError(state) {
      state.verify_password_reset_otp_response = null;
      clearAsyncField(
        state,
        "verify_password_reset_otp_status",
        "verify_password_reset_otp_error",
      );
    },
    clearCompletePasswordResetError(state) {
      state.complete_password_reset_response = null;
      clearAsyncField(
        state,
        "complete_password_reset_status",
        "complete_password_reset_error",
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.pending, (state) => {
        state.login_status = "loading";
        state.login_error = null;
        state.is_auth_loading = true;
      })
      .addCase(onLogin.fulfilled, (state, action) => {
        state.login_status = "idle";
        state.login_error = null;
        state.login_response = action.payload;
        state.is_authenticated = true;
        state.is_auth_loading = false;
        setGraphqlJwtInStorage(action.payload.accessToken);
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.login_status = "failed";
        state.is_auth_loading = false;
        state.is_authenticated = false;
        state.login_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })

      .addCase(onRegister.pending, (state) => {
        state.register_status = "loading";
        state.register_error = null;
        state.register_response = null;
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.register_status = "idle";
        state.register_error = null;
        state.register_response = action.payload;
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.register_status = "failed";
        state.register_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })

      .addCase(onRequestPasswordReset.pending, (state) => {
        state.request_password_reset_status = "loading";
        state.request_password_reset_error = null;
      })
      .addCase(onRequestPasswordReset.fulfilled, (state, action) => {
        state.request_password_reset_status = "idle";
        state.request_password_reset_error = null;
        state.request_password_reset_response = action.payload;
      })
      .addCase(onRequestPasswordReset.rejected, (state, action) => {
        state.request_password_reset_status = "failed";
        state.request_password_reset_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })

      .addCase(onVerifyPasswordResetOtp.pending, (state) => {
        state.verify_password_reset_otp_status = "loading";
        state.verify_password_reset_otp_error = null;
      })
      .addCase(onVerifyPasswordResetOtp.fulfilled, (state, action) => {
        state.verify_password_reset_otp_status = "idle";
        state.verify_password_reset_otp_error = null;
        state.verify_password_reset_otp_response = action.payload;
      })
      .addCase(onVerifyPasswordResetOtp.rejected, (state, action) => {
        state.verify_password_reset_otp_status = "failed";
        state.verify_password_reset_otp_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })

      .addCase(onCompletePasswordReset.pending, (state) => {
        state.complete_password_reset_status = "loading";
        state.complete_password_reset_error = null;
        state.complete_password_reset_response = null;
      })
      .addCase(onCompletePasswordReset.fulfilled, (state, action) => {
        state.complete_password_reset_status = "idle";
        state.complete_password_reset_error = null;
        state.complete_password_reset_response = action.payload;
      })
      .addCase(onCompletePasswordReset.rejected, (state, action) => {
        state.complete_password_reset_status = "failed";
        state.complete_password_reset_error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      });
  },
});

export const {
  logout,
  clearLoginError,
  clearRegisterError,
  clearRequestPasswordResetError,
  clearVerifyPasswordResetOtpError,
  clearCompletePasswordResetError,
} = authSlice.actions;
