"use client";

import { useTranslations } from "next-intl";
import { MOCK_DASHBOARD } from "@/features/dashboard/data/mock-dashboard";
import { MaterialIcon } from "@/components/app-shell/material-icon";
import { HydrationCard } from "@/features/hydration/components/hydration-card";
import { WorkoutCard } from "@/features/workout/components/workout-card";

export function DashboardPage() {
  const t = useTranslations();
  const { nextMeal, insights } = MOCK_DASHBOARD;

  return (
    <div className="space-y-8 pb-8">
      <section className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="ft-glass-card relative flex flex-col justify-center overflow-hidden rounded-xl p-6 py-8 md:col-span-7">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ft-on-surface-variant)]">
                  {t(`dashboard.${nextMeal.labelKey}`)}
                </p>
                <p className="mt-2 font-[family-name:var(--font-montserrat)] text-xl font-semibold text-[var(--ft-on-surface)]">
                  {t(`dashboard.${nextMeal.titleKey}`)}
                </p>
              </div>
              <MaterialIcon
                name="restaurant"
                className="text-[var(--ft-primary-fixed)]"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--ft-primary-fixed)]/20 bg-[var(--ft-primary-fixed)]/10 p-3">
              <MaterialIcon
                name="pill"
                className="text-[20px] text-[var(--ft-primary-fixed)]"
              />
              <p className="text-sm font-medium text-[var(--ft-primary-fixed)]">
                {t(`dashboard.${nextMeal.supplementsKey}`)}
              </p>
            </div>
          </div>
        </div>

        <HydrationCard />
      </section>

      <WorkoutCard />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {insights.map((insight) => (
          <div key={insight.id} className="ft-glass-card rounded-xl p-4">
            <p className="text-xs font-semibold uppercase text-[var(--ft-on-surface-variant)]">
              {t(`dashboard.insights.${insight.labelKey}`)}
            </p>
            <p className="mt-1 font-[family-name:var(--font-montserrat)] text-xl font-semibold text-[var(--ft-on-surface)]">
              {t(`dashboard.mock.${insight.valueKey}`)}
            </p>
            {"progress" in insight && insight.progress != null ? (
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--ft-surface-container-high)]">
                <div
                  className={`h-full ${
                    insight.accent === "secondary"
                      ? "bg-[var(--ft-secondary-container)]"
                      : "bg-[var(--ft-primary-fixed)]"
                  }`}
                  style={{ width: `${insight.progress}%` }}
                />
              </div>
            ) : null}
            {"deltaKey" in insight && insight.deltaKey ? (
              <p
                className={`mt-1 text-xs font-semibold ${
                  insight.deltaTone === "error"
                    ? "text-[var(--ft-error)]"
                    : "text-[var(--ft-primary-fixed)]"
                }`}
              >
                {t(
                  insight.deltaKey === "personalBest"
                    ? "dashboard.insights.personalBest"
                    : `dashboard.mock.${insight.deltaKey}`,
                )}
              </p>
            ) : null}
          </div>
        ))}
      </section>
    </div>
  );
}
