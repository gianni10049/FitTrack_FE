import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { mlToLitersLabel } from "./hydration-display";

export interface HydrationGoalStatus {
  primary: string;
  secondary: string;
  met: boolean;
  overTarget: boolean;
}

export interface HydrationHistoryTranslator {
  goalMet: string;
  overTarget: (values: { liters: string }) => string;
  percentOfGoal: (values: { percent: number }) => string;
  volume: (values: { liters: string }) => string;
}

export function formatHistoryLiters(totalMl: number): string {
  return `${mlToLitersLabel(totalMl)}L`;
}

export function getHydrationGoalStatus(
  totalMl: number,
  targetMl: number,
  translate: HydrationHistoryTranslator,
): HydrationGoalStatus {
  if (targetMl <= 0) {
    return {
      primary: translate.volume({ liters: mlToLitersLabel(totalMl) }),
      secondary: "",
      met: false,
      overTarget: false,
    };
  }

  if (totalMl >= targetMl) {
    const overMl = totalMl - targetMl;
    if (overMl > 0) {
      return {
        primary: translate.volume({ liters: mlToLitersLabel(totalMl) }),
        secondary: translate.overTarget({ liters: mlToLitersLabel(overMl) }),
        met: true,
        overTarget: true,
      };
    }
    return {
      primary: translate.volume({ liters: mlToLitersLabel(totalMl) }),
      secondary: translate.goalMet,
      met: true,
      overTarget: false,
    };
  }

  const pct = Math.round((totalMl / targetMl) * 100);
  return {
    primary: translate.volume({ liters: mlToLitersLabel(totalMl) }),
    secondary: translate.percentOfGoal({ percent: pct }),
    met: false,
    overTarget: false,
  };
}

function parseDayKey(day: string): Date {
  return new Date(`${day}T12:00:00`);
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatHistoryDayLabels(
  dayKey: string,
  locale: AppLocale = defaultLocale,
): { title: string; subtitle: string } {
  const date = parseDayKey(dayKey);

  return {
    title: date.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
    }),
    subtitle: date.toLocaleDateString(locale, { weekday: "long" }),
  };
}

export function isHistoryDayToday(
  dayKey: string,
  today = new Date(),
): boolean {
  return isSameCalendarDay(parseDayKey(dayKey), today);
}
