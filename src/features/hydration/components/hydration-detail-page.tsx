"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  LogWaterIntakeDocument,
  MyWaterIntakeHistoryDocument,
  MyWaterIntakeTodayDocument,
} from "@/generated/graphql";
import {
  getSignedHydrationAdjustAmount,
  HYDRATION_QUICK_ADD_OPTIONS,
  type HydrationAdjustMode,
} from "@/features/hydration/lib/hydration-display";
import {
  HYDRATION_HISTORY_LIST_LIMIT,
  HYDRATION_HISTORY_TREND_LIMIT,
} from "@/features/hydration/lib/hydration-history-limits";
import { mergeHydrationHistoryWithToday } from "@/features/hydration/lib/merge-hydration-history-with-today";
import { updateHydrationCacheAfterLog } from "@/features/hydration/lib/update-hydration-cache-after-log";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/i18n/config";
import { HydrationAdjustModeToggle } from "./hydration-adjust-mode-toggle";
import { HydrationDetailHeader } from "./hydration-detail-header";
import { HydrationHistoryList } from "./hydration-history-list";
import { HydrationProgressRing } from "./hydration-progress-ring";
import { HydrationTrendChart } from "./hydration-trend-chart";

export function HydrationDetailPage() {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const {
    data: todayData,
    loading: todayLoading,
  } = useQuery(MyWaterIntakeTodayDocument, {
    fetchPolicy: "network-only",
  });

  const {
    data: historyData,
    loading: historyLoading,
  } = useQuery(MyWaterIntakeHistoryDocument, {
    variables: { limit: HYDRATION_HISTORY_TREND_LIMIT },
    fetchPolicy: "network-only",
  });

  const [logIntake, { loading: isLogging }] = useMutation(LogWaterIntakeDocument);
  const [loggingKey, setLoggingKey] = useState<string | null>(null);
  const [adjustMode, setAdjustMode] = useState<HydrationAdjustMode>("add");

  const today = todayData?.myWaterIntakeToday;
  const totalMl = today?.totalMl ?? 0;
  const targetMl = today?.targetMl ?? 3500;

  const trendItems = useMemo(
    () =>
      mergeHydrationHistoryWithToday(
        historyData?.myWaterIntakeHistory,
        today,
        HYDRATION_HISTORY_TREND_LIMIT,
      ),
    [historyData?.myWaterIntakeHistory, today],
  );

  const historyItems = useMemo(
    () => trendItems.slice(0, HYDRATION_HISTORY_LIST_LIMIT),
    [trendItems],
  );

  const handleAdjust = async (amountMl: number) => {
    const signedAmount = getSignedHydrationAdjustAmount(amountMl, adjustMode);
    const actionKey = `${adjustMode}:${amountMl}`;
    setLoggingKey(actionKey);
    try {
      await logIntake({
        variables: { input: { amountMl: signedAmount } },
        update(cache, { data }) {
          if (data?.logWaterIntake) {
            updateHydrationCacheAfterLog(cache, data.logWaterIntake);
          }
        },
      });
    } catch (err: unknown) {
      console.error(extractGraphqlErrorMessage(err));
    } finally {
      setLoggingKey(null);
    }
  };

  const showTodaySkeleton = todayLoading && !today;
  const buttonsDisabled = showTodaySkeleton || isLogging;

  return (
    <>
      <HydrationDetailHeader />

      <div className="mx-auto max-w-md pb-8">
      <section className="relative mb-8 flex flex-col items-center">
        {showTodaySkeleton ? (
          <p className="py-16 text-sm text-[var(--ft-on-surface-variant)]">
            {t("common.loading")}
          </p>
        ) : (
          <HydrationProgressRing totalMl={totalMl} targetMl={targetMl} />
        )}

        <div className="mt-8 w-full">
          <div className="mb-2 flex justify-end">
            <HydrationAdjustModeToggle
              mode={adjustMode}
              onChange={setAdjustMode}
              disabled={buttonsDisabled}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {HYDRATION_QUICK_ADD_OPTIONS.map(({ amountMl }) => {
              const actionKey = `${adjustMode}:${amountMl}`;
              const cannotRemove =
                adjustMode === "remove" && totalMl < amountMl;

              return (
                <button
                  key={amountMl}
                  type="button"
                  onClick={() => void handleAdjust(amountMl)}
                  disabled={buttonsDisabled || cannotRemove}
                  className={cn(
                    "flex items-center justify-center rounded-full px-3 py-4 font-[family-name:var(--font-montserrat)] text-base font-semibold transition-transform hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg",
                    adjustMode === "add"
                      ? "bg-[var(--ft-primary-fixed)] text-[var(--ft-on-primary-fixed)] shadow-[0_10px_30px_rgba(195,244,0,0.3)]"
                      : "border border-[var(--ft-primary-fixed)]/45 bg-[var(--ft-on-primary-fixed)] text-[var(--ft-primary-fixed)] shadow-[0_10px_30px_rgba(195,244,0,0.12)]",
                  )}
                >
                  {loggingKey === actionKey
                    ? t("hydration.loggingEllipsis")
                    : t(`hydration.quickAdjust.${adjustMode}`, {
                        amount: String(amountMl),
                      })}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <HydrationTrendChart
        items={trendItems}
        targetMl={targetMl}
        loading={historyLoading && trendItems.length === 0}
        locale={locale}
      />

      <HydrationHistoryList
        items={historyItems}
        loading={historyLoading && historyItems.length === 0}
        locale={locale}
      />
      </div>
    </>
  );
}
