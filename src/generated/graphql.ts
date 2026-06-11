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

export type Mutation = {
  __typename?: 'Mutation';
  bumpCounter: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  havePermission: Scalars['Boolean']['output'];
  hello: Scalars['String']['output'];
  me: Scalars['String']['output'];
};


export type QueryHavePermissionArgs = {
  permissionKey: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  counterUpdated: Scalars['Int']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: string };

export type HavePermissionQueryVariables = Exact<{
  permissionKey: Scalars['String']['input'];
}>;


export type HavePermissionQuery = { __typename?: 'Query', havePermission: boolean };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type BumpCounterMutationVariables = Exact<{ [key: string]: never; }>;


export type BumpCounterMutation = { __typename?: 'Mutation', bumpCounter: number };

export type CounterUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CounterUpdatedSubscription = { __typename?: 'Subscription', counterUpdated: number };


export const MeDocument = gql`
    query Me {
  me
}
    ` as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const HavePermissionDocument = gql`
    query HavePermission($permissionKey: String!) {
  havePermission(permissionKey: $permissionKey)
}
    ` as unknown as DocumentNode<HavePermissionQuery, HavePermissionQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    ` as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
export const BumpCounterDocument = gql`
    mutation BumpCounter {
  bumpCounter
}
    ` as unknown as DocumentNode<BumpCounterMutation, BumpCounterMutationVariables>;
export const CounterUpdatedDocument = gql`
    subscription CounterUpdated {
  counterUpdated
}
    ` as unknown as DocumentNode<CounterUpdatedSubscription, CounterUpdatedSubscriptionVariables>;