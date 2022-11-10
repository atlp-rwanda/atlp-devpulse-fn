import axios from "axios";
import {
  load_data_request,
  load_data_success,
  load_data_fail,
} from "../actiontypes/load_data_into_db_action";
import { toast } from "react-toastify";

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
  isEmployed: "",
  haveLaptop: "",
  isStudent: "",
  Hackerrank_score: "",
  english_score: "",
  interview: "",
  interview_decision: "",
  past_andela_programs: "",
  cycle_id: "",
};

export const loadDataIntoDb = (googleSheetId: string) => {
  return async (dispatch: any) => {
    dispatch(load_data_request());
    const resultPromise = axios({
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
    toast.promise(resultPromise, {
      pending: "Saving the data into DB ...",
      success: `Saved successfully 👌`,
      error: `Not saved successfully 🤯`,
    });

    await resultPromise;
    // // on success
    if ((await resultPromise).data.data) {
      console.log((await resultPromise).data.data.loadAllTrainees);
      dispatch(
        load_data_success((await resultPromise).data.data.loadAllTrainees)
      );
    }

    // on errors
    else {
      console.log((await resultPromise).data.errors[0].message);
      dispatch(load_data_fail((await resultPromise).data.errors[0].message));
    }
  };
};

export const resendMappedDataIntoDb = (dataObjectMapped: any, id: any) => {
  console.log(dataObjectMapped);
  const resultObj = {
    ...columns,
    ...dataObjectMapped,
    spreadsheetId: id,
  };
  console.log("in redux action");
  console.log(resultObj);
  return async (dispatch: any) => {
    try {
      const resultPromise = axios({
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
    toast.promise(resultPromise, {
      pending: "Saving the data into DB ...",
      success: `saved successfully 👌`,
      error: `not saved successfully 🤯`,
    });
      // on success
      if ((await resultPromise).data.data) {
        dispatch(load_data_success((await resultPromise).data.data.reSendDataIntoDb));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
