import { gql } from "@apollo/client";

export const LogWaterIntake = gql`
  mutation LogWaterIntake($input: LogWaterIntakeInput!) {
    logWaterIntake(input: $input) {
      id
      day
      totalMl
      targetMl
      createdAt
      entries {
        amountMl
        recordedAt
      }
      updatedAt
    }
  }
`;
