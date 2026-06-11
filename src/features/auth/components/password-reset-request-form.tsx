"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { MailIcon } from "@/features/auth/components/auth-icons";
import { setPasswordResetEmail } from "@/features/auth/lib/password-reset-flow";
import { requestPasswordReset } from "@/features/auth/redux/password-reset-thunks";
import { useAppDispatch } from "@/lib/redux/hooks";

export function PasswordResetRequestForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    if (!email) {
      return;
    }

    setIsLoading(true);
    const result = await dispatch(requestPasswordReset(email));
    setIsLoading(false);

    if (requestPasswordReset.fulfilled.match(result)) {
      setPasswordResetEmail(email);
      router.push("/recupera-password/otp");
      return;
    }

    setError(
      typeof result.payload === "string"
        ? result.payload
        : t("auth.passwordReset.request.errorFallback"),
    );
  };

  return (
    <AuthShell backHref="/login">
      <div className="ft-glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl md:p-10">
        <div className="mb-10 text-center">
          <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)] md:text-3xl">
            {t("auth.passwordReset.request.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--ft-on-surface-variant)]">
            {t("auth.passwordReset.request.subtitle")}
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
            {isLoading
              ? t("auth.passwordReset.request.submitting")
              : t("auth.passwordReset.request.submit")}
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-[var(--ft-outline-variant)]/30 bg-[var(--ft-surface-container-lowest)]/50 px-4 py-3 text-center text-xs text-[var(--ft-on-surface-variant)]">
          <p>{t("auth.passwordReset.request.infoMessage")}</p>
          <p className="mt-2 opacity-80">
            {t("auth.passwordReset.request.spamHint")}
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--ft-on-surface-variant)]">
          <Link
            href="/login"
            className="font-semibold text-[var(--ft-primary-fixed)] hover:underline"
          >
            {t("common.backToLogin")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
