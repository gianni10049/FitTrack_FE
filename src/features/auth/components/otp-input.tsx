"use client";

import {
  ClipboardEvent,
  KeyboardEvent,
  useCallback,
  useRef,
} from "react";
import { useTranslations } from "next-intl";

const OTP_LENGTH = 5;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const t = useTranslations("auth.passwordReset.otp");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(OTP_LENGTH, " ").split("").slice(0, OTP_LENGTH);

  const focusIndex = useCallback((index: number) => {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  }, []);

  const updateDigit = (index: number, digit: string) => {
    const next = digits.map((d, i) => (i === index ? digit : d === " " ? "" : d));
    const joined = next.join("").replace(/\s/g, "").slice(0, OTP_LENGTH);
    onChange(joined);
    if (digit && index < OTP_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      const current = digits[index]?.trim() ?? "";
      if (!current && index > 0) {
        event.preventDefault();
        updateDigit(index - 1, "");
        focusIndex(index - 1);
      }
    }
    if (event.key === "ArrowLeft" && index > 0) {
      focusIndex(index - 1);
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (pasted) {
      onChange(pasted);
      focusIndex(Math.min(pasted.length, OTP_LENGTH - 1));
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: OTP_LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={digits[index]?.trim() ?? ""}
          onChange={(event) => {
            const digit = event.target.value.replace(/\D/g, "").slice(-1);
            updateDigit(index, digit);
          }}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
          className="ft-input h-14 w-12 text-center text-xl font-semibold tracking-widest md:h-16 md:w-14"
          aria-label={t("digitAriaLabel", { index: String(index + 1) })}
        />
      ))}
    </div>
  );
}
