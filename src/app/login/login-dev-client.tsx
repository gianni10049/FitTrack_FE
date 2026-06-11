"use client";

import { useApolloClient } from "@apollo/client/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  BUCKET_GRAPHQL_JWT_KEY,
  clearGraphqlJwtFromStorage,
  setGraphqlJwtInStorage,
} from "@/lib/auth/graphql-jwt-storage";
import { getDevAuthTokenUrl } from "@/lib/config/public-env";
import {
  HavePermissionDocument,
  MeDocument,
  type HavePermissionQuery,
  type HavePermissionQueryVariables,
  type MeQuery,
} from "@/generated/graphql";

export function LoginDevClient({ initialSub }: { initialSub?: string }) {
  const client = useApolloClient();
  const [jwtInput, setJwtInput] = useState("");
  const [meResult, setMeResult] = useState<string | null>(null);
  const [meError, setMeError] = useState<string | null>(null);
  const [meLoading, setMeLoading] = useState(false);
  const [permissionKey, setPermissionKey] = useState("");
  const [permResult, setPermResult] = useState<boolean | null>(null);
  const [permError, setPermError] = useState<string | null>(null);
  const [permLoading, setPermLoading] = useState(false);
  const [devSub, setDevSub] = useState(initialSub ?? "");
  const [devTokenLoading, setDevTokenLoading] = useState(false);
  const [devTokenError, setDevTokenError] = useState<string | null>(null);
  const [devTokenOk, setDevTokenOk] = useState(false);

  const fetchDevJwt = useCallback(async () => {
    const sub = devSub.trim();
    if (!sub) {
      setDevTokenError("Inserisci un sub (es. ObjectId utente MongoDB)");
      return;
    }
    setDevTokenLoading(true);
    setDevTokenError(null);
    setDevTokenOk(false);
    try {
      const res = await fetch(getDevAuthTokenUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sub }),
      });
      const data = (await res.json().catch(() => null)) as
        | { access_token?: string; message?: string | string[] }
        | null;
      if (!res.ok) {
        const msg =
          typeof data?.message === "string"
            ? data.message
            : Array.isArray(data?.message)
              ? data.message.join(", ")
              : `HTTP ${res.status}`;
        setDevTokenError(msg);
        return;
      }
      const token = data?.access_token?.trim();
      if (!token) {
        setDevTokenError("Risposta senza access_token");
        return;
      }
      setJwtInput(token);
      setDevTokenOk(true);
    } catch (e: unknown) {
      setDevTokenError(
        e instanceof Error ? e.message : "Errore di rete verso il backend",
      );
    } finally {
      setDevTokenLoading(false);
    }
  }, [devSub]);

  const saveJwt = useCallback(() => {
    const t = jwtInput.trim();
    if (!t) {
      return;
    }
    setGraphqlJwtInStorage(t);
    setMeResult(null);
    setMeError(null);
    setPermResult(null);
    setPermError(null);
  }, [jwtInput]);

  const runMe = useCallback(async () => {
    setMeLoading(true);
    setMeError(null);
    setMeResult(null);
    try {
      const { data, error } = await client.query<MeQuery>({
        query: MeDocument,
        fetchPolicy: "network-only",
      });
      if (error) {
        setMeError(error.message);
        return;
      }
      setMeResult(data?.me ?? null);
    } catch (e: unknown) {
      setMeError(e instanceof Error ? e.message : "Errore query me");
    } finally {
      setMeLoading(false);
    }
  }, [client]);

  const runHavePermission = useCallback(async () => {
    const key = permissionKey.trim();
    if (!key) {
      setPermError("Inserisci una chiave permesso");
      return;
    }
    setPermLoading(true);
    setPermError(null);
    setPermResult(null);
    try {
      const { data, error } = await client.query<
        HavePermissionQuery,
        HavePermissionQueryVariables
      >({
        query: HavePermissionDocument,
        variables: { permissionKey: key },
        fetchPolicy: "no-cache",
      });
      if (error) {
        setPermError(error.message);
        return;
      }
      setPermResult(
        typeof data?.havePermission === "boolean" ? data.havePermission : null,
      );
    } catch (e: unknown) {
      setPermError(
        e instanceof Error ? e.message : "Errore query havePermission",
      );
    } finally {
      setPermLoading(false);
    }
  }, [client, permissionKey]);

  const logout = useCallback(() => {
    clearGraphqlJwtFromStorage();
    setJwtInput("");
    setMeResult(null);
    setMeError(null);
    setPermResult(null);
    setPermError(null);
    void client.resetStore();
  }, [client]);

  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col gap-8 px-4 py-16">
      <div>
        <Link
          href="/"
          className="text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Home
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Login dev (JWT)
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Incolla un JWT valido emesso dal tuo IdP / backend. Viene salvato in{" "}
          <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-900">
            localStorage
          </code>{" "}
          con chiave{" "}
          <code className="font-mono text-xs">{BUCKET_GRAPHQL_JWT_KEY}</code>.
          Header HTTP e WebSocket subscription usano{" "}
          <code className="font-mono text-xs">Authorization: Bearer …</code>.
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Ottieni JWT (solo dev)
        </h2>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Chiama <code className="font-mono text-[11px]">POST /dev/auth/token</code> sul
          backend (attivo se <code className="font-mono text-[11px]">NODE_ENV</code> non è{" "}
          <code className="font-mono text-[11px]">production</code> e{" "}
          <code className="font-mono text-[11px]">ENABLE_DEV_JWT_ENDPOINT=true</code> nel{" "}
          <code className="font-mono text-[11px]">.env</code> del backend). Usa lo stesso{" "}
          <code className="font-mono text-[11px]">sub</code> del JWT che ti aspetti in
          GraphQL (es. <code className="font-mono text-[11px]">_id</code> utente MongoDB
          per <code className="font-mono text-[11px]">havePermission</code>). Opzionale:
          apri <code className="font-mono text-[11px]">/login?sub=…</code> per
          precompilare.
        </p>
        <label className="mt-4 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          sub (claim JWT)
        </label>
        <input
          type="text"
          value={devSub}
          onChange={(e) => {
            setDevSub(e.target.value);
            setDevTokenOk(false);
            setDevTokenError(null);
          }}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="507f1f77bcf86cd799439011"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => void fetchDevJwt()}
          disabled={devTokenLoading || !devSub.trim()}
          className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {devTokenLoading ? "Richiesta…" : "Richiedi JWT"}
        </button>
        {devTokenError && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            {devTokenError}
          </p>
        )}
        {devTokenOk && (
          <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">
            Token ricevuto e copiato nel campo sotto; puoi salvarlo o provare le query
            protette.
          </p>
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          JWT
        </label>
        <textarea
          value={jwtInput}
          onChange={(e) => setJwtInput(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="eyJhbG…"
          autoComplete="off"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void saveJwt()}
            disabled={!jwtInput.trim()}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Salva
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Logout (rimuovi token)
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Query protette
        </h2>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Richiedono JWT salvato con il pulsante sopra; resti sulla stessa pagina
          per provare subito le query.
        </p>

        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() => void runMe()}
            disabled={meLoading}
            className="inline-flex h-9 items-center rounded-lg bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {meLoading ? "me…" : "Esegui me"}
          </button>
          {meError && (
            <p className="text-sm text-red-600 dark:text-red-400">{meError}</p>
          )}
          {meResult !== null && !meError && (
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">me:</span>{" "}
              <span className="font-mono">{meResult}</span>
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Chiave permesso
          </label>
          <input
            type="text"
            value={permissionKey}
            onChange={(e) => setPermissionKey(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="es. resource:action"
          />
          <button
            type="button"
            onClick={() => void runHavePermission()}
            disabled={permLoading}
            className="mt-3 inline-flex h-9 items-center rounded-lg bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {permLoading ? "havePermission…" : "Esegui havePermission"}
          </button>
          {permError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {permError}
            </p>
          )}
          {permResult !== null && !permError && (
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">havePermission:</span>{" "}
              <span className="font-mono">{String(permResult)}</span>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
