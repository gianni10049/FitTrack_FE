"use client";

import { useTranslations } from "next-intl";

interface AppPlaceholderProps {
  title: string;
}

export function AppPlaceholder({ title }: AppPlaceholderProps) {
  const t = useTranslations("placeholder");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <h2 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-[var(--ft-primary-fixed)]">
        {title}
      </h2>
      <p className="mt-2 text-sm text-[var(--ft-on-surface-variant)]">
        {t("underConstruction")}
      </p>
    </div>
  );
}
