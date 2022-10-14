import creator from "./creator";
import { GET_CYCLES, CREATE_CYCLES, UPDATE_CYCLE, DELETE_CYCLE } from "..";
import axios from "axios";

export const getAllCycles = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: "http://localhost:4000/",
      method: "post",
      data: {
        query: `
        query getCycle {
          getAllApplicationCycles {
            id
            name
            startDate
            endDate
          }
        }
      `,
      },
    });
    const cycles = await datas.data.data.getAllApplicationCycles;
    dispatch(creator(GET_CYCLES, cycles));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const createCycle =
  ({ name, startDate, endDate }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `
        mutation createApplicationCycle($input: createApplicationCycle) {
            createApplicationCycle(input: $input) {
                id
                name
            }
        }`,
          variables: {
            input: {
              name,
              startDate,
              endDate,
            },
          },
        },
      });
      const response = await datas.data.data.createApplicationCycle;
      dispatch(creator(CREATE_CYCLES, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const updateApplicationCycle =
  ({ updateApplicationCycleId, name, startDate, endDate, id }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `
          mutation upDateCycle(
            $updateApplicationCycleId: ID!
            $input: updateApplicationCycle
            ) {
            updateApplicationCycle(id: $updateApplicationCycleId, input: $input) {
                id
                name
                startDate
                }
            }`,
          variables: {
            updateApplicationCycleId,
            input: {
              name,
              startDate,
              endDate,
              id,
            },
          },
        },
      });

      const response = await datas.data.data.updateApplicationCycle;
      dispatch(creator(DELETE_CYCLE, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const deleteApplicationCycle =
  ({ deleteApplicationCycleId }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `
            mutation Mutation($deleteApplicationCycleId: ID!) {
            deleteApplicationCycle(id: $deleteApplicationCycleId) {
                id
                name
             }
            }`,
          variables: {
            deleteApplicationCycleId,
          },
        },
      });

      const response = await datas.data.data.deleteApplicationCycle;
      dispatch(creator(UPDATE_CYCLE, response));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
