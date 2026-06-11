import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./config";

export default getRequestConfig(async () => {
  const messages = (await import(`./locales/${defaultLocale}`)).default;

  return {
    locale: defaultLocale,
    messages,
  };
});
