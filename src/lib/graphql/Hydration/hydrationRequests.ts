import type {
  LogWaterIntakeInput,
  MutationLogWaterIntakeArgs,
  QueryMyWaterIntakeHistoryArgs,
  WaterIntakeDayGql,
} from "@/lib/graphql/graphql";
import { updateHydrationCacheAfterLog } from "@/features/hydration/lib/update-hydration-cache-after-log";
import { makeApolloClient } from "@/lib/graphql/make-apollo-client";
import { LogWaterIntake } from "./operations/mutations";
import { MyWaterIntakeHistory, MyWaterIntakeToday } from "./operations/queries";

export async function requestMyWaterIntakeToday(): Promise<WaterIntakeDayGql | null> {
  const { data } = await makeApolloClient().query<{
    myWaterIntakeToday: WaterIntakeDayGql;
  }>({
    query: MyWaterIntakeToday,
    fetchPolicy: "network-only",
  });
  return data?.myWaterIntakeToday ?? null;
}

export async function requestMyWaterIntakeHistory(
  args: QueryMyWaterIntakeHistoryArgs = {},
): Promise<WaterIntakeDayGql[]> {
  const { data } = await makeApolloClient().query<{
    myWaterIntakeHistory: WaterIntakeDayGql[];
  }>({
    query: MyWaterIntakeHistory,
    variables: args,
    fetchPolicy: "network-only",
  });
  return data?.myWaterIntakeHistory ?? [];
}

export async function requestLogWaterIntake(
  input: LogWaterIntakeInput,
  historyLimit: number,
): Promise<WaterIntakeDayGql | null> {
  const client = makeApolloClient();
  const result = await client.mutate<
    { logWaterIntake: WaterIntakeDayGql },
    MutationLogWaterIntakeArgs
  >({
    mutation: LogWaterIntake,
    variables: { input },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  if (result.error) {
    throw result.error;
  }
  const logged = result.data?.logWaterIntake;
  if (logged) {
    updateHydrationCacheAfterLog(client.cache, logged, historyLimit);
  }
  return logged ?? null;
}
