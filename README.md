# frontend-bucket

Template **Next.js** (App Router): **Apollo Client** (HTTP + WebSocket), **Redux Toolkit** con thunk e `apolloClient` in `extra`, host **modali** (Radix Dialog), **TooltipProvider**, smoke GraphQL (`hello`, `bumpCounter`, `counterUpdated`) in `features/graphql-smoke`, pagina dev **`/login`** per incollare un JWT e provare `me` / `havePermission`. Nessun dominio applicativo oltre a questo scaffolding.

Il frontend e il backend sono trattati come **progetti separati**; il contratto è lo **schema GraphQL** dell’API. Il codegen usa **introspection** sull’endpoint HTTP (default `http://127.0.0.1:4000/graphql`): avvia il backend prima di `yarn codegen`. In CI imposta `CODEGEN_GRAPHQL_SCHEMA_URL` verso l’API già raggiungibile.

## Struttura

- `src/app/` — layout root, `globals.css` (Tailwind v4), home, `/login`.
- `src/components/` — `app-providers`, `modal/`, `ui/` (dialog, tooltip).
- `src/features/graphql-smoke/` — demo GraphQL + slice Redux `demo` (thunk + subscription).
- `src/graphql/*.graphql` — documenti usati da **GraphQL Codegen**.
- `src/generated/graphql.ts` — tipi + `*Document` generati (rigenerare dopo cambi schema).
- `src/lib/config/public-env.ts` — URL GraphQL e nome app da env pubbliche.
- `src/lib/auth/graphql-jwt-storage.ts` — chiave `localStorage` `bucket_graphql_jwt` (HTTP Bearer + WS `connectionParams`).
- `src/lib/apollo-client.ts` — `errorLink` (dev), `authLink`, split HTTP / WS.
- `src/lib/redux/` — store, `modal` slice, infra thunk.

## Prerequisiti

- Node 22+ (come il Dockerfile)
- Backend GraphQL in ascolto per la smoke (es. `http://localhost:4000/graphql`)
- **Redis** lato backend se vuoi che la subscription `counterUpdated` funzioni (vedi `backend/docker-compose.yml` del backend di riferimento)

## Setup

```bash
cd frontend
cp .env.example .env.local
yarn install
yarn graphql:codegen
yarn build
yarn start:dev
```

- App: `http://localhost:3000` (default Next)

La pagina **`/login`** include, sopra al campo JWT manuale, una sezione **Ottieni JWT (solo dev)** che chiama `POST /dev/auth/token` sul backend (stesso `JWT_SECRET` degli e2e). Il backend espone la route solo fuori da `production` e se `ENABLE_DEV_JWT_ENDPOINT=true` (vedi `.env.example` del backend).
- Backend tipico: `http://localhost:4000` — il **CORS** del Nest deve includere l’origine del frontend (`FRONTEND_ORIGIN` / `FRONTEND_ORIGINS` nel `.env` del backend, default spesso `http://localhost:3000`), con `credentials: true` se usi cookie oltre al Bearer.

Se Turbopack ha problemi di resolve:

```bash
yarn start:dev:webpack
```

## GraphQL Codegen

Dopo ogni modifica allo schema API:

```bash
yarn graphql:codegen
```

Config: [`codegen.ts`](codegen.ts) — `schema` via URL (introspection); `documents` in `src/graphql/**/*.graphql`. Output: [`src/generated/graphql.ts`](src/generated/graphql.ts).

## Variabili ambiente

| Variabile | Ruolo |
|-----------|--------|
| `NEXT_PUBLIC_GRAPHQL_HTTP_URL` | Endpoint HTTP GraphQL (default `http://localhost:4000/graphql`) |
| `NEXT_PUBLIC_GRAPHQL_WS_URL` | WebSocket subscription (default `ws://localhost:4000/graphql`) |
| `NEXT_PUBLIC_APP_NAME` | Titolo/metadata (default `App starter`) |
| `NEXT_PUBLIC_GRAPHQL_DEBUG_ERRORS` | In development, `0` disattiva il log in console dell’`errorLink` Apollo |

JWT (solo dev UI): salvato in `localStorage` come `bucket_graphql_jwt`; Apollo invia `Authorization: Bearer <token>` sulle richieste HTTP e nelle `connectionParams` del WebSocket quando il token è presente. Le operazioni pubbliche (`hello`, `bumpCounter`, `counterUpdated`) restano utilizzabili senza token.

Per build Docker in produzione, valorizza le chiavi `NEXT_PUBLIC_*` in `.env.production`.

## Docker

Immagine multi-stage **standalone**:

```bash
docker build -t frontend-bucket:local .
```

Deploy multi-arch (richiede `.env.production` e `docker buildx`):

```bash
export DOCKER_IMAGE=your-registry/frontend-bucket:prod
yarn docker-deploy:prod
```

## Lint

```bash
yarn lint
```
