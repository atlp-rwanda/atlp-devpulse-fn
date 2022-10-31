import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadDataIntoDb } from "../../redux/actions/PerformLoadDataAction";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";

const ImportTraineeDetailsFromGoogleSheet = () => {
  console.log("Hello it's hodal");
  const failedStatusMessage = useAppSelector((reduxStore: any) => {
    console.log(reduxStore.loadData.error);
    return reduxStore.loadData.error;
  });

  const successStatusMessage = useAppSelector((reduxStore: any) => {
    return reduxStore.loadData.message;
  });

  const errMessageArr = failedStatusMessage.split(",");
  const namingConventionArrays: any[] = [];
  for (let i = 0; i <= errMessageArr.length - 2; i++) {
    if (i > 4) {
      namingConventionArrays.push(errMessageArr[i]);
    }
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
  return (
    <div className="ml-[1rem] mr-[1rem] h-full p-[9rem] flex justify-center flex-col items-center bg-[#aaa] pb-[20rem]">
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
          <div className="p-3 my-2 bg-gray-400">
            <span className="text-xl text-red-800">
              ERROR WHILE IMPORTING!{" "}
            </span>
            {"==> "}
            <span className="text-[#6c1313] text-lg">{errMessageArr[1]}</span>
            <span className="text-lg"> is not same as </span>{" "}
            <span className="bg-button-color text-gray-100 p-3 underline text-lg">
              {errMessageArr[3]}
            </span>{" "}
            <span className="text-button-color text-lg">in Database</span>
          </div>
          <div className="p-3 my-2 bg-gray-400 text-button-color  text-lg">
            Naming convention{" "}
            <span className=" bg-button-color text-gray-100 underline p-3  text-lg">
              which you should follow
            </span>{" "}
            in your google sheet column name of heading:
          </div>
          <div className="bg-[#6c1313] py-4 my-5 ">
            {namingConventionArrays.map((message, index) => {
              return (
                <div
                  className="bg-blue-100 p-3 text-button-color m-4 shadow-md shadow-blue-100"
                  key={index}
                >
                  {message}
                </div>
              );
            })}
          </div>
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
