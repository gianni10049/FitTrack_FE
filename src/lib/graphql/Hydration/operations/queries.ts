import { gql } from "@apollo/client";

export const MyWaterIntakeToday = gql`
  query MyWaterIntakeToday {
    myWaterIntakeToday {
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

export const MyWaterIntakeHistory = gql`
  query MyWaterIntakeHistory($limit: Int, $fromDay: String, $toDay: String) {
    myWaterIntakeHistory(limit: $limit, fromDay: $fromDay, toDay: $toDay) {
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
