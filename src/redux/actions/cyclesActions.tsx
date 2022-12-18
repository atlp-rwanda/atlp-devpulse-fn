import creator from "./creator";
import {
  GET_CYCLES,
  CREATE_CYCLES,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CREATE_CYCLE_ERROR,
  UPDATE_CYCLE_ERROR,
  DELETE_CYCLE_ERROR,
} from "..";
import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const getAllCycles = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
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
      await axios
        .post("/", {
          query: `
        mutation createApplicationCycle($input: createApplicationCycle) {
            createApplicationCycle(input: $input) {
                id
                name
                startDate
                endDate
            }
        }`,
          variables: {
            input: {
              name,
              startDate,
              endDate,
            },
          },
        })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Cycle successfully created.");
            dispatch(
              creator(CREATE_CYCLES, response.data.data.createApplicationCycle)
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(CREATE_CYCLE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(CREATE_CYCLE_ERROR, error));
        });
    } catch (error) {
      console.log(error);

      return dispatch(creator(CREATE_CYCLE_ERROR, error));
    }
  };

export const updateApplicationCycle =
  ({ updateApplicationCycleId, name, startDate, endDate, id }: any) =>
  async (dispatch: any) => {
    try {
      await axios
        .post("/", {
          query: `
          mutation upDateCycle(
            $updateApplicationCycleId: ID!
            $input: updateApplicationCycle
            ) {
            updateApplicationCycle(id: $updateApplicationCycleId, input: $input) {
                id
                name
                startDate
                endDate
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
        })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Cycle successfully updated.");
            dispatch(
              creator(UPDATE_CYCLE, response.data.data.updateApplicationCycle)
            );
          } else {
            const err = response.data.errors[0].message;

            toast.error(err);
            dispatch(creator(UPDATE_CYCLE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(UPDATE_CYCLE_ERROR, error));
        });
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
      const datas = await axios
        .post("/", {
          query: `
            mutation deleteCycle($deleteApplicationCycleId: ID!) {
            deleteApplicationCycle(id: $deleteApplicationCycleId) {
                id
                name
             }
            }`,
          variables: {
            deleteApplicationCycleId,
          },
        })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Cycle successfully deleted.");
            dispatch(
              creator(DELETE_CYCLE, response.data.data.deleteApplicationCycle)
            );
          }
          if (response.data.data == null) {
            const err = response.data.errors[0].message;
            toast.success(err);
            dispatch(creator(DELETE_CYCLE_ERROR, err));
          }
        })
        .catch((error) => {
          dispatch(creator(DELETE_CYCLE_ERROR, error));
        });
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };
