import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  loadDataIntoDb,
  resendMappedDataIntoDb,
} from "../../redux/actions/PerformLoadDataAction";
import { load_data_request } from "../../redux/actiontypes/load_data_into_db_action";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
// import { } from "react";

const ImportTraineeDetailsFromGoogleSheet = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [urlInput, setUrlInput] = useState("");
  const [formData, setFormData] = React.useState({});

  // ==>> begin ----- READING INTO THE REDUX STORE TO FIND THE STATUS OF THE RESPONSE, IF THERE IS ERROR
  // OR IF THERE IS THE SUCCESS MESSAGE FROM THE BACKEND ------
  const failedStatusMessage = useAppSelector((reduxStore: any) => {
    return reduxStore.loadData.error;
  });
  const successStatusMessage = useAppSelector((reduxStore: any) => {
    return reduxStore.loadData.message;
  });
  // <<== end.

  const errMessageArr = failedStatusMessage.split(",");

  // ==>> begin -----HANDLING THE NAVIGATION TO THE PREVIOUS PAGE IF THE LOADING DATA INTO DATABASE
  // IS DONE SUCCESSFULLY -------
  if (
    successStatusMessage ===
    "The data mapped has been saved successfully, CONGRATS"
  ) {
    navigate("/filter_trainee-applicants");
    dispatch(load_data_request());
  }
  if (successStatusMessage === "Trainees data loaded to db successfully") {
    navigate("/filter_trainee-applicants");
    dispatch(load_data_request());
  }
  // <<== end.

  // ==>> begin ---- PERTAINS TO THE HANDLING THE LOADING OF THE DATA INTO DATABASE WHEN THE COLUMNS ARE
  // MATCHING TO THOSE IN THE DATABASE ----
  const handleChange = (event: any) => {
    setUrlInput(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const url_arr = urlInput.split("/");
    const Id_goolge_sheet = url_arr[5];
    dispatch(loadDataIntoDb(Id_goolge_sheet));
  };
  // <<== end

  // ==>> begin ---- PERTAINS TO THE HANDLING THE LOADING OF THE DATA INTO DATABASE WHEN THE COLUMNS ARE
  // "NOT" MATCHING TO THOSE IN THE DATABASE ----
  const createObjectFromArray = (arr: any) => {
    const obj = {};
    arr.forEach((elem: any) => {
      if (elem !== "Wrong cycle name is provided!!!!") {
        obj[`${elem}`] = "";
      }
    });
    return obj;
  };
  const namingConventionArrays: any[] = [];
  for (let i = 0; i < errMessageArr.length; i++) {
    namingConventionArrays.push(errMessageArr[i]);
  }
  // In case the columns name are not matching to those of the database fields.
  useEffect(() => {
    setFormData(createObjectFromArray(errMessageArr));
  }, [failedStatusMessage]);
  // The actual function which is handling the mapping of the correctFormat of
  // column to the incorrect one.
  function handleChangeSelect(event: any) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        // this is dynamic handling of the select input field where by anytime select is hitted it will capture
        // it currect value along with its name.
        [name]: value,
      };
    });
  }
  // flip the object keys to become the ojbect values and object values to become the object keys
  const flipObjectKeys = (data: any) =>
    Object.fromEntries(
      Object.entries(data).map(([key, value]) => [value, key])
    );
  // the function handling the submission of the mapped data form the input form.
  function handleSubmitToResend(event: any) {
    event.preventDefault();
    const url_arr = urlInput.split("/");
    const Id_goolge_sheet = url_arr[5];
    setUrlInput("");
    const newFormData = {
      ...formData,
    };
    // As on collecting the mapped fields the value was uses as the properties, this flip function is there
    // to reverse and bring them to the normal format.
    const dataObjectInReversedForm = flipObjectKeys(newFormData);
    const data = {
      ...dataObjectInReversedForm,
    };
    dispatch(resendMappedDataIntoDb(data, Id_goolge_sheet));
  }
  // <<== end.

  return (
    <div className="ml-[1rem] mr-[1rem]  h-full p-[9rem] flex justify-center flex-col items-center bg-[#aaa] pb-[20rem]">
      {/* ==>> begin ---- PERTAINS TO THE HANDLING THE LOADING OF THE DATA INTO DATABASE WHEN THE COLUMNS ARE
  // MATCHING TO THOSE IN THE DATABASE ----  */}
      {!failedStatusMessage && (
        <form className="w-[80%] h-1/2 ml-[50rem] border-[#c5c5c5] mr-[50rem] bg-slate-50 p-[2rem]  shadow-2xl shadow-blue-100 hover:shadow-indigo-100/40 ">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Enter Google sheet URL
            </label>
            <input
              value={urlInput}
              onChange={handleChange}
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please Enter google sheet url to load your data into database"
              required
            />
          </div>
          <Link to="/filter_trainee-applicants">
            <button
              type="submit"
              className="text-gray-300 mr-4 bg-[#6c1313]  hover:bg-[#931a1a]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Back to all trainees
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            className="text-gray-300 bg-button-color hover:bg-[#255d64] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-60"
          >
            Load Data to Database
          </button>
        </form>
      )}
      {/* <<== end */}

      {/* ==>> begin ---- PERTAINS TO THE HANDLING THE LOADING OF THE DATA INTO DATABASE WHEN THE COLUMNS ARE
  // "NOT" MATCHING TO THOSE IN THE DATABASE ---- */}
      {failedStatusMessage && (
        <div className="w-full">
          <div className="p-5 rounded-xl bg-button-color text-2xl text-white">
            The columns needs to be matched to the these fields for working!
          </div>
          <form
            onSubmit={handleSubmitToResend}
            className="bg-[#6c1313] py-4 my-5 w-full"
          >
            {namingConventionArrays.map((message, index) => {
              return (
                <div
                  className="bg-blue-100 p-3 text-button-color m-4 shadow-md shadow-blue-100"
                  key={index}
                >
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    {message}
                  </label>
                  <div>
                    <select
                      onChange={handleChangeSelect}
                      name={message}
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option defaultValue="">
                        Please map this {message.toUpperCase()} to its
                        corresponding field from the list before sending again!
                      </option>
                      <option value="firstName">firstName</option>
                      <option value="lastName">lastName</option>
                      <option value="email">email</option>
                      <option value="gender">gender</option>
                      <option value="birth_date">birth_date</option>
                      <option value="phone">phone</option>
                      <option value="field_of_study">field_of_study</option>
                      <option value="education_level">education_level</option>
                      <option value="province">province</option>
                      <option value="district">district</option>
                      <option value="isEmployed">isEmployed</option>
                      <option value="isStudent">isStudent</option>
                      <option value="Hackerrank_score">Hackerrank_score</option>
                      <option value="english_score">english_score</option>
                      <option value="interview">interview</option>
                      <option value="interview_decision">
                        interview_decision
                      </option>
                      <option value="past_andela_programs">
                        past_andela_programs
                      </option>
                      <option value="Address">Address</option>
                      <option value="sector">sector</option>
                      <option value="haveLaptop">haveLaptop</option>
                    </select>
                  </div>
                </div>
              );
            })}
            <Link to="/filter_trainee-applicants">
              <button
                type="submit"
                className="text-gray-300 mr-4 bg-[#d57878]  hover:bg-[#931a1a]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Back to all trainees
              </button>
            </Link>
            <button
              type="submit"
              className="text-gray-300 bg-button-color hover:bg-[#255d64] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-60"
            >
              Resend your query
            </button>
          </form>
        </div>
      )}
      {/* <<== end. */}
    </div>
  );
};

export default ImportTraineeDetailsFromGoogleSheet;
