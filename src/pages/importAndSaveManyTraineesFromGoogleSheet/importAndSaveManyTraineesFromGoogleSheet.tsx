
import React, { useState } from "react";
import { loadDataIntoDb } from "../../redux/actions/PerformLoadDataAction";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";

const ImportTraineeDetailsFromGoogleSheet = () => {
  const failedStatusMessage = useAppSelector((reduxStore: any) => {
    return reduxStore.loadData.error;
  });

  const successStatusMessage = useAppSelector((reduxStore: any) => {
    return reduxStore.loadData.message;
  });

  const errMessageArr = failedStatusMessage.split(",");
  const namingConventionArrays: any[] = [];
  for (let i = 0; i <= errMessageArr.length; i++) {
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
    <div className="w-full h-full flex justify-center flex-col items-center mt-24">
      <form className="w-1/3 h-1/3">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Enter Google sheet URL
          </label>
          <input
            value={urlInput}
            onChange={handleChange}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Enter google sheet url to load your data into database"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back to all trainees
        </button>
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Load Data to Database
        </button>
      </form>
      {failedStatusMessage && (
        <div>
          <div className="p-3 my-2 bg-gray-400 rounded-2xl">
            <span className="text-xl text-red-800">
              ERROR WHILE IMPORTING!{" "}
            </span>
            {"==> "}
            <span className="text-red-500 text-lg">{errMessageArr[1]}</span>
            <span className="text-lg"> is renamed as </span>{" "}
            <span className="text-blue-500 text-lg">{errMessageArr[3]}</span>{" "}
            <span className="text-blue-900 text-lg">in Database</span>
          </div>
          <div className="p-3 my-2 bg-gray-400 rounded-2xl text-lg">
            Naming convention{" "}
            <span className="text-green-600  bg-red-300 text-lg">
              which you should follow
            </span>{" "}
            in your google sheet column name of heading:
          </div>
          <div className="bg-red-300 py-4 my-5 rounded-3xl">
            {namingConventionArrays.map((message, index) => {
              return (
                <div
                  className="bg-blue-100 p-3 text-blue-600 rounded-xl m-4"
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
        <div className="p-3 my-2 bg-gray-400 rounded-2xl m-4">
          <div className="text-xl bg-gray-400 rounded-2xl p-4 my-4">
            <span className="font-bold text-blue-600">
              IMPORTING DATA INTO DATABASE IS{" "}
            </span>{" "}
            <span className="text-blue-900 bg-slate-500 p-2 font-extrabold rounded-3xl">
              SUCCESSFULL COMPLETED !!!!{" "}
            </span>{" "}
          </div>
          <div className="text-2xl bg-slate-500 rounded-2xl p-4 my-5">
            {successStatusMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportTraineeDetailsFromGoogleSheet;
