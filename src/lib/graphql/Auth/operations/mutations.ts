import { gql } from "@apollo/client";

export const Login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      tokenType
      expiresIn
    }
  }
`;

export const Register = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accepted
      message
    }
  }
`;

export const RequestPasswordReset = gql`
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      accepted
      message
    }
  }
`;

export const VerifyPasswordResetOtp = gql`
  mutation VerifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {
    verifyPasswordResetOtp(input: $input) {
      resetToken
    }
  }
`;

export const CompletePasswordReset = gql`
  mutation CompletePasswordReset($input: CompletePasswordResetInput!) {
    completePasswordReset(input: $input) {
      success
    }
  }
`;
