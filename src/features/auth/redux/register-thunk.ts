import { RegisterDocument } from "@/generated/graphql";
import { standaloneTranslator as t } from "@/i18n/standalone-translator";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const register = createAppAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { extra, rejectWithValue }) => {
    try {
      const result = await extra.apolloClient.mutate({
        mutation: RegisterDocument,
        variables: {
          input: {
            email: credentials.email.trim(),
            password: credentials.password,
            firstName: credentials.firstName?.trim() || undefined,
            lastName: credentials.lastName?.trim() || undefined,
          },
        },
        fetchPolicy: "network-only",
      });

      if (result.error) {
        return rejectWithValue(extractGraphqlErrorMessage(result.error));
      }

      const payload = result.data?.register;
      if (!payload?.accepted) {
        return rejectWithValue(t("errors.registerNotAccepted"));
      }

      return payload;
    } catch (error: unknown) {
      return rejectWithValue(extractGraphqlErrorMessage(error));
    }
  },
);
