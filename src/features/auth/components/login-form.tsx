"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import {
  clearLoginError,
  onLogin,
  selectLoginError,
  selectIsAuthLoading,
} from "@/lib/redux";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

function MailIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 text-[var(--ft-on-surface-variant)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 text-[var(--ft-on-surface-variant)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden
      className="h-6 w-6 text-[var(--ft-primary-fixed)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

export function LoginForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectLoginError);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const [showPassword, setShowPassword] = useState(false);

  const badgeItems = [
    { key: "secure" as const, icon: "verified_user" },
    { key: "fast" as const, icon: "bolt" },
    { key: "precise" as const, icon: "monitoring" },
  ];

  const footerLinks = [
    { key: "privacy" as const },
    { key: "terms" as const },
    { key: "help" as const },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearLoginError());

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      return;
    }

    const result = await dispatch(onLogin({ email, password }));
    if (onLogin.fulfilled.match(result)) {
      router.push("/dashboard");
      router.refresh();
    }
  };

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
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-center px-5">
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <span className="font-[family-name:var(--font-montserrat)] text-lg font-bold text-[var(--ft-primary-fixed)]">
              {t("common.brand")}
            </span>
          </div>
        </div>
      </header>

      <main className="relative flex w-full flex-grow items-center justify-center overflow-hidden px-5 pb-12 pt-24">
        <div className="ft-glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl md:p-10">
          <div className="mb-10 text-center">
            <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)] md:text-3xl">
              {t("auth.login.title")}
            </h1>
            <p className="mt-2 text-sm text-[var(--ft-on-surface-variant)]">
              {t("auth.login.subtitle")}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
              >
                {t("common.email")}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={t("common.emailPlaceholder")}
                  className="ft-input w-full py-3.5 pl-12 pr-4"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
                >
                  {t("common.password")}
                </label>
                <Link
                  href="/recupera-password"
                  className="text-xs font-medium text-[var(--ft-primary-fixed)] transition-colors hover:underline"
                >
                  {t("auth.login.forgotPassword")}
                </Link>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="ft-input w-full py-3.5 pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ft-on-surface-variant)] hover:text-[var(--ft-on-surface)]"
                >
                  {showPassword
                    ? t("common.hidePassword")
                    : t("common.showPassword")}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-[var(--ft-error)]/30 bg-[var(--ft-error-container)]/20 px-3 py-2 text-sm text-[var(--ft-error)]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="ft-btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? t("auth.login.submitting") : t("auth.login.submit")}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--ft-on-surface-variant)]">
            {t("auth.login.noAccount")}{" "}
            <Link
              href="/registrati"
              className="font-semibold text-[var(--ft-primary-fixed)] hover:underline"
            >
              {t("auth.login.register")}
            </Link>
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {badgeItems.map((item) => (
              <div
                key={item.key}
                className="flex flex-col items-center gap-1 opacity-60"
              >
                <span className="text-[10px] font-bold uppercase tracking-tighter text-[var(--ft-primary-fixed)]">
                  {t(`auth.login.badges.${item.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-auto flex w-full flex-col items-center gap-4 border-t border-[var(--ft-outline-variant)]/30 px-4 py-8">
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((item) => (
            <span
              key={item.key}
              className="text-xs text-[var(--ft-on-surface-variant)] opacity-80"
            >
              {t(`auth.login.footerLinks.${item.key}`)}
            </span>
          ))}
        </div>
        <p className="text-center text-[10px] text-[var(--ft-on-surface-variant)] opacity-70">
          {t("common.copyright", { year: String(new Date().getFullYear()) })}
        </p>
      </footer>
    </div>
  );
}
