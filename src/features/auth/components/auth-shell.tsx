"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { BackIcon, ShieldIcon } from "./auth-icons";

interface AuthShellProps {
  children: ReactNode;
  backHref?: string;
  footer?: ReactNode;
}

export function AuthShell({ children, backHref, footer }: AuthShellProps) {
  const t = useTranslations();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-[var(--ft-primary-fixed)]/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[var(--ft-secondary-container)]/10 blur-[120px]"
      />

      <header className="fixed top-0 z-50 w-full border-b border-[var(--ft-outline-variant)]/20 bg-[var(--ft-background)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-[var(--ft-on-surface-variant)] transition-colors hover:text-[var(--ft-on-surface)]"
            >
              <BackIcon />
              <span className="sr-only">{t("common.back")}</span>
            </Link>
          ) : (
            <span className="w-10" />
          )}
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span className="font-[family-name:var(--font-montserrat)] text-lg font-bold text-[var(--ft-primary-fixed)]">
              {t("common.brand")}
            </span>
          </div>
          <span className="w-10" />
        </div>
      </header>

      <main className="relative flex w-full flex-grow items-center justify-center overflow-hidden px-5 pb-12 pt-24">
        {children}
      </main>

      {footer ?? (
        <footer className="mt-auto flex w-full flex-col items-center gap-4 border-t border-[var(--ft-outline-variant)]/30 px-4 py-8">
          <p className="text-center text-[10px] text-[var(--ft-on-surface-variant)] opacity-70">
            {t("common.copyright", { year: String(new Date().getFullYear()) })}
          </p>
        </footer>
      )}
    </div>
  );
}
