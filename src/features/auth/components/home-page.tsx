"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRequireAuth } from "@/features/auth/hooks/use-require-auth";

export function HomePage() {
  const router = useRouter();
  const isAllowed = useRequireAuth();

  useEffect(() => {
    if (isAllowed) {
      router.replace("/dashboard");
    }
  }, [isAllowed, router]);

  return null;
}
