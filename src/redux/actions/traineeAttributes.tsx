import axios from 'axios';
import { CREATE_TRAINEE_ATTRIBUTE_REQUEST, CREATE_TRAINEE_ATTRIBUTE_SUCCESS, CREATE_TRAINEE_ATTRIBUTE_FAILURE } from '..';
import { toast } from 'react-toastify';

export const createTraineeAttribute = (attributeData) => async (dispatch) => {
  dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_REQUEST });
  try {
    const response = await axios({
      url: process.env.BACKEND_URL,
      method: 'post',
      data: {
        query: `
          mutation CreateTraineeAttribute($input: traineeAttributeInput!) {
            createTraineeAttribute(attributeInput: $input) {
              _id
              gender
              birth_date
              Address
              phone
              field_of_study
              education_level
              currentEducationLevel
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
              applicationPost
              otherApplication
              andelaPrograms
              otherPrograms
              understandTraining
              discipline
              trainee_id
            }
          }
        `,
        variables: {
          input: attributeData,
        },
      },
    });

    if (response.data.data && response.data.data.createTraineeAttribute) {
      toast.success('Trainee attribute successfully created.');
      dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_SUCCESS, payload: response.data.data.createTraineeAttribute });
    } else if (response.data.errors) {
      const err = response.data.errors[0].message;
      console.error('GraphQL Error:', err);
      toast.error(err);
      dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_FAILURE, payload: err });
    }
  } catch (error:any) {
    console.error('Axios Error:', error || error);
    const errorMessage = error.response?.data?.errors?.[0]?.message || 'An error occurred while creating the trainee attribute.';
    toast.error(errorMessage);
    dispatch({ type: CREATE_TRAINEE_ATTRIBUTE_FAILURE, payload: errorMessage });
  }
};