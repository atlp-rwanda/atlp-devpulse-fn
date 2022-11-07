import axios from "axios";
import {
  load_data_request,
  load_data_success,

  load_data_fail,
} from "../actiontypes/load_data_into_db_action";

export const loadDataIntoDb = (googleSheetId: string) => {
  return async (dispatch: any) => {
    dispatch(load_data_request());
    const result = await axios({
      url: "http://localhost:4000/",
      method: "post",
      data: {
        query: `mutation LoadAllTrainees($spreadsheetId: String!) {
  loadAllTrainees(spreadsheetId: $spreadsheetId)
}`,
        variables: {
          spreadsheetId: googleSheetId,
        },
      },
    });


    // on success
    if (result.data.data) {
  console.log(result.data.data.loadAllTrainees);
  dispatch(load_data_success(result.data.data.loadAllTrainees));
    }

    // on errors
    else {
      console.log(result.data.errors[0].message);
      dispatch(load_data_fail(result.data.errors[0].message));
    }
  };
};

 const columns = {
    gender: '',
    birth_date: '',
    phone: '',
    field_of_study: '',
    education_level: '',
    province: '',
    district: '',
    sector: '',
    Address: '',
    haveLaptop: '',
    cohort: '',
    isEmployed: '',
    isStudent: '',
    Hackerrank_score: '',
    english_score: '',
    interview: '',
    interview_decision: '',
    past_andela_programs: "",
    firstName: '',
    lastName: '',
    email: ''
  }

export const resendMappedDataIntoDb = (dataObjectMapped: any) => {

  const result = {
    ...columns,
    ...dataObjectMapped,
  };

  return async (dispatch: any) => {
    dispatch(load_data_request());
    const result = await axios({
      url: "http://localhost:4000/",
      method: "post",
      data: {
        query: `mutation LoadAllTrainees($spreadsheetId: String!) {
  loadAllTrainees(spreadsheetId: $spreadsheetId)
}`,
        variables: {
          spreadsheetId: googleSheetId,
        },
      },
    });

    // on success
    if (result.data.data) {
      console.log(result.data.data.loadAllTrainees);
      // dispatch(load_data_success(result.data.data.loadAllTrainees));
    }

    // on errors
    else {
      console.log(result.data.errors[0].message);
      dispatch(load_data_fail(result.data.errors[0].message));
    }
  };
};
