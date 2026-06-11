import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { mlToLitersLabel } from "@/features/hydration/lib/hydration-display";

export type HydrationTrendSourceDay = {
  day: string;
  totalMl: number;
  targetMl: number;
};

export type HydrationTrendChartDay = {
  day: string;
  label: string;
  liters: number;
};

export type HydrationTrendChartData = {
  days: HydrationTrendChartDay[];
  averageLiters: number;
  targetLiters: number;
  yDomain: [number, number];
};

function formatTrendDayLabel(dayKey: string, locale: AppLocale): string {
  const date = new Date(`${dayKey}T12:00:00.000Z`);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
  });
}

function mlToChartLiters(totalMl: number): number {
  return Number((totalMl / 1000).toFixed(2));
}

/** Dominio Y simmetrico sul target: la linea obiettivo resta al centro del grafico. */
function buildYDomain(liters: number[], targetLiters: number): [number, number] {
  const padding = 0.25;
  const minHalfSpan = 0.75;

  const maxDeviation =
    liters.length > 0
      ? Math.max(...liters.map((value) => Math.abs(value - targetLiters)))
      : 0;

  const halfSpan =
    Math.ceil((Math.max(maxDeviation, minHalfSpan) + padding) * 4) / 4;

  return [targetLiters - halfSpan, targetLiters + halfSpan];
}

/** Storico API → punti del line chart (ordine cronologico). */
export function buildHydrationTrendChartData(
  sourceDays: HydrationTrendSourceDay[],
  targetMl: number,
  locale: AppLocale = defaultLocale,
): HydrationTrendChartData {
  const targetLiters = mlToChartLiters(targetMl);
  const sorted = [...sourceDays].sort((a, b) => a.day.localeCompare(b.day));

  const days = sorted.map((item) => ({
    day: item.day,
    label: formatTrendDayLabel(item.day, locale),
    liters: mlToChartLiters(item.totalMl),
  }));

  const averageLiters =
    days.length > 0
      ? Number(
          (
            days.reduce((sum, point) => sum + point.liters, 0) / days.length
          ).toFixed(1),
        )
      : 0;

  return {
    days,
    averageLiters,
    targetLiters,
    yDomain: buildYDomain(
      days.map((point) => point.liters),
      targetLiters,
    ),
  };
}

/** Etichetta media per l’header del grafico. */
export function formatHydrationTrendAverage(liters: number): string {
  return mlToLitersLabel(Math.round(liters * 1000));
}
