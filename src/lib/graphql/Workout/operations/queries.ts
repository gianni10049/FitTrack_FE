import { gql } from "@apollo/client";

export const TodayWorkoutTemplate = gql`
  query TodayWorkoutTemplate {
    todayWorkoutTemplate {
      id
      programName
      code
      title
      dayOfWeek
      sortOrder
      exercises {
        order
        name
        targetMuscle
        targetSets
        targetReps
        restSeconds
      }
    }
  }
`;
