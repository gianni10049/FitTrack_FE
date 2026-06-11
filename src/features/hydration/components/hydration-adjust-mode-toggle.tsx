"use client";

import { useTranslations } from "next-intl";
import type { HydrationAdjustMode } from "@/features/hydration/lib/hydration-display";

interface HydrationAdjustModeToggleProps {
  mode: HydrationAdjustMode;
  onChange: (mode: HydrationAdjustMode) => void;
  disabled?: boolean;
}

export function HydrationAdjustModeToggle({
  mode,
  onChange,
  disabled,
}: HydrationAdjustModeToggleProps) {
  const t = useTranslations("hydration.adjustMode");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(mode === "add" ? "remove" : "add")}
      aria-label={
        mode === "add" ? t("addActive") : t("removeActive")
      }
      className="flex h-8 w-12 shrink-0 items-center justify-center gap-0.5 rounded-full border border-[var(--ft-outline-variant)]/50 bg-[var(--ft-surface-container-high)]/40 font-[family-name:var(--font-montserrat)] text-xs font-semibold text-[var(--ft-on-surface)] transition-colors hover:bg-[var(--ft-surface-container-high)]/70 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span
        className={
          mode === "remove"
            ? "text-[var(--ft-primary-fixed)]"
            : "text-[var(--ft-on-surface-variant)]/50"
        }
      >
        −
      </span>
      <span className="text-[var(--ft-on-surface-variant)]/40">/</span>
      <span
        className={
          mode === "add"
            ? "text-[var(--ft-primary-fixed)]"
            : "text-[var(--ft-on-surface-variant)]/50"
        }
      >
        +
      </span>
    </button>
  );
}
