"use client";

import { useTranslations } from "next-intl";
import { MOCK_APP_USER } from "./mock-user";
import { MaterialIcon } from "./material-icon";

export function AppHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--ft-outline-variant)]/20 bg-[var(--ft-background)]/90 px-5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-[var(--ft-primary-fixed)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MOCK_APP_USER.avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-tight text-[var(--ft-on-surface)]">
          {t("common.brand")}
        </h1>
      </div>
      <button
        type="button"
        className="text-[var(--ft-on-surface)] transition-opacity hover:opacity-80 active:scale-95"
      >
        <MaterialIcon name="notifications" className="text-[28px]" />
      </button>
    </header>
  );
}
