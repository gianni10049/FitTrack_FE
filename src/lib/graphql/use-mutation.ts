import type {
  MutationFetchPolicy,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";
import { useCallback } from "react";
import { makeApolloClient } from "./make-apollo-client";

export function useMutation<
  TData,
  TVariables extends OperationVariables = OperationVariables,
>(mutation: TypedDocumentNode<TData, TVariables>) {
  const getDataGQL = useCallback(
    async (
      params?: TVariables extends undefined
        ? undefined
        : { variables: TVariables },
      fetchPolicy?: MutationFetchPolicy,
    ): Promise<TData | undefined> => {
      const { data } = await makeApolloClient().mutate<TData, TVariables>({
        mutation,
        variables: params?.variables as TVariables,
        fetchPolicy: fetchPolicy ?? "network-only",
        errorPolicy: "all",
      });
      return data;
    },
    [mutation],
  );

  return { getDataGQL };
}
