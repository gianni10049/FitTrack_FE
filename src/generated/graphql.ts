import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthTokenPayload = {
  __typename?: 'AuthTokenPayload';
  accessToken: Scalars['String']['output'];
  expiresIn: Scalars['Int']['output'];
  tokenType: Scalars['String']['output'];
};

export type CompletePasswordResetInput = {
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogWaterIntakeInput = {
  amountMl: Scalars['Int']['input'];
  recordedAt?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type RegistrationPayload = {
  __typename?: 'RegistrationPayload';
  accepted: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type MeGql = {
  __typename?: 'MeGql';
  permissions: Array<Scalars['String']['output']>;
  sub: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completePasswordReset: PasswordResetCompletePayload;
  logWaterIntake: WaterIntakeDayGql;
  login: AuthTokenPayload;
  register: RegistrationPayload;
  requestPasswordReset: PasswordResetRequestPayload;
  verifyPasswordResetOtp: PasswordResetVerificationPayload;
};


export type MutationCompletePasswordResetArgs = {
  input: CompletePasswordResetInput;
};


export type MutationLogWaterIntakeArgs = {
  input: LogWaterIntakeInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationVerifyPasswordResetOtpArgs = {
  input: VerifyPasswordResetOtpInput;
};

export type PasswordResetCompletePayload = {
  __typename?: 'PasswordResetCompletePayload';
  success: Scalars['Boolean']['output'];
};

export type PasswordResetRequestPayload = {
  __typename?: 'PasswordResetRequestPayload';
  accepted: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type PasswordResetVerificationPayload = {
  __typename?: 'PasswordResetVerificationPayload';
  resetToken: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  havePermission: Scalars['Boolean']['output'];
  me: MeGql;
  myWaterIntakeHistory: Array<WaterIntakeDayGql>;
  myWaterIntakeToday: WaterIntakeDayGql;
  registrationEnabled: Scalars['Boolean']['output'];
  todayWorkoutTemplate?: Maybe<WorkoutTemplateGql>;
};


export type QueryMyWaterIntakeHistoryArgs = {
  fromDay?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  toDay?: InputMaybe<Scalars['String']['input']>;
};

export type WaterIntakeDayGql = {
  __typename?: 'WaterIntakeDayGql';
  createdAt: Scalars['String']['output'];
  day: Scalars['String']['output'];
  entries: Array<WaterIntakeEntryGql>;
  id: Scalars['ID']['output'];
  targetMl: Scalars['Int']['output'];
  totalMl: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type WaterIntakeEntryGql = {
  __typename?: 'WaterIntakeEntryGql';
  amountMl: Scalars['Int']['output'];
  recordedAt: Scalars['String']['output'];
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type WorkoutTemplateExerciseGql = {
  __typename?: 'WorkoutTemplateExerciseGql';
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  restSeconds: Scalars['Int']['output'];
  targetMuscle: Scalars['String']['output'];
  targetReps: Scalars['String']['output'];
  targetSets: Scalars['Int']['output'];
};

export type WorkoutTemplateGql = {
  __typename?: 'WorkoutTemplateGql';
  code: Scalars['String']['output'];
  dayOfWeek: DayOfWeek;
  exercises: Array<WorkoutTemplateExerciseGql>;
  id: Scalars['ID']['output'];
  programName: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};


export type QueryHavePermissionArgs = {
  permissionKey: Scalars['String']['input'];
};

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type VerifyPasswordResetOtpInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthTokenPayload', accessToken: string, tokenType: string, expiresIn: number } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegistrationPayload', accepted: boolean, message?: string | null } };

export type RegistrationEnabledQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationEnabledQuery = { __typename?: 'Query', registrationEnabled: boolean };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: { __typename?: 'PasswordResetRequestPayload', accepted: boolean, message?: string | null } };

export type VerifyPasswordResetOtpMutationVariables = Exact<{
  input: VerifyPasswordResetOtpInput;
}>;


export type VerifyPasswordResetOtpMutation = { __typename?: 'Mutation', verifyPasswordResetOtp: { __typename?: 'PasswordResetVerificationPayload', resetToken: string } };

export type CompletePasswordResetMutationVariables = Exact<{
  input: CompletePasswordResetInput;
}>;


export type CompletePasswordResetMutation = { __typename?: 'Mutation', completePasswordReset: { __typename?: 'PasswordResetCompletePayload', success: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeGql', sub: string, permissions: Array<string> } };

export type HavePermissionQueryVariables = Exact<{
  permissionKey: Scalars['String']['input'];
}>;


export type HavePermissionQuery = { __typename?: 'Query', havePermission: boolean };

export type MyWaterIntakeTodayQueryVariables = Exact<{ [key: string]: never; }>;


export type MyWaterIntakeTodayQuery = { __typename?: 'Query', myWaterIntakeToday: { __typename?: 'WaterIntakeDayGql', id: string, day: string, totalMl: number, targetMl: number, updatedAt: string, entries: Array<{ __typename?: 'WaterIntakeEntryGql', amountMl: number, recordedAt: string }> } };

export type MyWaterIntakeHistoryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  fromDay?: InputMaybe<Scalars['String']['input']>;
  toDay?: InputMaybe<Scalars['String']['input']>;
}>;


export type MyWaterIntakeHistoryQuery = { __typename?: 'Query', myWaterIntakeHistory: Array<{ __typename?: 'WaterIntakeDayGql', id: string, day: string, totalMl: number, targetMl: number, updatedAt: string, entries: Array<{ __typename?: 'WaterIntakeEntryGql', amountMl: number, recordedAt: string }> }> };

export type LogWaterIntakeMutationVariables = Exact<{
  input: LogWaterIntakeInput;
}>;


export type LogWaterIntakeMutation = { __typename?: 'Mutation', logWaterIntake: { __typename?: 'WaterIntakeDayGql', id: string, day: string, totalMl: number, targetMl: number, updatedAt: string, entries: Array<{ __typename?: 'WaterIntakeEntryGql', amountMl: number, recordedAt: string }> } };

export type TodayWorkoutTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type TodayWorkoutTemplateQuery = { __typename?: 'Query', todayWorkoutTemplate?: { __typename?: 'WorkoutTemplateGql', id: string, programName: string, code: string, title: string, dayOfWeek: DayOfWeek, sortOrder: number, exercises: Array<{ __typename?: 'WorkoutTemplateExerciseGql', order: number, name: string, targetMuscle: string, targetSets: number, targetReps: string, restSeconds: number }> } | null };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    tokenType
    expiresIn
  }
}
    ` as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accepted
    message
  }
}
    ` as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RegistrationEnabledDocument = gql`
    query RegistrationEnabled {
  registrationEnabled
}
    ` as unknown as DocumentNode<RegistrationEnabledQuery, RegistrationEnabledQueryVariables>;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
  requestPasswordReset(input: $input) {
    accepted
    message
  }
}
    ` as unknown as DocumentNode<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const VerifyPasswordResetOtpDocument = gql`
    mutation VerifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {
  verifyPasswordResetOtp(input: $input) {
    resetToken
  }
}
    ` as unknown as DocumentNode<VerifyPasswordResetOtpMutation, VerifyPasswordResetOtpMutationVariables>;
export const CompletePasswordResetDocument = gql`
    mutation CompletePasswordReset($input: CompletePasswordResetInput!) {
  completePasswordReset(input: $input) {
    success
  }
}
    ` as unknown as DocumentNode<CompletePasswordResetMutation, CompletePasswordResetMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    sub
    permissions
  }
}
    ` as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const HavePermissionDocument = gql`
    query HavePermission($permissionKey: String!) {
  havePermission(permissionKey: $permissionKey)
}
    ` as unknown as DocumentNode<HavePermissionQuery, HavePermissionQueryVariables>;
export const MyWaterIntakeHistoryDocument = gql`
    query MyWaterIntakeHistory($limit: Int, $fromDay: String, $toDay: String) {
  myWaterIntakeHistory(limit: $limit, fromDay: $fromDay, toDay: $toDay) {
    id
    day
    totalMl
    targetMl
    entries {
      amountMl
      recordedAt
    }
    updatedAt
  }
}
    ` as unknown as DocumentNode<MyWaterIntakeHistoryQuery, MyWaterIntakeHistoryQueryVariables>;
export const MyWaterIntakeTodayDocument = gql`
    query MyWaterIntakeToday {
  myWaterIntakeToday {
    id
    day
    totalMl
    targetMl
    entries {
      amountMl
      recordedAt
    }
    updatedAt
  }
}
    ` as unknown as DocumentNode<MyWaterIntakeTodayQuery, MyWaterIntakeTodayQueryVariables>;
export const LogWaterIntakeDocument = gql`
    mutation LogWaterIntake($input: LogWaterIntakeInput!) {
  logWaterIntake(input: $input) {
    id
    day
    totalMl
    targetMl
    entries {
      amountMl
      recordedAt
    }
    updatedAt
  }
}
    ` as unknown as DocumentNode<LogWaterIntakeMutation, LogWaterIntakeMutationVariables>;
export const TodayWorkoutTemplateDocument = gql`
    query TodayWorkoutTemplate {
  todayWorkoutTemplate {
    id
    programName
    code
    title
    dayOfWeek
    sortOrder
    exercises {
      order
      name
      targetMuscle
      targetSets
      targetReps
      restSeconds
    }
  }
}
    ` as unknown as DocumentNode<TodayWorkoutTemplateQuery, TodayWorkoutTemplateQueryVariables>;
