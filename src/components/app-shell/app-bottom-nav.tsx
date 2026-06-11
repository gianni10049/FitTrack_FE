"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { APP_NAV_ITEMS } from "./nav-config";
import { MaterialIcon } from "./material-icon";

export function AppBottomNav() {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-xl bg-[var(--ft-surface-container-lowest)]/90 px-4 py-3 shadow-lg backdrop-blur-xl">
      {APP_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center rounded-full px-4 py-1 transition-transform active:scale-90 ${
              isActive
                ? "bg-[var(--ft-primary-fixed)] text-[var(--ft-on-primary-fixed)]"
                : "text-[var(--ft-on-surface-variant)] hover:text-[var(--ft-on-surface)]"
            }`}
          >
            <MaterialIcon name={item.icon} className="text-[22px]" />
            <span className="text-[10px] font-semibold">
              {t(item.labelKey)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
