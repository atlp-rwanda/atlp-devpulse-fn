import { gql } from "@apollo/client";

export const CREATE_CYCLE = gql`
  mutation Mutation($name: String, $startDate: String, $endDate: String) {
    createApplicationCycle(
      name: $name
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`;

export const GET_CYCLES = gql`
  query getCycle {
    getAllApplicationCycles {
      name
      startDate
      endDate
    }
  }
`;
