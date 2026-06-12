import type { ApolloCache } from "@apollo/client";
import type { WaterIntakeDayGql } from "@/lib/graphql/graphql";
import {
  MyWaterIntakeHistory,
  MyWaterIntakeToday,
} from "@/lib/graphql/Hydration/operations/queries";

export function updateHydrationCacheAfterLog(
  cache: ApolloCache,
  logged: WaterIntakeDayGql,
  historyLimit: number,
) {
  cache.writeQuery({
    query: MyWaterIntakeToday,
    data: { myWaterIntakeToday: logged },
  });

  try {
    const existing = cache.readQuery<{
      myWaterIntakeHistory: WaterIntakeDayGql[];
    }>({
      query: MyWaterIntakeHistory,
      variables: { limit: historyLimit },
    });

    if (!existing?.myWaterIntakeHistory) {
      return;
    }

    const history = existing.myWaterIntakeHistory;
    const index = history.findIndex((day) => day.day === logged.day);
    const nextHistory =
      index >= 0
        ? history.map((day, i) => (i === index ? logged : day))
        : [logged, ...history].slice(0, historyLimit);

    cache.writeQuery({
      query: MyWaterIntakeHistory,
      variables: { limit: historyLimit },
      data: { myWaterIntakeHistory: nextHistory },
    });
  } catch {
    // History query not in cache yet.
  }
}
