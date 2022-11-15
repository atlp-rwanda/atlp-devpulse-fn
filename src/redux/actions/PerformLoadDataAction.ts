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
    // "Variable "$columnData" got invalid value { firstName: "", lastName: "", email: "", gender: "", birth_date: "", Address: "", phone: "phones", field_of_study: "", education_level: "", province: "provinces", district: "", sector: "sectors", isEmployed: "", haveLaptop: "", isStudent: "", Hackerrank_score: "", english_score: "", interview: "", interview_decision: "", past_andela_programs: "", cycle_id: "cohort 21", : "Wrong cycle name is provided!!!!", spreadsheetId: "1hXUavm_K5BQAOGTx9W4Z84Ttb2_ONfvk_EQZlyOnUPM" }; Field "" is not defined by type "columnsInputSubmitted"."

    // "Variable "$columnData" got invalid value { firstName: "", lastName: "", email: "", gender: "", birth_date: "", Address: "", phone: "phones", field_of_study: "", education_level: "", province: "provinces", district: "", sector: "sectors", isEmployed: "", haveLaptop: "", isStudent: "", Hackerrank_score: "", english_score: "", interview: "", interview_decision: "", past_andela_programs: "", cycle_id: "cohort 1000", : "Wrong cycle name is provided!!!!" }; Field "spreadsheetId" of required type "String!" was not provided."
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
      // if ((await resultPromise).data.data) {
      //   dispatch(
      //     load_data_success((await resultPromise).data.data.reSendDataIntoDb)
      //   );
      // }

      // // on success
      if ((await resultPromise).data.data) {
        console.log((await resultPromise).data.data.reSendDataIntoDb);
        dispatch(
          load_data_success((await resultPromise).data.data.reSendDataIntoDb)
        );
      }

      // on errors
      else {
        console.log((await resultPromise).data.errors[0].message);
        dispatch(load_data_fail((await resultPromise).data.errors[0].message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
// "Variable \"$columnData\" got invalid value { firstName: \"\", lastName: \"\", email: \"emails\", gender: \"\", birth_date: \"\
