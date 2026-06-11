import type { Messages } from "./schema";

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
