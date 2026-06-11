import { LoginDevClient } from "./login-dev-client";

type SearchParams = Record<string, string | string[] | undefined>;

function pickSub(sp: SearchParams): string | undefined {
  const raw = sp.sub;
  if (typeof raw === "string" && raw.trim()) {
    return raw.trim();
  }
  if (Array.isArray(raw) && typeof raw[0] === "string" && raw[0].trim()) {
    return raw[0].trim();
  }
  return undefined;
}

/**
 * Server Component: `searchParams` è una Promise (Next.js 15+); va awaited qui,
 * non nel client boundary (evita "keys of searchParams were accessed directly").
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return <LoginDevClient initialSub={pickSub(sp)} />;
}
