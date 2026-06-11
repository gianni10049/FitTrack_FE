"use client";

import { useSubscription } from "@apollo/client/react";
import { useEffect } from "react";
import {
  CounterUpdatedDocument,
  type CounterUpdatedSubscription,
  useDemoGraphql,
} from "@/features/graphql-smoke";

export function GraphqlSmokeDemo() {
  const {
    hello,
    helloStatus,
    helloError,
    bumpStatus,
    bumpError,
    subscriptionCounter,
    requestBump,
    setSubscriptionCounter,
  } = useDemoGraphql();

  const {
    data: subData,
    loading: subLoading,
    error: subError,
  } = useSubscription<CounterUpdatedSubscription>(CounterUpdatedDocument);

  useEffect(() => {
    if (typeof subData?.counterUpdated === "number") {
      setSubscriptionCounter(subData.counterUpdated);
    }
  }, [subData?.counterUpdated, setSubscriptionCounter]);

  return (
    <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 text-left shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        GraphQL + Redux (thunk) + subscription
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Query/mutation tramite{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">
          createAppAsyncThunk
        </code>{" "}
        e Apollo in <code className="font-mono text-xs">extra</code>; subscription
        sincronizza lo store.
      </p>

      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-zinc-700 dark:text-zinc-300">
            Query <code className="font-mono text-xs">hello</code> (Redux)
          </dt>
          <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
            {helloStatus === "loading" && "Caricamento…"}
            {helloStatus === "failed" && helloError}
            {helloStatus === "idle" && hello}
          </dd>
        </div>

        <div>
          <dt className="font-medium text-zinc-700 dark:text-zinc-300">
            Subscription <code className="font-mono text-xs">counterUpdated</code>
          </dt>
          <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
            {subLoading && "In ascolto…"}
            {subError && `Errore: ${subError.message}`}
            {!subLoading && !subError && (
              <>
                Valore:{" "}
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {subscriptionCounter ?? subData?.counterUpdated ?? "—"}
                </span>
              </>
            )}
          </dd>
        </div>

        {bumpError && (
          <p className="text-sm text-red-600 dark:text-red-400">{bumpError}</p>
        )}
      </dl>

      <button
        type="button"
        onClick={() => void requestBump()}
        disabled={bumpStatus === "loading"}
        className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {bumpStatus === "loading" ? "Invio…" : "Mutation bumpCounter (thunk)"}
      </button>
    </section>
  );
}
