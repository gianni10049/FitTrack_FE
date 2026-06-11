"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getGraphqlJwtFromStorage } from "@/lib/auth/graphql-jwt-storage";

/**
 * Redirect a `/login` se non c'è JWT in `localStorage`.
 * Ritorna `true` solo quando l'utente risulta autenticato (client-side).
 */
export function useRequireAuth(): boolean {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = getGraphqlJwtFromStorage();
    if (!token) {
      router.replace("/login");
      return;
    }
    setIsAllowed(true);
  }, [router]);

  return isAllowed;
}
