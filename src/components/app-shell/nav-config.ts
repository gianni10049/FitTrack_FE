export type NavLabelKey = "dashboard" | "workout" | "diet" | "profile";

export interface AppNavItem {
  id: string;
  labelKey: NavLabelKey;
  icon: string;
  href: string;
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    id: "dashboard",
    labelKey: "dashboard",
    icon: "dashboard",
    href: "/dashboard",
  },
  {
    id: "workout",
    labelKey: "workout",
    icon: "fitness_center",
    href: "/workout",
  },
  {
    id: "diet",
    labelKey: "diet",
    icon: "restaurant",
    href: "/diet",
  },
  {
    id: "profile",
    labelKey: "profile",
    icon: "person",
    href: "/profile",
  },
];
