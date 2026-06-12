# FitTrack frontend — TODO integrazioni future

Elementi presenti nel pattern FacileDoc (`.cursor/examples/`) ma **non ancora** nel frontend FitTrack. Da valutare e integrare quando serve.

---

## Formik

**Stato attuale:** i form auth usano stato React locale + `onSubmit` nativo (`login-form`, `register-form`, password reset).

**Todo:**

- [ ] Valutare Formik per form multi-step o con validazione complessa (es. workout logging, profilo utente).
- [ ] Se adottato: definire convenzione condivisa (schema Yup/Zod, errori i18n, pattern autofill con `FormData` in submit).
- [ ] Migrare gradualmente i form auth solo se Formik porta un beneficio netto rispetto al setup attuale.

**Riferimento:** pattern FacileDoc — submit con `FormData` quando l’autofill non aggiorna lo stato controllato.

---

## Chakra toast (`showToast` / `showToastPromise`)

**Stato attuale:** feedback errori inline nei componenti (es. `login_error`, alert su card hydration/workout). Nessun sistema toast globale.

**Todo:**

- [ ] Scegliere libreria toast (Chakra, Sonner già in stack shadcn, altro) allineata al design system FitTrack.
- [ ] Creare helper centralizzato (es. `showToast`, `showToastPromise`) per successo/errore async.
- [ ] Usare toast per azioni fire-and-forget (log idratazione, register ok, reset password inviato) lasciando inline gli errori di form critici se preferito.

**Riferimento:** `@/components/Toast/showToast.ts` in FacileDoc.

---

## `onGetMe` (profilo utente post-login)

**Stato attuale:** dopo login si salva solo il JWT (`setGraphqlJwtInStorage` in `authSlice`). Nessuna query `me` / profilo utente in Redux.

**Todo:**

- [ ] Verificare se il backend espone query profilo (`me`, `currentUser`, ecc.).
- [ ] Aggiungere operazione GraphQL + `requestGetMe` in `lib/graphql/Auth/`.
- [ ] Thunk `onGetMe` + stato in `authSlice` (nome, email, avatar, …).
- [ ] Chiamare `onGetMe` dopo `onLogin.fulfilled` (o in `AppProviders` se sessione già valida al reload).
- [ ] Selector per UI shell / profilo / dashboard.

**Riferimento:** `authSlice` + `requestGetMe` in FacileDoc.

---

## `writeAuthInfo` / storage auth strutturato

**Stato attuale:** solo JWT in `localStorage` via `src/lib/auth/graphql-jwt-storage.ts` (`BUCKET_GRAPHQL_JWT_KEY`).

**Todo:**

- [ ] Valutare payload auth più ricco in storage (token + scadenza + user id + claims utili alla UI).
- [ ] Introdurre API tipo `writeAuthInfo` / `getAuthInfo` / `removeAuthInfo` (wrapper sopra `graphql-jwt-storage` o sostituto).
- [ ] Allineare `makeApolloClient` / `authLink` al nuovo formato se cambiano chiavi o struttura.
- [ ] Gestire refresh sessione / logout pulito su token scaduto.

**Riferimento:** `@libs/localStorage.ts` + `constants/storageKeyList.ts` in FacileDoc.

---

## Note

- Priorità suggerita: **`onGetMe` + storage auth** (se serve profilo in app) → **toast** → **Formik** (solo se i form crescono).
- Aggiornare `frontend-new-call.md` quando uno di questi item viene implementato.
