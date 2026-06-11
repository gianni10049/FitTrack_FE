"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AppLocale } from "@/i18n/config";
import {
  buildHydrationTrendChartData,
  formatHydrationTrendAverage,
  type HydrationTrendSourceDay,
} from "@/features/hydration/lib/hydration-trend-data";
import { mlToLitersLabel } from "@/features/hydration/lib/hydration-display";

interface HydrationTrendChartProps {
  items: HydrationTrendSourceDay[];
  targetMl: number;
  loading?: boolean;
  locale: AppLocale;
}

export function HydrationTrendChart({
  items,
  targetMl,
  loading,
  locale,
}: HydrationTrendChartProps) {
  const t = useTranslations();
  const intakeLabel = t("hydration.trend.intake");

  const chartConfig = useMemo(
    () =>
      ({
        liters: {
          label: intakeLabel,
          color: "var(--ft-primary-fixed)",
        },
      }) satisfies ChartConfig,
    [intakeLabel],
  );

  const { days, averageLiters, targetLiters, yDomain } =
    buildHydrationTrendChartData(items, targetMl, locale);

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-[var(--ft-on-surface)]">
          {t("hydration.trend.title")}
        </h2>
        {!loading && days.length > 0 ? (
          <span className="text-xs font-semibold text-[var(--ft-primary-fixed)]">
            {t("hydration.trend.average", {
              value: formatHydrationTrendAverage(averageLiters),
            })}
          </span>
        ) : null}
      </div>
      <div className="ft-glass-card rounded-xl p-6">
        <p className="mb-3 text-xs text-[var(--ft-on-surface-variant)]">
          {t("hydration.trend.targetLine", {
            target: mlToLitersLabel(targetMl),
          })}
        </p>
        {loading ? (
          <p className="flex h-32 items-center justify-center text-sm text-[var(--ft-on-surface-variant)]">
            {t("hydration.trend.loading")}
          </p>
        ) : days.length === 0 ? (
          <p className="flex h-32 items-center justify-center text-sm text-[var(--ft-on-surface-variant)]">
            {t("hydration.trend.empty")}
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-32 w-full [&_.recharts-cartesian-axis-tick_text]:fill-[var(--ft-on-surface-variant)]"
            initialDimension={{ width: 320, height: 128 }}
          >
            <LineChart
              data={days}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={28}
                tick={{ fill: "var(--ft-on-surface-variant)", fontSize: 10 }}
              />
              <YAxis hide domain={yDomain} />
              <ChartTooltip
                cursor={{
                  stroke: "var(--ft-outline-variant)",
                  strokeDasharray: "4 4",
                }}
                content={
                  <ChartTooltipContent
                    className="border-[var(--ft-outline-variant)]/50 bg-[var(--ft-surface-container-high)] text-[var(--ft-on-surface)]"
                    formatter={(value) => [
                      t("common.litersUnit", { value: String(value) }),
                      intakeLabel,
                    ]}
                  />
                }
              />
              <ReferenceLine
                y={targetLiters}
                stroke="var(--ft-outline-variant)"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <Line
                dataKey="liters"
                type="monotone"
                stroke="var(--color-liters)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-liters)",
                  r: 3,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "var(--color-liters)",
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </div>
    </section>
  );
}
