---
description: Come aggiungere una nuova chiamata GraphQL nel frontend FitTrack (operazioni gql, codegen tipi, request*, Redux thunk, UI).
globs:
  - frontend/src/**/*
  - frontend/src/lib/graphql/**/*
  - frontend/src/lib/redux/**/*
---

# Nuova chiamata GraphQL nel frontend FitTrack

Questa guida descrive il flusso **attuale** del repo frontend FitTrack:

1. operazioni GraphQL in **TypeScript** (`gql`) per dominio;
2. **codegen** che rigenera solo i **tipi** dallo schema backend;
3. funzioni **`request*`** su **`makeApolloClient`**;
4. **Redux Toolkit** con `createAppAsyncThunk` (thunk sottili → `request*`);
5. UI con **`useAppDispatch`** / **`useAppSelector`**.

Riferimento storico del pattern: `.cursor/examples/graphql/` e `.cursor/examples/redux/` (progetto FacileDoc).

---

## Struttura attuale per dominio

| Layer | Path | Domini presenti |
|-------|------|-----------------|
| Operazioni `gql` | `src/lib/graphql/<Dominio>/operations/` | `Auth`, `Hydration`, `Workout` |
| Chiamate imperative | `src/lib/graphql/<Dominio>/*Requests.ts` | `authRequests.ts`, `hydrationRequests.ts`, `workoutRequests.ts` |
| Tipi schema | `src/lib/graphql/graphql.ts` | generato |
| Redux slice | `src/lib/redux/slices/<Dominio>/` | `Auth`, `Hydration`, `Workout`, `modal` |
| UI feature | `src/features/<dominio>/components/` | es. `hydration-card`, `workout-card` |
| UI auth | `src/features/auth/components/` | login, register, password reset |

**Non usare** il vecchio flusso `src/graphql/*.graphql` → `src/generated/graphql.ts` con `*Document`: è stato sostituito dal pattern sopra.

---

## 1. Operazione GraphQL

Aggiungi query/mutation nel dominio sotto **`frontend/src/lib/graphql/<Dominio>/operations/`**:

- `queries.ts` — query
- `mutations.ts` — mutation

Convenzioni FitTrack:

- import `gql` da `@apollo/client`;
- nome operazione = nome campo root GraphQL in PascalCase (es. `MyWaterIntakeToday`, `LogWaterIntake`, `TodayWorkoutTemplate`);
- variabili: **`$input: XxxInput!`** per le mutation auth/hydration (allineato allo schema Nest).

Esempio query (`Workout/operations/queries.ts`):

```ts
import { gql } from "@apollo/client";

export const TodayWorkoutTemplate = gql`
  query TodayWorkoutTemplate {
    todayWorkoutTemplate {
      id
      title
      exercises {
        name
        targetSets
        restSeconds
      }
    }
  }
`;
```

Esempio mutation (`Hydration/operations/mutations.ts`):

```ts
import { gql } from "@apollo/client";

export const LogWaterIntake = gql`
  mutation LogWaterIntake($input: LogWaterIntakeInput!) {
    logWaterIntake(input: $input) {
      id
      day
      totalMl
      targetMl
    }
  }
`;
```

Esporta le `request*` dal barrel del dominio (`src/lib/graphql/<Dominio>/index.ts`) se servono fuori dal modulo Redux.

---

## 2. Codegen (solo tipi + schema AST)

- Config: **`frontend/codegen.ts`**
- Backend in esecuzione (default **`http://127.0.0.1:4000/graphql`**) oppure override:

  ```bash
  CODEGEN_GRAPHQL_SCHEMA_URL=http://127.0.0.1:4000/graphql yarn codegen
  ```

- Dalla cartella **`frontend/`**:

  ```bash
  yarn codegen
  ```

Output:

- **`src/lib/graphql/graphql.ts`** — tipi TypeScript (`Query`, `Mutation`, `XxxInput`, `XxxGql`, …)
- **`src/lib/graphql/project_schema.graphql`** — dump AST dello schema (riferimento)

Il codegen **non** genera `TypedDocumentNode` / `*Document`: le stringhe `gql` restano in `operations/*.ts`.

Dopo ogni cambio allo **schema backend**, rigenera `graphql.ts` prima di usare nuovi tipi o campi.

---

## 3. Chiamata al backend: `request*`

Pattern consigliato per Redux, hook feature e codice non-React.

1. Crea o estendi **`src/lib/graphql/<Dominio>/<dominio>Requests.ts`**
2. Importa **`makeApolloClient`** da `@/lib/graphql/make-apollo-client`
3. Importa tipi da `@/lib/graphql/graphql`
4. Usa **`client.query`** / **`client.mutate`** con:
   - documento da `operations/*.ts`;
   - tipi generici espliciti su risposta e `variables`;
   - **`fetchPolicy: "network-only"`** per query e mutation;
   - **`errorPolicy: "all"`** sulle mutation se devi leggere errori GraphQL e fare `throw result.error` (vedi auth).

Esempio query (`hydrationRequests.ts`):

```ts
import type { WaterIntakeDayGql } from "@/lib/graphql/graphql";
import { makeApolloClient } from "@/lib/graphql/make-apollo-client";
import { MyWaterIntakeToday } from "./operations/queries";

export async function requestMyWaterIntakeToday(): Promise<WaterIntakeDayGql | null> {
  const { data } = await makeApolloClient().query<{
    myWaterIntakeToday: WaterIntakeDayGql;
  }>({
    query: MyWaterIntakeToday,
    fetchPolicy: "network-only",
  });
  return data?.myWaterIntakeToday ?? null;
}
```

Esempio mutation con errori (`authRequests.ts`):

```ts
const result = await makeApolloClient().mutate<
  { login: AuthTokenPayload },
  MutationLoginArgs
>({
  mutation: Login,
  variables: { input },
  fetchPolicy: "network-only",
  errorPolicy: "all",
});
if (result.error) {
  throw result.error;
}
return result.data?.login ?? null;
```

### Cache Apollo (caso avanzato)

Se una mutation deve aggiornare la cache senza refetch completo, la logica resta nel `request*` o in helper di feature — es. `updateHydrationCacheAfterLog` chiamato da `requestLogWaterIntake` dopo `logWaterIntake`.

### Alternativa UI-only (senza slice)

Hook **`useQuery`** / **`useMutation`** in:

- `src/lib/graphql/use-query.ts`
- `src/lib/graphql/use-mutation.ts`

Usali solo per schermate semplici **senza** stato Redux condiviso. Le feature dashboard (hydration, workout) usano Redux.

---

## 4. Redux (`createAppAsyncThunk`)

### Regole

1. **`createAppAsyncThunk`** da `@/lib/redux/create-app-async-thunk` (`rejectValue: string`)
2. Il thunk chiama **`request*`** — **non** passare `apolloClient` nello store (`ThunkExtra` rimosso)
3. Errori: `try/catch` + **`rejectWithValue`** con `extractGraphqlErrorMessage` (vedi `Hydration/thunks.ts`, `Auth/thunks.ts`)

### Struttura slice (`src/lib/redux/slices/<Dominio>/`)

| File | Ruolo |
|------|--------|
| `thunks.ts` | `onXxx` → delega a `requestXxx` |
| `<dominio>Slice.ts` | `extraReducers` per `pending` / `fulfilled` / `rejected` |
| `selectors.ts` | selector su loading, dati, errori |
| `index.ts` | export pubblici (+ alias opzionali, es. `logWaterIntake`) |

Naming stato slice: **snake_case** con prefisso operazione, es. `my_water_intake_today_status`, `today_workout_template`.

Esempio thunk:

```ts
export const onTodayWorkoutTemplate = createAppAsyncThunk(
  "workout/todayWorkoutTemplate",
  async (_, { rejectWithValue }) => {
    try {
      return await requestTodayWorkoutTemplate();
    } catch (error: unknown) {
      return rejectWithValue(
        rejectMessage(error, "Impossibile caricare il workout di oggi."),
      );
    }
  },
);
```

### Registrazione

1. Aggiungi il reducer in **`src/lib/redux/root-reducer.ts`**
2. Esporta dal barrel **`src/lib/redux/slices/index.ts`**
3. Re-esporta da **`src/lib/redux/index.ts`** ciò che serve alla UI

Slice attuali: `auth`, `hydration`, `workout`, `modal`.

### Auth — eccezione JWT

Il JWT **non** va salvato nel thunk. Su `onLogin.fulfilled`, **`authSlice`** chiama `setGraphqlJwtInStorage` (`src/lib/auth/graphql-jwt-storage.ts`). Il client Apollo legge il token da lì tramite `createBrowserApolloClient`.

Tutte le operazioni auth (`onLogin`, `onRegister`, password reset) hanno `extraReducers` dedicati e selector (`selectRegisterLoading`, `selectRequestPasswordResetError`, …). Il JWT si salva solo su `onLogin.fulfilled` in `authSlice`.

---

## 5. UI (componenti e hook feature)

### Pattern base

```tsx
"use client";

import { useEffect } from "react";
import { onTodayWorkoutTemplate, selectTodayWorkoutTemplate, selectTodayWorkoutTemplateLoading } from "@/lib/redux";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export function WorkoutCard() {
  const dispatch = useAppDispatch();
  const template = useAppSelector(selectTodayWorkoutTemplate);
  const loading = useAppSelector(selectTodayWorkoutTemplateLoading);

  useEffect(() => {
    void dispatch(onTodayWorkoutTemplate());
  }, [dispatch]);

  // ...
}
```

### Dove mettere la logica

| Tipo | Path |
|------|------|
| Componente presentazionale / pagina | `src/features/<dominio>/components/` |
| Hook che compone dispatch + selector + derived state | `src/features/<dominio>/hooks/` (es. `use-hydration-detail.ts`) |
| Auth (login, register, reset) | `src/features/auth/components/` |
| Utility pure (merge dati, label, stime) | `src/features/<dominio>/lib/` |

### Dispatch e risultato

- **Stato condiviso** (loading/error/dati): preferisci **selector** sullo slice (`hydration-card`, `login-form`).
- **Flusso one-shot** (register → redirect): `dispatch(onRegister(...))` + `.fulfilled.match(result)` nel componente.
- **`unwrap()`**: opzionale, equivalente al pattern `.fulfilled.match`.

### Variabili GraphQL

Evita `undefined` nelle `variables` se il backend si aspetta chiavi presenti: usa stringhe trimmate o default espliciti (vedi `onLogin` che fa `email.trim()`).

---

## 6. Apollo client e provider

- **`AppProviders`** (`src/components/app-providers.tsx`) crea il client browser e lo registra con **`registerApolloClient`**
- **`makeApolloClient()`** restituisce quel singleton — usato da tutti i `request*`
- Non chiamare `makeApolloClient` prima del mount di `AppProviders` (SSR / test: mockare o registrare un client)

---

## 7. Domini già implementati (riferimento rapido)

### Auth

- GraphQL: `src/lib/graphql/Auth/`
- Redux: `src/lib/redux/slices/Auth/` — `onLogin`, `onRegister`, `onRequestPasswordReset`, …
- UI: `src/features/auth/components/login-form.tsx`, …

### Hydration

- GraphQL: `src/lib/graphql/Hydration/`
- Redux: `src/lib/redux/slices/Hydration/` — `onMyWaterIntakeToday`, `onMyWaterIntakeHistory`, `onLogWaterIntake`
- UI: `hydration-card.tsx`, `hydration-detail-page.tsx` + hook `use-hydration-detail.ts`

### Workout

- GraphQL: `src/lib/graphql/Workout/`
- Redux: `src/lib/redux/slices/Workout/` — `onTodayWorkoutTemplate`
- UI: `workout-card.tsx`

---

## 8. Backend (promemoria)

Gli input GraphQL Nest con **`ValidationPipe({ whitelist: true })`** devono avere **`class-validator`** sui campi DTO, altrimenti le proprietà possono essere strip e il resolver riceve input incompleti.

---

## Checklist — nuova chiamata end-to-end

1. [ ] Operazione in `src/lib/graphql/<Dominio>/operations/*.ts`
2. [ ] Backend su `:4000` (o `CODEGEN_GRAPHQL_SCHEMA_URL`) + `yarn codegen` in **`frontend/`**
3. [ ] `request*` in `*Requests.ts` con `makeApolloClient`
4. [ ] Thunk in `src/lib/redux/slices/<Dominio>/thunks.ts` → `request*`
5. [ ] `extraReducers` + selector in slice
6. [ ] Registrazione in `root-reducer.ts` + export da `lib/redux`
7. [ ] UI: `useAppDispatch` / `useAppSelector` (o hook feature sopra lo slice)
8. [ ] Nessun import da `@/generated/graphql` o `useQuery(*Document)` legacy

---

## Uso in Cursor

- **@ menziona** questo file quando aggiungi endpoint GraphQL o slice Redux.
- Per regole persistenti, copia il frontmatter in **`.cursor/rules/`** come file `.mdc`.
