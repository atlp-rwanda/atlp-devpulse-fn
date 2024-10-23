import { AppDispatch } from '../store';
import {
  CREATE_TRAINEE_ATTRIBUTE_REQUEST,
  CREATE_TRAINEE_ATTRIBUTE_SUCCESS,
  CREATE_TRAINEE_ATTRIBUTE_FAILURE
} from "..";
import { toast } from "react-toastify";
import axios from "axios";

interface TraineeAttributeInput {
  gender: string;
  birth_date: string;
  Address: string;
  phone: string;
  field_of_study: string;
  education_level: string;
  province: string;
  district: string;
  sector: string;
  isEmployed: boolean;
  haveLaptop: boolean;
  isStudent: boolean;
  past_andela_programs: string;
  understandTraining: boolean;
  trainee_id: string;
}

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

const transformAttributeData = (data: any): TraineeAttributeInput => {
  return {
    gender: data.gender || "",
    birth_date: data.birth_date || "",
    Address: data.Address || "",
    phone: data.phone || "",
    field_of_study: data.field_of_study || "", 
    education_level: data.education_level || "",
    province: data.province || "",
    district: data.district || "",
    sector: data.sector || "",
    isEmployed: Boolean(data.isEmployed),
    haveLaptop: Boolean(data.haveLaptop),
    isStudent: Boolean(data.isStudent),
    past_andela_programs: data.past_andela_programs || "none",
    understandTraining: Boolean(data.understandTraining),
    trainee_id: data.trainee_id || "",
  };
};


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
