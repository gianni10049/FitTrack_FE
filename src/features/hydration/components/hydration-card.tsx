"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/app-shell/material-icon";
import {
  getHydrationGlassCounts,
  HYDRATION_QUICK_ADD_OPTIONS,
  isExcessGlassRed,
  mlToLitersLabel,
} from "@/features/hydration/lib/hydration-display";
import { HYDRATION_HISTORY_TREND_LIMIT } from "@/features/hydration/lib/hydration-history-limits";
import {
  onLogWaterIntake,
  onMyWaterIntakeToday,
  selectHydrationTargetMl,
  selectHydrationTotalMl,
  selectIsLoggingWaterIntake,
  selectLogWaterIntakeError,
  selectMyWaterIntakeToday,
  selectMyWaterIntakeTodayError,
  selectMyWaterIntakeTodayLoading,
} from "@/lib/redux";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

function HydrationGlasses({
  targetGlasses,
  filledTargetGlasses,
  excessGlasses,
}: {
  targetGlasses: number;
  filledTargetGlasses: number;
  excessGlasses: number;
}) {
  const total = targetGlasses + excessGlasses;

  return (
    <div className="my-8 flex flex-wrap gap-3">
      {Array.from({ length: total }, (_, index) => {
        const isExcess = index >= targetGlasses;
        const isFilled = isExcess || index < filledTargetGlasses;
        const excessIsRed = isExcess && isExcessGlassRed(index - targetGlasses);

        const shellClass = isExcess
          ? excessIsRed
            ? "border-[var(--ft-error)]/70 bg-[var(--ft-error-container)]/25"
            : "border-[var(--ft-outline-variant)]/70 bg-[var(--ft-outline-variant)]/25"
          : isFilled
            ? "border-[var(--ft-secondary-container)] bg-[var(--ft-secondary-container)]/30"
            : "border-[var(--ft-outline-variant)]/50";

        const fillClass = isExcess
          ? excessIsRed
            ? "bg-[var(--ft-error)]/55"
            : "bg-[var(--ft-outline-variant)]/55"
          : "bg-[var(--ft-secondary-container)]/60";

        return (
          <div
            key={index}
            className={`relative flex h-14 w-10 items-end rounded-b-lg border-2 ${shellClass}`}
          >
            {isFilled ? (
              <div className={`h-full w-full rounded-b-sm ${fillClass}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function HydrationCard() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const today = useAppSelector(selectMyWaterIntakeToday);
  const totalMl = useAppSelector(selectHydrationTotalMl);
  const targetMl = useAppSelector(selectHydrationTargetMl);
  const loading = useAppSelector(selectMyWaterIntakeTodayLoading);
  const isLogging = useAppSelector(selectIsLoggingWaterIntake);
  const error =
    useAppSelector(selectMyWaterIntakeTodayError) ??
    useAppSelector(selectLogWaterIntakeError);
  const [loggingAmountMl, setLoggingAmountMl] = useState<number | null>(null);

  useEffect(() => {
    void dispatch(onMyWaterIntakeToday());
  }, [dispatch]);

  const { targetGlasses, filledTargetGlasses, excessGlasses } =
    getHydrationGlassCounts(totalMl, targetMl);

  const handleAdd = async (amountMl: number) => {
    setLoggingAmountMl(amountMl);
    try {
      await dispatch(
        onLogWaterIntake({
          input: { amountMl },
          historyLimit: HYDRATION_HISTORY_TREND_LIMIT,
        }),
      );
    } finally {
      setLoggingAmountMl(null);
    }
  };

  const buttonsDisabled = loading || isLogging || loggingAmountMl != null || Boolean(error);

  return (
    <div className="ft-glass-card flex flex-col justify-between rounded-xl p-6 md:col-span-5">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-[var(--ft-on-surface)]">
              {t("hydration.title")}
            </h3>
            <Link
              href="/idratazione"
              className="text-xs font-semibold text-[var(--ft-primary-fixed)] hover:underline"
            >
              {t("hydration.history")}
            </Link>
          </div>
          <MaterialIcon
            name="water_drop"
            filled
            className="shrink-0 text-[var(--ft-secondary-container)]"
          />
        </div>
        <p className="mt-1 text-sm text-[var(--ft-on-surface-variant)]">
          {loading && !today
            ? t("common.loading")
            : t("hydration.progress", {
                total: mlToLitersLabel(totalMl),
                target: mlToLitersLabel(targetMl),
              })}
        </p>
      </div>

      {error ? (
        <p
          role="alert"
          className="my-4 rounded-lg border border-[var(--ft-error)]/30 bg-[var(--ft-error-container)]/20 px-3 py-2 text-sm text-[var(--ft-error)]"
        >
          {error}
        </p>
      ) : (
        <HydrationGlasses
          targetGlasses={targetGlasses}
          filledTargetGlasses={filledTargetGlasses}
          excessGlasses={excessGlasses}
        />
      )}

      <div className="grid grid-cols-3 gap-2">
        {HYDRATION_QUICK_ADD_OPTIONS.map(({ amountMl, labelKey }) => (
          <button
            key={amountMl}
            type="button"
            onClick={() => void handleAdd(amountMl)}
            disabled={buttonsDisabled}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-[var(--ft-secondary-container)]/50 bg-[var(--ft-secondary-container)]/10 px-2 py-3 text-xs font-medium text-[var(--ft-secondary-container)] transition-colors hover:bg-[var(--ft-secondary-container)]/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-row sm:gap-2 sm:py-4 sm:text-sm"
          >
            <MaterialIcon name="add_circle" />
            {loggingAmountMl === amountMl
              ? t("common.logging")
              : t(`hydration.quickAdd.${labelKey}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
