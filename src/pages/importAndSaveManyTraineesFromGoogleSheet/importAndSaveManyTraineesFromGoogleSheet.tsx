import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { loadDataIntoDb, resendMappedDataIntoDb } from "../../redux/actions/PerformLoadDataAction";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";

const ImportTraineeDetailsFromGoogleSheet = () => {
  // console.log("Hello it's hodal");
  const failedStatusMessage = useAppSelector((reduxStore: any) => {
    // console.log(reduxStore.loadData.error);
    return reduxStore.loadData.error;
  });

  const successStatusMessage = useAppSelector((reduxStore: any) => {
    return reduxStore.loadData.message;
  });

  const errMessageArr = failedStatusMessage.split(",");

  const createObjectFromArray = (arr: any) => {
    const obj = {};
    arr.forEach((elem: any) => {
      obj[`${elem}`] = "";
    });
    return obj;
  };
  const namingConventionArrays: any[] = [];
  for (let i = 0; i < errMessageArr.length; i++) {
    namingConventionArrays.push(errMessageArr[i]);
  }
  const dispatch = useAppDispatch();
  const [urlInput, setUrlInput] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const url_arr = urlInput.split("/");
    const Id_goolge_sheet = url_arr[5];
    dispatch(loadDataIntoDb(Id_goolge_sheet));
  };
 
                   {
                     /* const options = [
    { value: "firstName", label: "firstName" },
    { value: "lastName", label: "lastName" },
    { value: "email", label: "email" },
    { value: "gender", label: "gender" },
    { value: "birth_date", label: "birth_date" },
    { value: "phone", label: "phone" },
    { value: "field_of_study", label: "field_of_study" },
    { value: "education_level", label: "education_level" },
    { value: "province", label: "province" },
    { value: "district", label: "district" },
    { value: "cohort", label: "cohort" },
    { value: "isEmployed", label: "isEmployed" },
    { value: "isStudent", label: "isStudent" },
    { value: "Hackerrank_score", label: "Hackerrank_score" },
    { value: "english_scor", label: "english_scor" },
    { value: "interview", label: "interview" },
    { value: "interview_decision", label: "interview_decision" },
    { value: "past_andela_programs", label: "past_andela_programs" },
    { value: "Address", label: "Address" },
    { value: "sector", label: "sector" },
    { value: "haveLaptop", label: "haveLaptop" }, */
                   }
                   {
                     /* ]; */
                   }

  const [formData, setFormData] = React.useState({});
  useEffect(() => {
    setFormData(createObjectFromArray(errMessageArr));
  }, [failedStatusMessage]);

  function handleChangeSelect(event: any) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

    const flipObjectKeys = (data: any) =>
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [value, key])
      );
    // console.log(flipObjectKeys(formData));
  ;
    function handleSubmitToResend(event:any) {
      event.preventDefault();
       const url_arr = urlInput.split("/");
       const Id_goolge_sheet = url_arr[5];

      dispatch(
        resendMappedDataIntoDb(flipObjectKeys(formData), Id_goolge_sheet)
      );
      // console.log(formData);
    }

  //  {
  //   genders: 'Male',
  //   birth_date: '2/2/20392',
  //   phones: '7341113456',
  //   field_of_studies: 'MEE',
  //   education_level: 'A0',
  //   province: 'Kigali city',
  //   district: 'muhanga2',
  //   sector: '2sdf',
  //   Address: 'kn299',
  //   haveLaptop: 'NO',
  //   cohort: 'Cohot25',
  //   isEmployement: 'yes',
  //   isStudent: 'No',
  //   Hackerrank_score: '60',
  //   english_score: '30',
  //   interviewing: '22',
  //   interview_decision: 'Pass',
  //   past_andela_programs: "din't attempt",
  //   firstName: 'the masters',
  //   lastName: 'Learner',
  //   email: 'hod32@gmail.co'
  // },

  return (
    <div className="ml-[1rem] mr-[1rem]  h-full p-[9rem] flex justify-center flex-col items-center bg-[#aaa] pb-[20rem]">
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
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Enter google sheet url to load your data into database"
            required
          />
        </div>
        <Link to="/filter_trainee">
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
      {failedStatusMessage && (
        <div>
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
                  {message}
                  <div>
                    <select
                      // options={options}
                      onChange={handleChangeSelect}
                      name={message}
                    >
                      <option value="">--select--</option>
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
                      <option value="cohort">cohort</option>
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
            <button type="submit">Resend your query</button>
          </form>
        </div>
      )}

      {successStatusMessage && (
        <div className="p-3 my-2 bg-gray-400 shadow-md shadow-blue-100 m-4">
          <div className="text-xl bg-gray-400 shadow-md shadow-blue-100 p-4 my-4">
            <span className="font-bold text-button-color">
              IMPORTING DATA INTO DATABASE IS{" "}
            </span>{" "}
            <span className="text-button-color bg-slate-500 p-2 font-extrabold ">
              SUCCESSFULL COMPLETED !!!!{" "}
            </span>{" "}
          </div>
          <div className="text-2xl bg-slate-500 shadow-md shadow-blue-100 p-4 my-5">
            {successStatusMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportTraineeDetailsFromGoogleSheet;
