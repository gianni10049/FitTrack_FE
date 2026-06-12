"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  HYDRATION_HISTORY_LIST_LIMIT,
  HYDRATION_HISTORY_TREND_LIMIT,
} from "@/features/hydration/lib/hydration-history-limits";
import {
  getSignedHydrationAdjustAmount,
  type HydrationAdjustMode,
} from "@/features/hydration/lib/hydration-display";
import { mergeHydrationHistoryWithToday } from "@/features/hydration/lib/merge-hydration-history-with-today";
import {
  onLogWaterIntake,
  onMyWaterIntakeHistory,
  onMyWaterIntakeToday,
  selectHydrationTargetMl,
  selectHydrationTotalMl,
  selectIsLoggingWaterIntake,
  selectLogWaterIntakeError,
  selectMyWaterIntakeHistory,
  selectMyWaterIntakeHistoryError,
  selectMyWaterIntakeHistoryLoading,
  selectMyWaterIntakeToday,
  selectMyWaterIntakeTodayError,
  selectMyWaterIntakeTodayLoading,
} from "@/lib/redux";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export function useHydrationDetail() {
  const dispatch = useAppDispatch();

  const today = useAppSelector(selectMyWaterIntakeToday);
  const totalMl = useAppSelector(selectHydrationTotalMl);
  const targetMl = useAppSelector(selectHydrationTargetMl);
  const history = useAppSelector(selectMyWaterIntakeHistory);
  const todayLoading = useAppSelector(selectMyWaterIntakeTodayLoading);
  const historyLoading = useAppSelector(selectMyWaterIntakeHistoryLoading);
  const isLogging = useAppSelector(selectIsLoggingWaterIntake);
  const todayError = useAppSelector(selectMyWaterIntakeTodayError);
  const historyError = useAppSelector(selectMyWaterIntakeHistoryError);
  const logError = useAppSelector(selectLogWaterIntakeError);

  const reloadToday = useCallback(() => {
    void dispatch(onMyWaterIntakeToday());
  }, [dispatch]);

  const reloadHistory = useCallback(() => {
    void dispatch(
      onMyWaterIntakeHistory({ limit: HYDRATION_HISTORY_TREND_LIMIT }),
    );
  }, [dispatch]);

  useEffect(() => {
    reloadToday();
    reloadHistory();
  }, [reloadToday, reloadHistory]);

  const trendItems = useMemo(
    () =>
      mergeHydrationHistoryWithToday(
        history,
        today ?? undefined,
        HYDRATION_HISTORY_TREND_LIMIT,
      ),
    [history, today],
  );

  const historyItems = useMemo(
    () => trendItems.slice(0, HYDRATION_HISTORY_LIST_LIMIT),
    [trendItems],
  );

  const adjustIntake = useCallback(
    async (amountMl: number, mode: HydrationAdjustMode) => {
      const signedAmount = getSignedHydrationAdjustAmount(amountMl, mode);
      const result = await dispatch(
        onLogWaterIntake({
          input: { amountMl: signedAmount },
          historyLimit: HYDRATION_HISTORY_TREND_LIMIT,
        }),
      );
      if (onLogWaterIntake.rejected.match(result)) {
        throw new Error(
          typeof result.payload === "string"
            ? result.payload
            : "Impossibile registrare l'idratazione.",
        );
      }
      void dispatch(
        onMyWaterIntakeHistory({ limit: HYDRATION_HISTORY_TREND_LIMIT }),
      );
    },
    [dispatch],
  );

  return {
    today,
    totalMl,
    targetMl,
    trendItems,
    historyItems,
    todayLoading,
    historyLoading,
    isLogging,
    error: logError ?? todayError ?? historyError,
    adjustIntake,
    reloadToday,
    reloadHistory,
  };
}
