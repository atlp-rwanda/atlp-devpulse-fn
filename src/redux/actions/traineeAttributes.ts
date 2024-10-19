import { AppDispatch } from '../store';
import {
  CREATE_TRAINEE_ATTRIBUTE_REQUEST,
  CREATE_TRAINEE_ATTRIBUTE_SUCCESS,
  CREATE_TRAINEE_ATTRIBUTE_FAILURE
} from "..";
import { toast } from "react-toastify";
import axios from "axios";


const createTraineeAttributeQuery = `
  mutation CreateTraineeAttribute($attributeInput: TraineeAttributeInput!) {
    createTraineeAttribute(attributeInput: $attributeInput) {
      _id
      gender
      birth_date
      address
      phone
      education_level
      currentEducationLevel
      nationality
      province
      district
      sector
      isEmployed
      haveLaptop
      isStudent
      Hackerrank_score
      english_score
      interview
      interview_decision
      applicationPost
      otherApplication
      andelaPrograms
      otherPrograms
      understandTraining
      discipline
      trainee_id
    }
  }
`;


const sendCreateTraineeAttributeRequest = async (attributeData: any) => {
  return await axios({
    url: process.env.BACKEND_URL,
    method: "post",
    data: {
      query: createTraineeAttributeQuery,
      variables: { attributeInput: attributeData }
    },
  });
};


const handleCreateAttributeError = (error: any, dispatch: AppDispatch) => {
  console.error('Full error object:', error);
  console.error('Response data:', error.response?.data);
  const errorMessage = error.response?.data?.errors?.[0]?.message || "An error occurred while creating trainee attributes.";
  console.error('GraphQL Error:', errorMessage);
  toast.error(errorMessage);
  dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_FAILURE, payload: errorMessage });
  throw error;
};


export const createTraineeAttribute = (attributeData: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_REQUEST });
  try {
    console.log('Sending data:', attributeData);
    const response = await sendCreateTraineeAttributeRequest(attributeData);
    console.log('Full response:', response);

    const { data } = response.data;
    if (data?.createTraineeAttribute) {
      dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_SUCCESS, payload: data.createTraineeAttribute });
      toast.success("Trainee attributes successfully created.");
      return data.createTraineeAttribute._id;
    } else {
      console.error('Unexpected response structure:', response.data);
      throw new Error("Failed to create trainee attributes: Unexpected response structure");
    }
  } catch (error: any) {
    handleCreateAttributeError(error, dispatch);
  }
};
