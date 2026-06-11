"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { OtpInput } from "@/features/auth/components/otp-input";
import {
  getPasswordResetEmail,
  maskEmail,
  setPasswordResetToken,
} from "@/features/auth/lib/password-reset-flow";
import {
  requestPasswordReset,
  verifyPasswordResetOtp,
} from "@/features/auth/redux/password-reset-thunks";
import { useAppDispatch } from "@/lib/redux/hooks";

const RESEND_COOLDOWN_SEC = 60;

export function PasswordResetOtpForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SEC);

  useEffect(() => {
    const stored = getPasswordResetEmail();
    if (!stored) {
      router.replace("/recupera-password");
      return;
    }
    setEmail(stored);
  }, [router]);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setCooldown((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !/^\d{5}$/.test(otp)) {
      setError(t("auth.passwordReset.otp.invalidCode"));
      return;
    }

    setError(null);
    setInfo(null);
    setIsLoading(true);
    const result = await dispatch(verifyPasswordResetOtp({ email, otp }));
    setIsLoading(false);

    if (verifyPasswordResetOtp.fulfilled.match(result)) {
      setPasswordResetToken(result.payload.resetToken);
      router.push("/recupera-password/nuova-password");
      return;
    }

    setError(
      typeof result.payload === "string"
        ? result.payload
        : t("auth.passwordReset.otp.errorFallback"),
    );
  };

  const handleResend = async () => {
    if (!email || cooldown > 0 || isResending) {
      return;
    }

    setError(null);
    setInfo(null);
    setIsResending(true);
    const result = await dispatch(requestPasswordReset(email));
    setIsResending(false);

    if (requestPasswordReset.fulfilled.match(result)) {
      setInfo(result.payload.message ?? t("auth.passwordReset.otp.resendSuccess"));
      setCooldown(RESEND_COOLDOWN_SEC);
      setOtp("");
      return;
    }

    setError(
      typeof result.payload === "string"
        ? result.payload
        : t("auth.passwordReset.otp.resendErrorFallback"),
    );
  };

  if (!email) {
    return null;
  }

  return (
    <AuthShell backHref="/recupera-password">
      <div className="ft-glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl md:p-10">
        <div className="mb-10 text-center">
          <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)] md:text-3xl">
            {t("auth.passwordReset.otp.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--ft-on-surface-variant)]">
            {t.rich("auth.passwordReset.otp.subtitle", {
              email: maskEmail(email),
              highlight: (chunks) => (
                <span className="font-medium text-[var(--ft-on-surface)]">
                  {chunks}
                </span>
              ),
            })}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => void handleSubmit(e)}>
          <OtpInput value={otp} onChange={setOtp} disabled={isLoading} />

          <div className="text-center text-sm text-[var(--ft-on-surface-variant)]">
            {cooldown > 0 ? (
              <p>
                {t("auth.passwordReset.otp.cooldown", {
                  seconds: String(cooldown),
                })}
              </p>
            ) : (
              <button
                type="button"
                onClick={() => void handleResend()}
                disabled={isResending}
                className="font-medium text-[var(--ft-primary-fixed)] hover:underline disabled:opacity-60"
              >
                {isResending
                  ? t("auth.passwordReset.otp.resending")
                  : t("auth.passwordReset.otp.resend")}
              </button>
            )}
          </div>

          {info && (
            <p className="rounded-lg border border-[var(--ft-primary-fixed)]/30 bg-[var(--ft-primary-fixed)]/10 px-3 py-2 text-center text-sm text-[var(--ft-primary-fixed)]">
              {info}
            </p>
          )}

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
            disabled={isLoading || otp.length !== 5}
            className="ft-btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? t("auth.passwordReset.otp.submitting")
              : t("auth.passwordReset.otp.submit")}
          </button>
        </form>

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
