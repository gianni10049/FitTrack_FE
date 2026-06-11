import { standaloneTranslator as t } from "@/i18n/standalone-translator";

/** Allineato a `backend/libs/security/src/password-policy.ts`. */
export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function getStrongPasswordPolicyMessage(): string {
  return t("auth.passwordPolicy");
}

export function isStrongPassword(plain: string): boolean {
  return typeof plain === "string" && STRONG_PASSWORD_REGEX.test(plain);
}

export interface PasswordRequirementChecks {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
  passwordsMatch: boolean;
}

export function getPasswordRequirementChecks(
  password: string,
  confirmPassword: string,
): PasswordRequirementChecks {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    passwordsMatch:
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword,
  };
}

export function allPasswordRequirementsMet(
  checks: PasswordRequirementChecks,
): boolean {
  return (
    checks.minLength &&
    checks.hasUppercase &&
    checks.hasLowercase &&
    checks.hasDigit &&
    checks.hasSpecial &&
    checks.passwordsMatch
  );
}
