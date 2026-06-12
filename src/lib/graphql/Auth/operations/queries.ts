import { gql } from "@apollo/client";

export const RegistrationEnabled = gql`
  query RegistrationEnabled {
    registrationEnabled
  }
`;

export const Me = gql`
  query Me {
    me {
      sub
      permissions
    }
  }
`;

export const HavePermission = gql`
  query HavePermission($permissionKey: String!) {
    havePermission(permissionKey: $permissionKey)
  }
`;
