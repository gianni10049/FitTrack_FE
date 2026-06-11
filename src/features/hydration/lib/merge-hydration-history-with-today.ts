import type { HydrationTrendSourceDay } from "@/features/hydration/lib/hydration-trend-data";

type HydrationDayRecord = HydrationTrendSourceDay & {
  id?: string;
  updatedAt?: string;
};

/** Allinea lo storico con la giornata corrente (query today più fresca). */
export function mergeHydrationHistoryWithToday(
  history: HydrationDayRecord[] | undefined,
  today: HydrationDayRecord | undefined,
  maxItems: number,
): HydrationTrendSourceDay[] {
  const fromApi =
    history?.map(({ day, totalMl, targetMl }) => ({
      day,
      totalMl,
      targetMl,
    })) ?? [];

  if (!today) {
    return fromApi.slice(0, maxItems);
  }

  const todayItem: HydrationTrendSourceDay = {
    day: today.day,
    totalMl: today.totalMl,
    targetMl: today.targetMl,
  };

  const index = fromApi.findIndex((item) => item.day === today.day);
  if (index >= 0) {
    return fromApi
      .map((item, i) => (i === index ? todayItem : item))
      .slice(0, maxItems);
  }

  return [todayItem, ...fromApi].slice(0, maxItems);
}
