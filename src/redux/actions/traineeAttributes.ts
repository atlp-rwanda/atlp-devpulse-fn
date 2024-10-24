import { AppDispatch } from '../store';
import {
  CREATE_TRAINEE_ATTRIBUTE_REQUEST,
  CREATE_TRAINEE_ATTRIBUTE_SUCCESS,
  CREATE_TRAINEE_ATTRIBUTE_FAILURE
} from "..";
import { toast } from "react-toastify";
import axios from "axios";


const createTraineeAttributeQuery = `
  mutation CreateTraineeAttribute($attributeInput: traineeAttributeInput!) {
    createTraineeAttribute(attributeInput: $attributeInput) {
      _id
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
      past_andela_programs
      understandTraining
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
  const errorMessage = error.response?.data?.errors?.[0]?.message || "An error occurred while creating trainee attributes.";
  console.error('GraphQL Error:', errorMessage);
  toast.error(errorMessage);
  dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_FAILURE, payload: errorMessage });
  throw error;
};


export const createTraineeAttribute = (attributeData: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_REQUEST });
  try {
    const response = await sendCreateTraineeAttributeRequest(attributeData);

    const { data } = response.data;
    if (data?.createTraineeAttribute) {
      dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_SUCCESS, payload: data.createTraineeAttribute });
      toast.success("Trainee attributes successfully created.");
      return { success: true, data: data.createTraineeAttribute && data.createTraineeAttribute._id};
    } else {
      throw new Error("Failed to create trainee attributes: Unexpected response structure");
    }
  } catch (error: any) {
    handleCreateAttributeError(error, dispatch);
    return { success: false, error };
  }
};
