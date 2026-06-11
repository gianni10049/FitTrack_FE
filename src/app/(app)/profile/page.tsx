import { getTranslations } from "next-intl/server";
import { AppPlaceholder } from "@/components/app-shell/app-placeholder";

export default async function ProfilePage() {
  const t = await getTranslations("navigation");

  return <AppPlaceholder title={t("profile")} />;
}
