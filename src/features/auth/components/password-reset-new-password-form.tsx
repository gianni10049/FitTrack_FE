"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LockIcon } from "@/features/auth/components/auth-icons";
import {
  allPasswordRequirementsMet,
  getPasswordRequirementChecks,
  getStrongPasswordPolicyMessage,
  isStrongPassword,
} from "@/features/auth/lib/password-policy";
import {
  clearPasswordResetFlow,
  getPasswordResetToken,
} from "@/features/auth/lib/password-reset-flow";
import { completePasswordReset } from "@/features/auth/redux/password-reset-thunks";
import { useAppDispatch } from "@/lib/redux/hooks";

function RequirementRow({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) {
  return (
    <li
      className={`flex items-center gap-2 text-sm transition-colors ${
        met ? "text-[var(--ft-primary-fixed)]" : "text-[var(--ft-on-surface-variant)]"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
          met
            ? "border-[var(--ft-primary-fixed)] bg-[var(--ft-primary-fixed)] text-[var(--ft-on-primary-fixed)]"
            : "border-[var(--ft-outline-variant)]"
        }`}
      >
        {met ? "✓" : ""}
      </span>
      {label}
    </li>
  );
}

export function PasswordResetNewPasswordForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const token = getPasswordResetToken();
    if (!token) {
      router.replace("/recupera-password");
      return;
    }
    setResetToken(token);
  }, [router]);

  const checks = useMemo(
    () => getPasswordRequirementChecks(password, confirmPassword),
    [password, confirmPassword],
  );

  const canSubmit =
    resetToken &&
    allPasswordRequirementsMet(checks) &&
    isStrongPassword(password);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resetToken || !canSubmit) {
      return;
    }

    setError(null);
    setIsLoading(true);
    const result = await dispatch(
      completePasswordReset({ resetToken, newPassword: password }),
    );
    setIsLoading(false);

    if (completePasswordReset.fulfilled.match(result)) {
      clearPasswordResetFlow();
      setCompleted(true);
      return;
    }

    setError(
      typeof result.payload === "string"
        ? result.payload
        : getStrongPasswordPolicyMessage(),
    );
  };

  if (!resetToken && !completed) {
    return null;
  }

  if (completed) {
    return (
      <AuthShell backHref="/login">
        <div className="ft-glass-card w-full max-w-md rounded-2xl p-8 text-center shadow-2xl md:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ft-primary-fixed)]/20">
            <span className="text-3xl text-[var(--ft-primary-fixed)]">✓</span>
          </div>
          <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)] md:text-3xl">
            {t("auth.passwordReset.newPassword.successTitle")}
          </h1>
          <p className="mt-3 text-sm text-[var(--ft-on-surface-variant)]">
            {t("auth.passwordReset.newPassword.successBody")}
          </p>
          <Link
            href="/login"
            className="ft-btn-primary mt-8 inline-block w-full py-4 text-center"
          >
            {t("common.backToLogin")}
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell backHref="/recupera-password/otp">
      <div className="ft-glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl md:p-10">
        <div className="mb-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--ft-on-surface-variant)]">
            {t("auth.passwordReset.newPassword.step")}
          </span>
        </div>
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)] md:text-3xl">
            {t("auth.passwordReset.newPassword.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--ft-on-surface-variant)]">
            {t("auth.passwordReset.newPassword.subtitle")}
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
            >
              {t("auth.passwordReset.newPassword.newPassword")}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]"
            >
              {t("auth.passwordReset.newPassword.confirmPassword")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <LockIcon />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="ft-input w-full py-3.5 pl-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ft-on-surface-variant)] hover:text-[var(--ft-on-surface)]"
              >
                {showConfirm
                  ? t("common.hidePassword")
                  : t("common.showPassword")}
              </button>
            </div>
          </div>

          <ul className="space-y-2 rounded-lg border border-[var(--ft-outline-variant)]/30 bg-[var(--ft-surface-container-lowest)]/50 p-4">
            <RequirementRow
              met={checks.minLength}
              label={t("auth.passwordReset.newPassword.requirements.minLength")}
            />
            <RequirementRow
              met={checks.hasUppercase}
              label={t("auth.passwordReset.newPassword.requirements.uppercase")}
            />
            <RequirementRow
              met={checks.hasLowercase}
              label={t("auth.passwordReset.newPassword.requirements.lowercase")}
            />
            <RequirementRow
              met={checks.hasDigit}
              label={t("auth.passwordReset.newPassword.requirements.digit")}
            />
            <RequirementRow
              met={checks.hasSpecial}
              label={t("auth.passwordReset.newPassword.requirements.special")}
            />
            <RequirementRow
              met={checks.passwordsMatch}
              label={t("auth.passwordReset.newPassword.requirements.match")}
            />
          </ul>

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
            disabled={isLoading || !canSubmit}
            className="ft-btn-primary w-full py-4 uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? t("auth.passwordReset.newPassword.submitting")
              : t("auth.passwordReset.newPassword.submit")}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
