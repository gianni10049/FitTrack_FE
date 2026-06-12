import type { WorkoutTemplateGql } from "@/lib/graphql/graphql";
import { makeApolloClient } from "@/lib/graphql/make-apollo-client";
import { TodayWorkoutTemplate } from "./operations/queries";

export async function requestTodayWorkoutTemplate(): Promise<WorkoutTemplateGql | null> {
  const { data } = await makeApolloClient().query<{
    todayWorkoutTemplate?: WorkoutTemplateGql | null;
  }>({
    query: TodayWorkoutTemplate,
    fetchPolicy: "network-only",
  });
  return data?.todayWorkoutTemplate ?? null;
}
