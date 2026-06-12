import type { RootState } from "@/lib/redux/root-reducer";

export const selectAuth = (state: RootState) => state.auth;

export const selectLoginStatus = (state: RootState) => state.auth.login_status;

export const selectLoginError = (state: RootState) => state.auth.login_error;

export const selectLoginResponse = (state: RootState) => state.auth.login_response;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.is_authenticated;

export const selectIsAuthLoading = (state: RootState) =>
  state.auth.is_auth_loading;

export const selectRegisterStatus = (state: RootState) =>
  state.auth.register_status;

export const selectRegisterError = (state: RootState) =>
  state.auth.register_error;

export const selectRegisterResponse = (state: RootState) =>
  state.auth.register_response;

export const selectRegisterLoading = (state: RootState) =>
  state.auth.register_status === "loading";

export const selectRequestPasswordResetStatus = (state: RootState) =>
  state.auth.request_password_reset_status;

export const selectRequestPasswordResetError = (state: RootState) =>
  state.auth.request_password_reset_error;

export const selectRequestPasswordResetResponse = (state: RootState) =>
  state.auth.request_password_reset_response;

export const selectRequestPasswordResetLoading = (state: RootState) =>
  state.auth.request_password_reset_status === "loading";

export const selectVerifyPasswordResetOtpStatus = (state: RootState) =>
  state.auth.verify_password_reset_otp_status;

export const selectVerifyPasswordResetOtpError = (state: RootState) =>
  state.auth.verify_password_reset_otp_error;

export const selectVerifyPasswordResetOtpResponse = (state: RootState) =>
  state.auth.verify_password_reset_otp_response;

export const selectVerifyPasswordResetOtpLoading = (state: RootState) =>
  state.auth.verify_password_reset_otp_status === "loading";

export const selectCompletePasswordResetStatus = (state: RootState) =>
  state.auth.complete_password_reset_status;

export const selectCompletePasswordResetError = (state: RootState) =>
  state.auth.complete_password_reset_error;

export const selectCompletePasswordResetResponse = (state: RootState) =>
  state.auth.complete_password_reset_response;

export const selectCompletePasswordResetLoading = (state: RootState) =>
  state.auth.complete_password_reset_status === "loading";

export const selectIsPasswordResetComplete = (state: RootState) =>
  state.auth.complete_password_reset_response?.success === true;

/** @deprecated Usare selectLoginStatus */
export const selectAuthStatus = selectLoginStatus;

/** @deprecated Usare selectLoginError */
export const selectAuthError = selectLoginError;
