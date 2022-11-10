import { UPDATE_TRAINEE_ATTRIBUTE, UPDATE_TRAINEE_ATTRIBUTE_FAIL } from "..";
import { GET_TRAINEE_TO_UPDATE } from "..";

const initialState = {
    loading: false,
    success:null,
    error: null,
    data: [],
  };
  
  export default (state = initialState, { type, payload }: any) => {
    switch (type) {

      case UPDATE_TRAINEE_ATTRIBUTE:
        return {
          ...state,
          loading: false,
          sucess:true,
          data: payload,
        };
      case UPDATE_TRAINEE_ATTRIBUTE_FAIL:
        return{
          ...state,
          loading: false,
          sucess:false,
          error: payload,
        }
      default:
        return state;
    }
  };