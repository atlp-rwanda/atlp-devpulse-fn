import { gql } from "@apollo/client";

export const CREATE_CYCLE = gql`
  mutation createApplicationCycle($input: createApplicationCycle) {
    createApplicationCycle(input: $input) {
      id
      name
    }
  }
`;

export const GET_CYCLES = gql`
  query getCycle {
    getAllApplicationCycles {
      id
      name
      startDate
      endDate
    }
  }
`;

export const DELETE_CYCLE = gql`
  mutation deleteApplicationCycle($deleteApplicationCycleId: ID!) {
    deleteApplicationCycle(id: $deleteApplicationCycleId) {
      id
      name
    }
  }
`;

export const UPDATE_CYCLE = gql`
  mutation upDateCycle(
    $updateApplicationCycleId: ID!
    $input: updateApplicationCycle
  ) {
    updateApplicationCycle(id: $updateApplicationCycleId, input: $input) {
      id
      name
      startDate
    }
  }
`;
