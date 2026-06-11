const EMAIL_KEY = "fittrack_pw_reset_email";
const TOKEN_KEY = "fittrack_pw_reset_token";

export function setPasswordResetEmail(email: string): void {
  sessionStorage.setItem(EMAIL_KEY, email.trim());
}

export function getPasswordResetEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return sessionStorage.getItem(EMAIL_KEY);
}

export function setPasswordResetToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getPasswordResetToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return sessionStorage.getItem(TOKEN_KEY);
}

export function clearPasswordResetFlow(): void {
  sessionStorage.removeItem(EMAIL_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) {
    return email;
  }
  if (local.length <= 2) {
    return `${local[0] ?? "*"}***@${domain}`;
  }
  return `${local[0]}${"*".repeat(Math.max(local.length - 2, 1))}${local[local.length - 1]}@${domain}`;
}
