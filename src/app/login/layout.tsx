import type { Metadata } from "next";
import { publicEnv } from "@/lib/config/public-env";

export const metadata: Metadata = {
  title: `Login dev — ${publicEnv.appName}`,
  description: "Incolla JWT per provare query protette (me, havePermission).",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
