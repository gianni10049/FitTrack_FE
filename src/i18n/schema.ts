import type it from "./locales/it";

/** Shape of all translation messages — derived from the default locale file. */
export type Messages = typeof it;

export type MessageNamespace = keyof Messages;
