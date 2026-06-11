/** Rough session length from sets, rest and fixed work time per set. */
const SECONDS_PER_WORKING_SET = 45;
const WARMUP_BUFFER_MIN = 5;

export function estimateWorkoutDurationMin(
  exercises: ReadonlyArray<{ targetSets: number; restSeconds: number }>,
): number {
  if (exercises.length === 0) {
    return 0;
  }

  const totalSeconds = exercises.reduce((acc, exercise) => {
    const sets = Math.max(exercise.targetSets, 0);
    const workSeconds = sets * SECONDS_PER_WORKING_SET;
    const restSeconds = Math.max(sets - 1, 0) * exercise.restSeconds;
    return acc + workSeconds + restSeconds;
  }, 0);

  return WARMUP_BUFFER_MIN + Math.round(totalSeconds / 60);
}
