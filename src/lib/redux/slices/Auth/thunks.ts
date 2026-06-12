import { standaloneTranslator as t } from "@/i18n/standalone-translator";
import type {
  CompletePasswordResetInput,
  LoginInput,
  RegisterInput,
  RequestPasswordResetInput,
  VerifyPasswordResetOtpInput,
} from "@/lib/graphql/graphql";
import {
  requestCompletePasswordReset,
  requestLogin,
  requestPasswordReset as requestPasswordResetApi,
  requestRegister,
  requestVerifyPasswordResetOtp,
} from "@/lib/graphql/Auth/authRequests";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

function rejectMessage(error: unknown, fallback: string): string {
  const message = extractGraphqlErrorMessage(error);
  if (message) {
    return message;
  }
  return error instanceof Error ? error.message : fallback;
}

/**** AUTH ****/

export const onLogin = createAppAsyncThunk(
  "auth/login",
  async (data: LoginInput, { rejectWithValue }) => {
    try {
      const res = await requestLogin({
        email: data.email.trim(),
        password: data.password,
      });
      if (!res?.accessToken) {
        return rejectWithValue(t("errors.loginInvalidResponse"));
      }
      return res;
    } catch (error: unknown) {
      return rejectWithValue(rejectMessage(error, t("errors.loginFailed")));
    }
  },
);

export const onRegister = createAppAsyncThunk(
  "auth/register",
  async (data: RegisterInput, { rejectWithValue }) => {
    try {
      const res = await requestRegister({
        email: data.email.trim(),
        password: data.password,
        firstName: data.firstName?.trim() || undefined,
        lastName: data.lastName?.trim() || undefined,
      });
      if (!res?.accepted) {
        return rejectWithValue(t("errors.registerNotAccepted"));
      }
      return res;
    } catch (error: unknown) {
      return rejectWithValue(rejectMessage(error, t("errors.registerNotAccepted")));
    }
  },
);

export const onRequestPasswordReset = createAppAsyncThunk(
  "auth/requestPasswordReset",
  async (data: RequestPasswordResetInput, { rejectWithValue }) => {
    try {
      const res = await requestPasswordResetApi({
        email: data.email.trim(),
      });
      if (!res?.accepted) {
        return rejectWithValue(t("errors.passwordResetNotAccepted"));
      }
      return res;
    } catch (error: unknown) {
      return rejectWithValue(
        rejectMessage(error, t("errors.passwordResetNotAccepted")),
      );
    }
  },
);

export const onVerifyPasswordResetOtp = createAppAsyncThunk(
  "auth/verifyPasswordResetOtp",
  async (data: VerifyPasswordResetOtpInput, { rejectWithValue }) => {
    try {
      const res = await requestVerifyPasswordResetOtp({
        email: data.email.trim(),
        otp: data.otp.trim(),
      });
      if (!res?.resetToken) {
        return rejectWithValue(t("errors.otpInvalidResponse"));
      }
      return res;
    } catch (error: unknown) {
      return rejectWithValue(rejectMessage(error, t("errors.otpInvalidResponse")));
    }
  },
);

export const onCompletePasswordReset = createAppAsyncThunk(
  "auth/completePasswordReset",
  async (data: CompletePasswordResetInput, { rejectWithValue }) => {
    try {
      const res = await requestCompletePasswordReset({
        resetToken: data.resetToken,
        newPassword: data.newPassword,
      });
      if (!res?.success) {
        return rejectWithValue(t("errors.passwordUpdateFailed"));
      }
      return res;
    } catch (error: unknown) {
      return rejectWithValue(rejectMessage(error, t("errors.passwordUpdateFailed")));
    }
  },
);
