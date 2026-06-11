import { getTranslations } from "next-intl/server";
import { AppPlaceholder } from "@/components/app-shell/app-placeholder";

export default async function WorkoutPage() {
  const t = await getTranslations("navigation");

  return <AppPlaceholder title={t("workout")} />;
}
