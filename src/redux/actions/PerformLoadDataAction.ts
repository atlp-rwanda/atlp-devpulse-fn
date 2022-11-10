import axios from "axios";
import {
  load_data_request,
  load_data_success,
  load_data_fail,
  resend_mapped_data_into_db,
} from "../actiontypes/load_data_into_db_action";

const columns = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  birth_date: "",
  Address: "",
  phone: "",
  field_of_study: "",
  education_level: "",
  province: "",
  district: "",
  sector: "",
  cohort: "",
  isEmployed: "",
  haveLaptop: "",
  isStudent: "",
  Hackerrank_score: "",
  english_score: "",
  interview: "",
  interview_decision: "",
  past_andela_programs: "",
};

export const loadDataIntoDb = (googleSheetId: string) => {
  // console.log(googleSheetId)
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

    // // on success
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

export const resendMappedDataIntoDb = (dataObjectMapped: any, id:any) => {
  const resultObj = {
    ...columns,
    ...dataObjectMapped,
    spreadsheetId:id
  };
  console.log("in redux action");
  console.log(resultObj);
  return async (dispatch: any) => {
    // dispatch(load_data_request());

   try {
     const result = await axios({
       url: "http://localhost:4000/",
       method: "post",
       data: {
         query: `mutation($columnData: columnsInputSubmitted!) {
  reSendDataIntoDb(columnData: $columnData)
}`,
         variables: {
           columnData: resultObj,
         },
       },
     });

     // on success
     if (result.data.data) {
       console.log(result.data.data.reSendDataIntoDb);
      dispatch(resend_mapped_data_into_db(result.data.data.reSendDataIntoDb));
     }
   } catch (error) {
    console.log(error);
   }
  };
};
