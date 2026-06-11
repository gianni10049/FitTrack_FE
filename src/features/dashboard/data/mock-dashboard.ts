export const MOCK_DASHBOARD = {
  nextMeal: {
    labelKey: "nextMeal.label" as const,
    titleKey: "nextMeal.title" as const,
    supplementsKey: "nextMeal.supplements" as const,
  },
  insights: [
    {
      id: "sleep",
      labelKey: "sleep" as const,
      valueKey: "sleepValue" as const,
      progress: 85,
      accent: "secondary" as const,
    },
    {
      id: "steps",
      labelKey: "steps" as const,
      valueKey: "stepsValue" as const,
      progress: 65,
      accent: "primary" as const,
    },
    {
      id: "weight",
      labelKey: "weight" as const,
      valueKey: "weightValue" as const,
      deltaKey: "weightDelta" as const,
      deltaTone: "error" as const,
    },
    {
      id: "streak",
      labelKey: "streak" as const,
      valueKey: "streakValue" as const,
      deltaKey: "personalBest" as const,
      deltaTone: "primary" as const,
    },
  ],
};
