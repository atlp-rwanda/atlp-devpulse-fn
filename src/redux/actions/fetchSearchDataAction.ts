import axios from "./axiosconfig";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import {
  fetchSearchDataType,
  ActionFetch,
} from "../actiontypes/fetchSearchDataActionTypes";


// Define action creators
export const fetchSearchData = (input: any) => {
  return async (dispatch: Dispatch<ActionFetch>) => {
    dispatch({ type: fetchSearchDataType.FETCH_SEARCH_DATA_LOADING });
    try {
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
            query SearchData($input: SearchInput) {
              searchData(input: $input) {
                users {
                  firstname
                  lastname
                  role {
                    roleName
                  }
                  email
                }
                roles {
                  roleName
                  description
                }
                jobs {
                  title
                  description
                  program {
                    title
                    description
                    mainObjective
                  }
                  cohort {
                    title
                  }
                  cycle {
                    name
                  }
                }
                cohorts {
                  title
                  program {
                    title
                    description
                    mainObjective
                  }
                  cycle {
                    name
                  }
                }
                programs {
                  title
                  description
                  mainObjective
                }
                trainees {
                  lastName
                  firstName
                  email
                  cycle_id {
                    name
                  }
                }
                applicationCycles {
                  name
                }
                totalUsers
                totalRoles
                totalJobs
                totalCohorts
                totalPrograms
                totalTrainees
                totalApplicationCycles
                totalPages {
                  users
                  roles
                  jobs
                  cohorts
                  programs
                  trainees
                  applicationCycles
                }
                currentPage
              }
            }
          `,
          variables: {
            input: input,
          },
        },
      });

      dispatch({
        type: fetchSearchDataType.FETCH_SEARCH_DATA_SUCCESS,
        data: response.data.data.searchData,
      });
    } catch (error) {
      dispatch({
        type: fetchSearchDataType.FETCH_SEARCH_DATA_FAILURE,
        error,
      });
      toast.error("Failed to fetch search data");
    }
  };
};