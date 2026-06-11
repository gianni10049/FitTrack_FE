import Link from "next/link";
import { GraphqlSmokeDemo } from "@/features/graphql-smoke";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Frontend bucket
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Base generica con Apollo, Redux, host modale e smoke GraphQL allineato al
          backend di riferimento (<code className="font-mono text-xs">hello</code>
          , <code className="font-mono text-xs">bumpCounter</code>
          , subscription).
        </p>
        <p className="mt-4">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            Login dev (JWT)
          </Link>
        </p>
      </div>
      <GraphqlSmokeDemo />
    </main>
  );
}
