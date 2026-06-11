"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MaterialIcon } from "@/components/app-shell/material-icon";
import { TodayWorkoutTemplateDocument } from "@/generated/graphql";
import { extractGraphqlErrorMessage } from "@/lib/graphql/extract-error-message";
import { estimateWorkoutDurationMin } from "@/features/workout/lib/estimate-workout-duration";

export function WorkoutCard() {
  const t = useTranslations();
  const { data, loading, error } = useQuery(TodayWorkoutTemplateDocument, {
    fetchPolicy: "network-only",
  });

  const template = data?.todayWorkoutTemplate;
  const isRestDay = !loading && !error && !template;
  const durationMin = template
    ? estimateWorkoutDurationMin(template.exercises)
    : 0;
  const exerciseCount = template?.exercises.length ?? 0;

  return (
    <div className="ft-glass-card flex flex-col justify-between rounded-xl p-6">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-[var(--ft-on-surface)]">
              {t("dashboard.workout.sectionTitle")}
            </h3>
            <button
              type="button"
              className="text-xs font-semibold text-[var(--ft-primary-fixed)] hover:underline"
            >
              {t("dashboard.workout.viewHistory")}
            </button>
          </div>
          <MaterialIcon
            name={isRestDay ? "self_improvement" : "fitness_center"}
            className="shrink-0 text-[var(--ft-secondary-container)]"
          />
        </div>
        <p className="mt-1 text-sm text-[var(--ft-on-surface-variant)]">
          {loading && !template
            ? t("common.loading")
            : isRestDay
              ? t("dashboard.workout.rest.title")
              : template?.title}
        </p>
      </div>

      {error ? (
        <p
          role="alert"
          className="my-8 rounded-lg border border-[var(--ft-error)]/30 bg-[var(--ft-error-container)]/20 px-3 py-2 text-sm text-[var(--ft-error)]"
        >
          {extractGraphqlErrorMessage(error)}
        </p>
      ) : isRestDay ? (
        <div className="my-8 flex items-center gap-3 rounded-xl border border-[var(--ft-outline-variant)]/30 bg-[var(--ft-surface-container-high)]/20 p-4">
          <MaterialIcon
            name="nightlight"
            className="text-[var(--ft-secondary-container)]"
          />
          <p className="text-sm text-[var(--ft-on-surface-variant)]">
            {t("dashboard.workout.rest.description")}
          </p>
        </div>
      ) : template ? (
        <div className="my-8 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-[var(--ft-outline-variant)]/30 bg-[var(--ft-surface-container-high)]/20 p-4">
            <MaterialIcon
              name="timer"
              className="text-[var(--ft-secondary-container)]"
            />
            <div>
              <p className="text-xs text-[var(--ft-on-surface-variant)]">
                {t("dashboard.workout.durationLabel")}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-[var(--ft-on-surface)]">
                {t("dashboard.workout.duration", {
                  minutes: String(durationMin),
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-[var(--ft-outline-variant)]/30 bg-[var(--ft-surface-container-high)]/20 p-4">
            <MaterialIcon
              name="format_list_numbered"
              className="text-[var(--ft-secondary-container)]"
            />
            <div>
              <p className="text-xs text-[var(--ft-on-surface-variant)]">
                {t("dashboard.workout.exercisesLabel")}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-[var(--ft-on-surface)]">
                {t("dashboard.workout.exercisesCount", {
                  count: String(exerciseCount),
                })}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-8 h-[88px]" aria-hidden />
      )}

      {isRestDay ? (
        <button
          type="button"
          disabled
          className="w-full cursor-default rounded-xl border border-[var(--ft-outline-variant)]/40 bg-[var(--ft-surface-container-high)]/30 py-4 font-[family-name:var(--font-montserrat)] text-base font-semibold text-[var(--ft-on-surface-variant)]"
        >
          {t("dashboard.workout.rest.cta")}
        </button>
      ) : (
        <Link
          href="/workout"
          className={`block w-full rounded-xl bg-[var(--ft-primary-fixed)] py-4 text-center font-[family-name:var(--font-montserrat)] text-base font-semibold text-[var(--ft-on-primary-fixed)] shadow-[0_10px_30px_rgba(195,244,0,0.3)] transition-transform hover:brightness-105 active:scale-95 ${
            loading || !template ? "pointer-events-none opacity-60" : ""
          }`}
          aria-disabled={loading || !template}
          tabIndex={loading || !template ? -1 : 0}
        >
          {t("dashboard.workout.start")}
        </Link>
      )}
    </div>
  );
}
