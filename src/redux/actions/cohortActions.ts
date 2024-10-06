import creator from "./creator";
import { GET_COHORTS, GET_TRAINEE_COHORT } from "..";
import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const getAllCohorts = () => async (dispatch: any) => {
  try {
    const datas = await axios.post("/", {
      query: `
        query GetAllCohorts {
        getAllCohorts {
            title
            start
            program
            id
            end
            cycle
            phase
            trainees {
            id
            firstName
            lastName
            }
          }
        }
      `,
    });
    const cohorts = await datas.data.data.getAllCohorts;
    dispatch(creator(GET_COHORTS, cohorts));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const getCohort =(getCohortId: any) => async (dispatch: any) => {
  try {
    const response= await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
        query GetCohort($getCohortId: ID!) {
          getCohort(id: $getCohortId) {
            id
            title
            program
            cycle
            start
            end
            phase
            trainees
  }
}
      `,
      variables: { getCohortId }
    });
    console.log('GraphQL Response:', response.data);
    const cohortData = await response.data.data.getCohort;
    console.log("cohort data" , cohortData)
    dispatch(creator(GET_TRAINEE_COHORT, cohortData));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};
