import creator from "./creator";
import { GET_TRAINEE, CREATE_TRAINEES, CREATE_CYCLE_ERROR, SET_TRAINEE } from "..";
import { toast } from "react-toastify";
import axios from "axios";

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME as string;


const uploadPDF = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset)
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error: any) {
    console.error("Uploading error", error);
  }
}
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
          return console.error(error);
        }
      }
    };

export const createTrainee = ({
  firstName,
  lastName,
  email,
  cycle_id,
  coverLetter,
  idDocument,
  resume
}: any) =>
  async (dispatch: any) => {
    try {
      if (!cycle_id) {
        throw new Error('Application cycle is required');
      }
      if (!coverLetter || !idDocument || !resume) {
        throw new Error("All fields are required including documents.")
      }
      const coverLetterUrl = await uploadPDF(coverLetter)
      const idDocumentUrl = await uploadPDF(idDocument)
      const resumeUrl = await uploadPDF(resume)

      if (coverLetterUrl === undefined || idDocumentUrl === undefined || resumeUrl === undefined) {
        throw new Error("Uploading documents failed, try again later!");
      }
      const response = await axios({
        url: process.env.BACKEND_URL,
        method: "post",
        data: {
          query: `
            mutation CreateNewTraineeApplicant($input: newTraineeApplicantInput!) {
              createNewTraineeApplicant(input: $input) {
                _id
                lastName
                firstName
                email
                cycleApplied {
                  _id
                  cycle {
                    _id
                  }
                }
                coverLetterUrl
                idDocumentUrl
                resumeUrl
              }
            }`,
          variables: {
            input: {
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              email: email.trim(),
              cycle_id: cycle_id.trim(),
              coverLetterUrl: coverLetterUrl.trim(),
              idDocumentUrl: idDocumentUrl.trim(),
              resumeUrl: resumeUrl.trim()
            },
          },
        },
      });

      if (response.data.data?.createNewTraineeApplicant) {
        dispatch(
          creator(
            CREATE_TRAINEES,
            response.data.data.createNewTraineeApplicant
          )
        );
        return response.data;
      } else {
        const error = response.data.errors?.[0]?.message || 'An error occurred';
        toast.error(error);
        dispatch(creator(CREATE_CYCLE_ERROR, error));
        return response.data;
      }
    } catch (error: any) {
      console.error('Error creating trainee:', error);
      const errorMessage = error.response?.data?.errors?.[0]?.message || error.message;
      toast.error(errorMessage || 'An error occurred while creating trainee');
      dispatch(creator(CREATE_CYCLE_ERROR, error));
      throw error;
    }
  };


export const getTraineeApplicant = (traineeId: string) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
        query GetOneTrainee($ID: ID!) {
          getOneTrainee(ID: $ID) {
            _id
            applicationPhase
            cohort
          }
        }
      `,
      variables: { ID: traineeId }
    });
    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      return;
    }
    const trainee = response.data.data.getOneTrainee;
    dispatch(creator(GET_TRAINEE, trainee));

  } catch (error: any) {
    console.error('Error fetching trainee:', error);
    console.error('Error response:', error.response?.data);
  }
}

export const getTraineeByUserId = (userId: string) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}`, {
      query: `
        query GetTraineeByUserId($userId: ID!) {
          getTraineeByUserId(userId: $userId)
        }
      `,
      variables: { userId },
    });

    const traineeData = response.data.data.getTraineeByUserId;
    dispatch(creator(SET_TRAINEE, traineeData));
  } catch (error) {
    console.error("Error fetching trainee:", error);
  }
};
