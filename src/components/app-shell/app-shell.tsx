"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useRequireAuth } from "@/features/auth/hooks/use-require-auth";
import { AppBottomNav } from "./app-bottom-nav";
import { AppHeader } from "./app-header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const isAllowed = useRequireAuth();
  const pathname = usePathname();
  const isHydrationDetail = pathname.startsWith("/idratazione");

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="relative min-h-screen pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-[-5%] h-[35%] w-[50%] rounded-full bg-[var(--ft-primary-fixed)]/10 blur-[100px]"
      />

      <AppHeader />

      <main
        className={`relative mx-auto max-w-5xl px-5 ${isHydrationDetail ? "pt-0" : "pt-4"}`}
      >
        {children}
      </main>

      <AppBottomNav />
    </div>
  );
}
