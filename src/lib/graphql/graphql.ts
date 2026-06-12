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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
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

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type LogWaterIntakeInput = {
  amountMl: Scalars['Int']['input'];
  recordedAt?: InputMaybe<Scalars['String']['input']>;
};

export type LogWorkoutSetInput = {
  exerciseOrder: Scalars['Int']['input'];
  reps?: InputMaybe<Scalars['String']['input']>;
  sessionId: Scalars['ID']['input'];
  setNumber: Scalars['Int']['input'];
  setType: WorkoutSetType;
  weightKg?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MeGql = {
  __typename?: 'MeGql';
  permissions: Array<Scalars['String']['output']>;
  sub: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelWorkoutSession: WorkoutSessionGql;
  /** Imposta la nuova password usando il token ottenuto dopo OTP. */
  completePasswordReset: PasswordResetCompletePayload;
  completeWorkoutSession: WorkoutSessionGql;
  logWaterIntake: WaterIntakeDayGql;
  logWorkoutSet: WorkoutSessionGql;
  /** Autenticazione con email e password. Richiede account approvato da un admin. Restituisce JWT HS256. */
  login: AuthTokenPayload;
  /** Registrazione self-service: crea account in attesa di approvazione admin (nessun JWT). */
  register: RegistrationPayload;
  /** Richiesta recupero password: invio OTP per email se l’utente esiste (risposta uniforme). */
  requestPasswordReset: PasswordResetRequestPayload;
  setWaterIntakeTarget: WaterIntakeDayGql;
  startWorkoutSession: WorkoutSessionGql;
  /** Verifica OTP; restituisce JWT di reset password (breve durata). */
  verifyPasswordResetOtp: PasswordResetVerificationPayload;
};


export type MutationCancelWorkoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCompletePasswordResetArgs = {
  input: CompletePasswordResetInput;
};


export type MutationCompleteWorkoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLogWaterIntakeArgs = {
  input: LogWaterIntakeInput;
};


export type MutationLogWorkoutSetArgs = {
  input: LogWorkoutSetInput;
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


export type MutationSetWaterIntakeTargetArgs = {
  input: SetWaterIntakeTargetInput;
};


export type MutationStartWorkoutSessionArgs = {
  input: StartWorkoutSessionInput;
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
  activeWorkoutSession?: Maybe<WorkoutSessionGql>;
  havePermission: Scalars['Boolean']['output'];
  me: MeGql;
  myWaterIntakeDay: WaterIntakeDayGql;
  myWaterIntakeHistory: Array<WaterIntakeDayGql>;
  myWaterIntakeToday: WaterIntakeDayGql;
  /** Indica se la registrazione pubblica è abilitata (AUTH_REGISTRATION_ENABLED). */
  registrationEnabled: Scalars['Boolean']['output'];
  todayWorkoutTemplate?: Maybe<WorkoutTemplateGql>;
  workoutSession: WorkoutSessionGql;
  workoutSessions: Array<WorkoutSessionGql>;
  workoutTemplate?: Maybe<WorkoutTemplateGql>;
  workoutTemplates: Array<WorkoutTemplateGql>;
};


export type QueryHavePermissionArgs = {
  permissionKey: Scalars['String']['input'];
};


export type QueryMyWaterIntakeDayArgs = {
  day: Scalars['String']['input'];
};


export type QueryMyWaterIntakeHistoryArgs = {
  fromDay?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  toDay?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWorkoutSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkoutSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWorkoutTemplateArgs = {
  id: Scalars['ID']['input'];
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

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type SetWaterIntakeTargetInput = {
  day?: InputMaybe<Scalars['String']['input']>;
  targetMl: Scalars['Int']['input'];
};

export type StartWorkoutSessionInput = {
  templateId: Scalars['ID']['input'];
};

export type VerifyPasswordResetOtpInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type WaterIntakeDayGql = {
  __typename?: 'WaterIntakeDayGql';
  createdAt: Scalars['DateTime']['output'];
  day: Scalars['String']['output'];
  entries: Array<WaterIntakeEntryGql>;
  id: Scalars['ID']['output'];
  targetMl: Scalars['Int']['output'];
  totalMl: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type WaterIntakeEntryGql = {
  __typename?: 'WaterIntakeEntryGql';
  amountMl: Scalars['Int']['output'];
  recordedAt: Scalars['DateTime']['output'];
};

export type WorkoutSessionExerciseGql = {
  __typename?: 'WorkoutSessionExerciseGql';
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  restSeconds: Scalars['Int']['output'];
  setLogs: Array<WorkoutSetLogGql>;
  targetMuscle: Scalars['String']['output'];
  targetReps: Scalars['String']['output'];
  targetSets: Scalars['Int']['output'];
  techniqueNotes: Scalars['String']['output'];
  warmupNotes: Scalars['String']['output'];
};

export type WorkoutSessionGql = {
  __typename?: 'WorkoutSessionGql';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  exercises: Array<WorkoutSessionExerciseGql>;
  id: Scalars['ID']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: WorkoutSessionStatus;
  templateCode: Scalars['String']['output'];
  templateId: Scalars['ID']['output'];
  templateTitle: Scalars['String']['output'];
};

export enum WorkoutSessionStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export type WorkoutSetLogGql = {
  __typename?: 'WorkoutSetLogGql';
  loggedAt?: Maybe<Scalars['DateTime']['output']>;
  reps?: Maybe<Scalars['String']['output']>;
  setNumber: Scalars['Int']['output'];
  setType: WorkoutSetType;
  weightKg?: Maybe<Scalars['Float']['output']>;
};

export enum WorkoutSetType {
  Warmup = 'WARMUP',
  Working = 'WORKING'
}

export type WorkoutTemplateExerciseGql = {
  __typename?: 'WorkoutTemplateExerciseGql';
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  personalNotes?: Maybe<Scalars['String']['output']>;
  restSeconds: Scalars['Int']['output'];
  targetMuscle: Scalars['String']['output'];
  targetReps: Scalars['String']['output'];
  targetSets: Scalars['Int']['output'];
  techniqueNotes: Scalars['String']['output'];
  warmupNotes: Scalars['String']['output'];
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
