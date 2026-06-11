export const HYDRATION_LOG_AMOUNT_ML = 250;

/** Primo litro oltre il target (ml): bicchieri extra grigi; oltre → rossi. */
export const HYDRATION_EXCESS_GRAY_MAX_ML = 1000;

export type HydrationExcessTone = "normal" | "gray" | "red";

export type HydrationQuickAddKey = "add250" | "add500" | "add1L";

/** Primo litro oltre il target (ml): bicchieri extra grigi; oltre → rossi. */
export function getHydrationExcessTone(
  totalMl: number,
  targetMl: number,
): HydrationExcessTone {
  const excessMl = totalMl - targetMl;
  if (excessMl <= 0) {
    return "normal";
  }
  if (excessMl <= HYDRATION_EXCESS_GRAY_MAX_ML) {
    return "gray";
  }
  return "red";
}

const HYDRATION_EXCESS_GRAY_MAX_GLASSES =
  HYDRATION_EXCESS_GRAY_MAX_ML / HYDRATION_LOG_AMOUNT_ML;

/** `excessIndex` 0-based: grigio fino a 1 L oltre target (incluso), rosso dopo. */
export function isExcessGlassRed(excessIndex: number): boolean {
  return excessIndex >= HYDRATION_EXCESS_GRAY_MAX_GLASSES;
}

/** Anello progresso: fino a +1 L oltre target resta palette normale, poi rosso. */
export function getHydrationProgressRingTone(
  totalMl: number,
  targetMl: number,
): Exclude<HydrationExcessTone, "gray"> {
  const tone = getHydrationExcessTone(totalMl, targetMl);
  return tone === "gray" ? "normal" : tone;
}

export const HYDRATION_QUICK_ADD_OPTIONS = [
  { amountMl: 250, labelKey: "add250" as const },
  { amountMl: 500, labelKey: "add500" as const },
  { amountMl: 1000, labelKey: "add1L" as const },
] as const;

export type HydrationAdjustMode = "add" | "remove";

export function getSignedHydrationAdjustAmount(
  amountMl: number,
  mode: HydrationAdjustMode,
): number {
  return mode === "add" ? amountMl : -amountMl;
}

export function mlToLitersLabel(ml: number): string {
  const liters = ml / 1000;
  if (Number.isInteger(liters)) {
    return `${liters}`;
  }
  return String(Number(liters.toFixed(2)));
}

/** Bicchieri da 250 ml per la UI (allineato al pulsante Add 250ml). */
export function getHydrationGlassCounts(totalMl: number, targetMl: number) {
  const glassMl = HYDRATION_LOG_AMOUNT_ML;
  const targetGlasses = Math.max(1, Math.ceil(targetMl / glassMl));
  const filledTargetGlasses = Math.min(
    targetGlasses,
    Math.floor(totalMl / glassMl),
  );
  const excessMl = Math.max(0, totalMl - targetMl);
  const excessGlasses = Math.floor(excessMl / glassMl);

  return {
    targetGlasses,
    filledTargetGlasses,
    excessGlasses,
    totalGlasses: targetGlasses + excessGlasses,
    glassMl,
  };
}
