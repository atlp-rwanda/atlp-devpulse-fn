import creator from "./creator";
import { GET_TRAINEE, CREATE_TRAINEES, CREATE_CYCLE_ERROR } from "..";
import { toast } from "react-toastify";
import axios from "axios";

export const getAllTraineess =
  ({ page, itemsPerPage, All }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
        query AllTraineesDetails($input: pagination) {
          allTraineesDetails(input: $input) {
            gender
            birth_date
            Address
            phone
            field_of_study
            education_level
            province
            district
            sector
            isEmployed
            haveLaptop
            isStudent
            Hackerrank_score
            english_score
            interview_decision
            past_andela_programs
            _id
            trainee_id {
              firstName
              lastName
            }
          }
        }
      `,
          variables: {
            input: {
              page,
              itemsPerPage,
              All,
            },
          },
        },
      });
      const trainee = await datas.data.data.allTraineesDetails;
      dispatch(creator(GET_TRAINEE, trainee));
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };

export const createTrainee =
  ({ firstName, lastName, email, cycle_id }: any) =>
  async (dispatch: any) => {
    try {
      const datas = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
          mutation CreateNewTraineeApplicant($input: newTraineeApplicantInput) {
            createNewTraineeApplicant(input: $input) {
              lastName
              firstName
              email
              _id
            }
          }`,
          variables: {
            input: {
              firstName,
              lastName,
              email,
              cycle_id,
            },
          },
        },
      })
        .then((response) => {
          if (response.data.data !== null) {
            toast.success("Successfully created.");
            dispatch(
              creator(
                CREATE_TRAINEES,
                response.data.data.createNewTraineeApplicant
              )
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


export const getTraineeApplicant = (traineeId: string) => async(dispatch: any) => {
  try{
    const response = await axios.post('/', {
      query: `
        query GetOneTrainee($ID: ID!) {
          getOneTrainee(ID: $ID) {
            _id
            firstName
            lastName
            email
            status
            applicationPhase
            cohort {
              id
              title
              program
              cycle
              start
              end
              phase
            }
          }
        }
      `,
      variables: { ID: traineeId }
    });
    const trainee = response.data.data.getOneTrainee;
    dispatch(creator(GET_TRAINEE, trainee));

  }catch (error) {
    console.error('Error fetching trainee:', error);
  }
}