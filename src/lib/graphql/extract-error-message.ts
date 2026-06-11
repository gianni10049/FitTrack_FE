import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { standaloneTranslator as t } from "@/i18n/standalone-translator";

export function extractGraphqlErrorMessage(error: unknown): string {
  if (CombinedGraphQLErrors.is(error)) {
    const first = error.errors[0]?.message;
    if (first) {
      return first;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return t("errors.unexpected");
}
