import type {
  FetchPolicy,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";
import { useCallback } from "react";
import { makeApolloClient } from "./make-apollo-client";

export function useQuery<
  TData,
  TVariables extends OperationVariables = OperationVariables,
>(query: TypedDocumentNode<TData, TVariables>) {
  const getDataGQL = useCallback(
    async (
      params?: TVariables extends undefined
        ? undefined
        : { variables: TVariables },
      fetchPolicy?: FetchPolicy,
    ): Promise<TData | undefined> => {
      const { data } = await makeApolloClient().query<TData, TVariables>({
        query,
        variables: params?.variables as TVariables,
        fetchPolicy: fetchPolicy ?? "network-only",
      });
      return data;
    },
    [query],
  );

  return { getDataGQL };
}
