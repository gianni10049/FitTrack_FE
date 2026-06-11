import { createTranslator } from "next-intl";
import { defaultLocale } from "./config";
import it from "./locales/it";

/** Translator for non-React code (Redux thunks, lib utilities). */
export const standaloneTranslator = createTranslator({
  locale: defaultLocale,
  messages: it,
});
