"use client";

"use client";

import { useTranslations } from "next-intl";
import { MaterialIcon } from "@/components/app-shell/material-icon";
import {
  getHydrationProgressRingTone,
  mlToLitersLabel,
} from "@/features/hydration/lib/hydration-display";

const RING_RADIUS = 110;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const RING_TONE_STYLES = {
  normal: {
    gradientId: "hydration-ring-gradient-normal",
    gradientStops: [
      { offset: "0%", color: "var(--ft-secondary-container)" },
      { offset: "100%", color: "var(--ft-primary-fixed)" },
    ],
    iconClass: "text-[var(--ft-primary-fixed)]",
    amountClass: "text-[var(--ft-on-surface)]",
    unitClass: "text-[var(--ft-on-surface-variant)]",
    goalClass: "text-[var(--ft-outline-variant)]",
  },
  gray: {
    gradientId: "hydration-ring-gradient-gray",
    gradientStops: [
      { offset: "0%", color: "var(--ft-outline-variant)" },
      { offset: "100%", color: "var(--ft-outline-variant)" },
    ],
    iconClass: "text-[var(--ft-outline-variant)]",
    amountClass: "text-[var(--ft-on-surface-variant)]",
    unitClass: "text-[var(--ft-on-surface-variant)]",
    goalClass: "text-[var(--ft-outline-variant)]",
  },
  red: {
    gradientId: "hydration-ring-gradient-red",
    gradientStops: [
      { offset: "0%", color: "var(--ft-error-container)" },
      { offset: "100%", color: "var(--ft-error)" },
    ],
    iconClass: "text-[var(--ft-error)]",
    amountClass: "text-[var(--ft-error)]",
    unitClass: "text-[var(--ft-error)]/70",
    goalClass: "text-[var(--ft-outline-variant)]",
  },
} as const;

interface HydrationProgressRingProps {
  totalMl: number;
  targetMl: number;
}

export function HydrationProgressRing({
  totalMl,
  targetMl,
}: HydrationProgressRingProps) {
  const t = useTranslations();
  const progress =
    targetMl > 0 ? Math.min(totalMl / targetMl, 1) : 0;
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);
  const tone = getHydrationProgressRingTone(totalMl, targetMl);
  const styles = RING_TONE_STYLES[tone];

  return (
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 256 256">
        <circle
          cx="128"
          cy="128"
          r={RING_RADIUS}
          fill="transparent"
          stroke="#1e1e1e"
          strokeWidth="12"
        />
        <circle
          cx="128"
          cy="128"
          r={RING_RADIUS}
          fill="transparent"
          stroke={`url(#${styles.gradientId})`}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset,stroke] duration-700 ease-out"
        />
        <defs>
          <linearGradient
            id={styles.gradientId}
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            {styles.gradientStops.map((stop) => (
              <stop
                key={stop.offset}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <MaterialIcon
          name="water_drop"
          filled
          className={`mb-1 text-4xl transition-colors duration-700 ${styles.iconClass}`}
        />
        <div className="flex items-baseline gap-1">
          <span
            className={`font-[family-name:var(--font-montserrat)] text-3xl font-bold transition-colors duration-700 ${styles.amountClass}`}
          >
            {mlToLitersLabel(totalMl)}
          </span>
          <span
            className={`text-sm transition-colors duration-700 ${styles.unitClass}`}
          >
            {t("common.liters")}
          </span>
        </div>
        <span
          className={`text-xs uppercase tracking-widest transition-colors duration-700 ${styles.goalClass}`}
        >
          {t("hydration.goal", { target: mlToLitersLabel(targetMl) })}
        </span>
      </div>
    </div>
  );
}
