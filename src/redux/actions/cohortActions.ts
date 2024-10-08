import creator from "./creator";
import { GET_COHORTS, GET_TRAINEE_COHORT } from "..";
import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const getAllCohorts = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data : {
        query: `
        query GetAllCohorts {
        getAllCohorts {
            title
            start
            program{
            _id
            title
            }
            id
            end
            cycle {
            name
            id
            }
        }
      }
      `
      }
   
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
    title
    trainees
    end
    id
    phase
    start
    cycle {
      endDate
      id
      name
      startDate
    }
    program {
      _id
      description
      duration
      mainObjective
      modeOfExecution
      requirements
      title
    }
  }
}
      `,
      variables: { getCohortId }
    });
    const cohortData = await response.data.data.getCohort;
    dispatch(creator(GET_TRAINEE_COHORT, cohortData));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};
