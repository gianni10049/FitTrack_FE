import {
  CompletePasswordResetDocument,
  RequestPasswordResetDocument,
  VerifyPasswordResetOtpDocument,
} from "@/generated/graphql";
import { standaloneTranslator as t } from "@/i18n/standalone-translator";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

export const requestPasswordReset = createAppAsyncThunk(
  "auth/requestPasswordReset",
  async (email: string, { extra, rejectWithValue }) => {
    try {
      const result = await extra.apolloClient.mutate({
        mutation: RequestPasswordResetDocument,
        variables: {
          input: { email: email.trim() },
        },
        fetchPolicy: "network-only",
      });

      if (result.error) {
        return rejectWithValue(extractGraphqlErrorMessage(result.error));
      }

      const payload = result.data?.requestPasswordReset;
      if (!payload?.accepted) {
        return rejectWithValue(t("errors.passwordResetNotAccepted"));
      }

      return payload;
    } catch (error: unknown) {
      return rejectWithValue(extractGraphqlErrorMessage(error));
    }
  },
);

export const verifyPasswordResetOtp = createAppAsyncThunk(
  "auth/verifyPasswordResetOtp",
  async (
    input: { email: string; otp: string },
    { extra, rejectWithValue },
  ) => {
    try {
      const result = await extra.apolloClient.mutate({
        mutation: VerifyPasswordResetOtpDocument,
        variables: {
          input: {
            email: input.email.trim(),
            otp: input.otp.trim(),
          },
        },
        fetchPolicy: "network-only",
      });

      if (result.error) {
        return rejectWithValue(extractGraphqlErrorMessage(result.error));
      }

      const resetToken = result.data?.verifyPasswordResetOtp?.resetToken;
      if (!resetToken) {
        return rejectWithValue(t("errors.otpInvalidResponse"));
      }

      return { resetToken };
    } catch (error: unknown) {
      return rejectWithValue(extractGraphqlErrorMessage(error));
    }
  },
);

export const completePasswordReset = createAppAsyncThunk(
  "auth/completePasswordReset",
  async (
    input: { resetToken: string; newPassword: string },
    { extra, rejectWithValue },
  ) => {
    try {
      const result = await extra.apolloClient.mutate({
        mutation: CompletePasswordResetDocument,
        variables: {
          input: {
            resetToken: input.resetToken,
            newPassword: input.newPassword,
          },
        },
        fetchPolicy: "network-only",
      });

      if (result.error) {
        return rejectWithValue(extractGraphqlErrorMessage(result.error));
      }

      if (!result.data?.completePasswordReset?.success) {
        return rejectWithValue(t("errors.passwordUpdateFailed"));
      }

      return { success: true as const };
    } catch (error: unknown) {
      return rejectWithValue(extractGraphqlErrorMessage(error));
    }
  },
);
