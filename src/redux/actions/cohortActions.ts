import creator from "./creator";
import {
  CREATE_COHORT_ERROR,
  CREATE_COHORT_SUCCESS,
  GET_COHORTS,
  GET_TRAINEE_COHORT,
  GET_ALL_TRAINEES,
  GET_ALL_TRAINEES_ERROR,
  ADD_TRAINEE_IN_COHORT,
  ADD_TRAINEE_IN_COHORT_ERROR,
} from "..";
import axios from "./axiosconfig";
import { toast } from "react-toastify";

export const getAllCohorts = () => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: process.env.BACKEND_URL,
      method: "post",
      data: {
        query: `
 query GetAllCohorts {
   getAllCohorts {
     id
     title
     phase
     start
     end
     cycle {
       _id
       name
       startDate
       endDate
     }
     program {
       _id
       title
       description
     }
     trainees {
      _id
      firstName
      lastName
      email
      cohort
     }
   }
       }
      `,
      },
    });
    const cohorts = await datas.data.data.getAllCohorts;
    // console.log(cohorts)
    dispatch(creator(GET_COHORTS, cohorts));
    return cohorts.length;
  } catch (error: any) {
    const errorMessage = "Failed to create cohort";
    dispatch(creator(CREATE_COHORT_ERROR, errorMessage));
  }
};

export const getCohort = (getCohortId: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
        query GetCohort($getCohortId: ID!) {
  getCohort(id: $getCohortId) {
    title
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
    trainees {
      _id
      firstName
      lastName
      email
      cohort
     }
  }
}
      `,
      variables: { getCohortId },
    });
    const cohortData = await response.data.data.getCohort;
    dispatch(creator(GET_TRAINEE_COHORT, cohortData));
    return cohortData.length;
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }
};

export const createCohort =
  ({ title, phase, cycle, program, start, end }: any) =>
  async (dispatch: any) => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
mutation($cohortFields: cohortInput){
  createCohort(cohortFields: $cohortFields) {
 id
 title
 phase
program {
  _id
}
cycle {
  _id
}
  }
}
      `,
        variables: {
          cohortFields: {
            title,
            phase,
            cycle,
            program,
            start,
            end,
          },
        },
      });

      const errors = response.data.errors;
      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      const cohortData = await response.data.data.getCohort;
      dispatch(creator(CREATE_COHORT_SUCCESS, cohortData));
    } catch (error: any) {
      throw error;
    }
  };

export const updateCohort =
  (updateCohortId: any, { title, phase, cycle, program, start, end }: any) =>
  async (dispatch: any) => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
mutation($updateCohortId: ID!, $updateCohortCohortFields2: updateCohortInput){
  updateCohort(id: $updateCohortId,cohortFields: $updateCohortCohortFields2) {
    id
    title
    start
    end
    cycle {
      _id
      name
      startDate
      endDate
    }
    program {
      _id
      title
      description
      duration
      mainObjective
    }
    phase
  }
}
      `,
        variables: {
          updateCohortCohortFields2: {
            title,
            phase,
            cycle,
            program,
            start,
            end,
          },
          updateCohortId,
        },
      });
      const errors = response.data.errors;
      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      const cohortData = await response.data.data.getCohort;
      dispatch(creator(CREATE_COHORT_SUCCESS, cohortData));
    } catch (error) {
      throw error;
    }
  };

export const deleteCohort = (deleteCohortId: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
mutation($deleteCohortId: ID!){
  deleteCohort(id: $deleteCohortId)
}
      `,
      variables: {
        deleteCohortId,
      },
    });
    const errors = response.data.errors;
    if (errors && errors.length > 0) {
      throw new Error(errors[0].message);
    }
    const cohortData = await response.data.data.getCohort;
    dispatch(creator(CREATE_COHORT_SUCCESS, cohortData));
  } catch (error) {
    throw error;
  }
};

export const getAllTraineeApplicants = () => async (dispatch: any) => {
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: 'post',
      data: {
        query: `
          query GetAllTraineeApplicant {
            getAllTraineeApplicant {
              lastName
              firstName
              _id
              email
              cohort
              applicationPhase
            }
          }
        `
      }
    });
    const traineeApplicants = await response.data.data.getAllTraineeApplicant;
    const admittedTrainees = traineeApplicants?.filter((trainee: any) => trainee?.applicationPhase === "Admitted");
    if (admittedTrainees.length === 0) {
      return { error: 'No trainees found' };
    } else {
      dispatch(creator(GET_ALL_TRAINEES, admittedTrainees));
      return { data: admittedTrainees };
    }
  } catch (error) {
    toast.error("Error fetching trainee applicants");
  }
};

export const acceptTrainee = (traineeId: any, cohortId: any) => async (dispatch: any) => {
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: 'post',
      data: {
        query: `
          mutation AcceptTrainee($traineeId: ID!, $cohortId: ID!) {
            acceptTrainee(traineeId: $traineeId, cohortId: $cohortId) {
              success
              message
            }
          }
        `,
        variables: {
          traineeId: traineeId,
          cohortId: cohortId
        }
      }
    });
    const result = await response.data.data.acceptTrainee;
    if (result.success) {
      toast.success(result.message);
      dispatch(creator(ADD_TRAINEE_IN_COHORT, { traineeId, cohortId }));
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.error('Error accepting trainee:', error);
  }
};