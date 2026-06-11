import type { ApolloCache } from "@apollo/client";
import type {
  LogWaterIntakeMutation,
  MyWaterIntakeHistoryQuery,
} from "@/generated/graphql";
import {
  MyWaterIntakeHistoryDocument,
  MyWaterIntakeTodayDocument,
} from "@/generated/graphql";
import { HYDRATION_HISTORY_TREND_LIMIT } from "@/features/hydration/lib/hydration-history-limits";

const HISTORY_LIMIT = HYDRATION_HISTORY_TREND_LIMIT;

export function updateHydrationCacheAfterLog(
  cache: ApolloCache,
  logged: LogWaterIntakeMutation["logWaterIntake"],
) {
  cache.writeQuery({
    query: MyWaterIntakeTodayDocument,
    data: { myWaterIntakeToday: logged },
  });

  try {
    const existing = cache.readQuery<MyWaterIntakeHistoryQuery>({
      query: MyWaterIntakeHistoryDocument,
      variables: { limit: HISTORY_LIMIT },
    });

    if (!existing?.myWaterIntakeHistory) {
      return;
    }

    const history = existing.myWaterIntakeHistory;
    const index = history.findIndex((day) => day.day === logged.day);
    const nextHistory =
      index >= 0
        ? history.map((day, i) => (i === index ? logged : day))
        : [logged, ...history].slice(0, HISTORY_LIMIT);

    cache.writeQuery({
      query: MyWaterIntakeHistoryDocument,
      variables: { limit: HISTORY_LIMIT },
      data: { myWaterIntakeHistory: nextHistory },
    });
  } catch {
    // History query not in cache yet.
  }
}
