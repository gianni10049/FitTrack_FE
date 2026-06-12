import type {
  AuthTokenPayload,
  CompletePasswordResetInput,
  LoginInput,
  MutationCompletePasswordResetArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationRequestPasswordResetArgs,
  MutationVerifyPasswordResetOtpArgs,
  PasswordResetCompletePayload,
  PasswordResetRequestPayload,
  PasswordResetVerificationPayload,
  RegisterInput,
  RegistrationPayload,
  RequestPasswordResetInput,
  VerifyPasswordResetOtpInput,
} from "@/lib/graphql/graphql";
import { makeApolloClient } from "@/lib/graphql/make-apollo-client";
import {
  CompletePasswordReset,
  Login,
  Register,
  RequestPasswordReset,
  VerifyPasswordResetOtp,
} from "./operations/mutations";

/** Chiamate GraphQL auth senza hook React (Redux thunk e contesti non-React). */
export async function requestLogin(
  input: LoginInput,
): Promise<AuthTokenPayload | null> {
  const result = await makeApolloClient().mutate<
    { login: AuthTokenPayload },
    MutationLoginArgs
  >({
    mutation: Login,
    variables: { input },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  if (result.error) {
    throw result.error;
  }
  return result.data?.login ?? null;
}

export async function requestRegister(
  input: RegisterInput,
): Promise<RegistrationPayload | null> {
  const result = await makeApolloClient().mutate<
    { register: RegistrationPayload },
    MutationRegisterArgs
  >({
    mutation: Register,
    variables: { input },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  if (result.error) {
    throw result.error;
  }
  return result.data?.register ?? null;
}

export async function requestPasswordReset(
  input: RequestPasswordResetInput,
): Promise<PasswordResetRequestPayload | null> {
  const result = await makeApolloClient().mutate<
    { requestPasswordReset: PasswordResetRequestPayload },
    MutationRequestPasswordResetArgs
  >({
    mutation: RequestPasswordReset,
    variables: { input },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  if (result.error) {
    throw result.error;
  }
  return result.data?.requestPasswordReset ?? null;
}

export async function requestVerifyPasswordResetOtp(
  input: VerifyPasswordResetOtpInput,
): Promise<PasswordResetVerificationPayload | null> {
  const result = await makeApolloClient().mutate<
    { verifyPasswordResetOtp: PasswordResetVerificationPayload },
    MutationVerifyPasswordResetOtpArgs
  >({
    mutation: VerifyPasswordResetOtp,
    variables: { input },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  if (result.error) {
    throw result.error;
  }
  return result.data?.verifyPasswordResetOtp ?? null;
}

export async function requestCompletePasswordReset(
  input: CompletePasswordResetInput,
): Promise<PasswordResetCompletePayload | null> {
  const result = await makeApolloClient().mutate<
    { completePasswordReset: PasswordResetCompletePayload },
    MutationCompletePasswordResetArgs
  >({
    mutation: CompletePasswordReset,
    variables: { input },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  if (result.error) {
    throw result.error;
  }
  return result.data?.completePasswordReset ?? null;
}
