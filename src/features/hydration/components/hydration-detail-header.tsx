"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MaterialIcon } from "@/components/app-shell/material-icon";

export function HydrationDetailHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-16 z-30 mb-6 flex h-16 w-screen items-center justify-between border-b border-[var(--ft-outline-variant)]/30 bg-[var(--ft-background)]/95 px-5 backdrop-blur-xl ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-full p-2 text-[var(--ft-on-surface-variant)] transition-colors hover:bg-[var(--ft-surface-container-high)]/50 active:scale-95"
        >
          <MaterialIcon name="arrow_back" className="text-[24px]" />
          <span className="sr-only">{t("common.back")}</span>
        </Link>
        <h1 className="font-[family-name:var(--font-montserrat)] text-lg font-bold tracking-tight text-[var(--ft-primary-fixed)]">
          {t("hydration.detailTitle")}
        </h1>
      </div>
    </header>
  );
}
