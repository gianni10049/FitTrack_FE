import { LoginDocument } from "@/generated/graphql";
import { standaloneTranslator as t } from "@/i18n/standalone-translator";
import { setGraphqlJwtInStorage } from "@/lib/auth/graphql-jwt-storage";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { createAppAsyncThunk } from "@/lib/redux/create-app-async-thunk";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAppAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { extra, rejectWithValue }) => {
    try {
      const result = await extra.apolloClient.mutate({
        mutation: LoginDocument,
        variables: {
          input: {
            email: credentials.email.trim(),
            password: credentials.password,
          },
        },
        fetchPolicy: "network-only",
      });

      if (result.error) {
        return rejectWithValue(extractGraphqlErrorMessage(result.error));
      }

      const payload = result.data?.login;
      const token = payload?.accessToken;
      if (!payload || !token) {
        return rejectWithValue(t("errors.loginInvalidResponse"));
      }

      setGraphqlJwtInStorage(token);
      return payload;
    } catch (error: unknown) {
      return rejectWithValue(extractGraphqlErrorMessage(error));
    }
  },
);
