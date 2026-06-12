"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { MailIcon, LockIcon } from "@/features/auth/components/auth-icons";
import {
  clearRegisterError,
  onRegister,
  selectRegisterError,
  selectRegisterLoading,
  selectRegisterResponse,
} from "@/lib/redux";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export function RegisterForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const registerResponse = useAppSelector(selectRegisterResponse);
  const [showPassword, setShowPassword] = useState(false);

  const successMessage = registerResponse
    ? (registerResponse.message ?? t("auth.register.successFallback"))
    : null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearRegisterError());

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();

    if (!email || !password) {
      return;
    }

    await dispatch(onRegister({ email, password, firstName, lastName }));
  };

  return (
    <AuthShell backHref="/login">
      <div className="ft-glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl md:p-10">
        <div className="mb-10 text-center">
          <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)] md:text-3xl">
            {t("auth.register.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--ft-on-surface-variant)]">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
              >
                {t("auth.register.firstName")}
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                className="ft-input w-full px-4 py-3.5"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
              >
                {t("auth.register.lastName")}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                className="ft-input w-full px-4 py-3.5"
              />
            </div>
          </div>

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
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
            >
              {t("common.password")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <LockIcon />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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

          {successMessage ? (
            <p className="rounded-lg border border-[var(--ft-primary-fixed)]/30 bg-[var(--ft-primary-fixed)]/10 px-3 py-2 text-sm text-[var(--ft-primary-fixed)]">
              {successMessage}
            </p>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="rounded-lg border border-[var(--ft-error)]/30 bg-[var(--ft-error-container)]/20 px-3 py-2 text-sm text-[var(--ft-error)]"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="ft-btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? t("auth.register.submitting")
              : t("auth.register.submit")}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--ft-on-surface-variant)]">
          {t("auth.register.hasAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--ft-primary-fixed)] hover:underline"
          >
            {t("auth.register.signIn")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
