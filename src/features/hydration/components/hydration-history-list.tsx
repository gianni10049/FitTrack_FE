"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { MaterialIcon } from "@/components/app-shell/material-icon";
import type { AppLocale } from "@/i18n/config";
import {
  formatHistoryDayLabels,
  getHydrationGoalStatus,
  isHistoryDayToday,
} from "@/features/hydration/lib/hydration-history-labels";

export interface HydrationHistoryDayItem {
  day: string;
  totalMl: number;
  targetMl: number;
}

interface HydrationHistoryListProps {
  items: HydrationHistoryDayItem[];
  loading?: boolean;
  locale: AppLocale;
}

export function HydrationHistoryList({
  items,
  loading,
  locale,
}: HydrationHistoryListProps) {
  const t = useTranslations();
  const historyTranslator = useMemo(
    () => ({
      goalMet: t("hydration.historySection.goalMet"),
      overTarget: (values: { liters: string }) =>
        t("hydration.historySection.overTarget", values),
      percentOfGoal: (values: { percent: number }) =>
        t("hydration.historySection.percentOfGoal", {
          percent: String(values.percent),
        }),
      volume: (values: { liters: string }) =>
        t("hydration.historySection.volume", values),
    }),
    [t],
  );

  return (
    <section>
      <h2 className="mb-4 font-[family-name:var(--font-montserrat)] text-xl font-semibold text-[var(--ft-on-surface)]">
        {t("hydration.historySection.title")}
      </h2>
      {loading ? (
        <p className="text-sm text-[var(--ft-on-surface-variant)]">
          {t("hydration.historySection.loading")}
        </p>
      ) : null}
      <div className="space-y-3">
        {items.map((item) => {
          const labels = formatHistoryDayLabels(item.day, locale);
          const status = getHydrationGoalStatus(
            item.totalMl,
            item.targetMl,
            historyTranslator,
          );
          const isToday = isHistoryDayToday(item.day);

          return (
            <div
              key={item.day}
              className="ft-glass-card flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[var(--ft-surface-container-high)]/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isToday
                      ? "bg-[var(--ft-primary-fixed)]/10"
                      : "bg-[var(--ft-secondary-container)]/10"
                  }`}
                >
                  <MaterialIcon
                    name="event"
                    className={`text-xl ${
                      isToday
                        ? "text-[var(--ft-primary-fixed)]"
                        : "text-[var(--ft-secondary-container)]"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--ft-on-surface)]">
                    {labels.title}
                  </p>
                  <p className="text-xs text-[var(--ft-on-surface-variant)]">
                    {labels.subtitle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-[family-name:var(--font-montserrat)] text-lg font-semibold ${
                    status.met && !status.overTarget
                      ? "text-[var(--ft-on-surface)]"
                      : isToday
                        ? "text-[var(--ft-primary-fixed)]"
                        : "text-[var(--ft-on-surface)]"
                  }`}
                >
                  {status.primary}
                </p>
                <p
                  className={`text-xs font-semibold ${
                    status.met
                      ? "text-[var(--ft-primary-fixed)]"
                      : "text-[var(--ft-on-surface-variant)]"
                  }`}
                >
                  {status.secondary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
