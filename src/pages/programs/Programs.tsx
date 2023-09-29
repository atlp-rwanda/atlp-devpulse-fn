import { useState } from "react";
import NavBar from "../../components/sidebar/navHeader";
import * as icons from "react-icons/ai";
import { connect } from "react-redux";
import { createProgramAction } from "../../redux/actions/createProgramAction";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import programSchema from "../../validation/programSchema";

const Programs = (props: any) => {
  const [addNewProgramModal, setAddNewProgramModal] = useState(false);
  const [entries, setEntries] = useState<Array<string>>([]);
  const [submitData, setSubmitData] = useState({
    title: "",
    description: "",
    mainObjective: "",
    requirements: [""],
    modeOfExecution: "",
  });
  const dispatch = useAppDispatch();
  const createProgramStates = useAppSelector((state) => state.createProgram);

  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    mainObjective: "",
    modeOfExecution: "",
    requirements: "",
  });

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setCurrentEntry((prevState) =>
      e.target.name === "entries" ? e.target.value : prevState
    );

    setSubmitData((prevState) => ({
      title: e.target.name === "title" ? e.target.value : prevState.title,
      description:
        e.target.name === "description"
          ? e.target.value
          : prevState.description,
      mainObjective:
        e.target.name === "mainObjective"
          ? e.target.value
          : prevState.mainObjective,
      requirements: prevState.requirements,
      modeOfExecution:
        e.target.name === "modeOfExecution"
          ? e.target.value
          : prevState.modeOfExecution,
    }));
  };

  const Open = () => {
    setAddNewProgramModal(true);
  };
  const removeModal = () => {
    let newState = !addNewProgramModal;
    setAddNewProgramModal(newState);

    setSubmitData({
      title: "",
      description: "",
      mainObjective: "",
      requirements: [""],
      modeOfExecution: "",
    });

    setErrors({
      title: "",
      description: "",
      mainObjective: "",
      requirements: "",
      modeOfExecution: "",
    });

    setEntries([]);
  };
  const addEntry = (entry: string) => {
    let itemFound = entries.find((item) => item === entry);
    if (!itemFound && entry !== "") {
      setEntries((prevState) => [...prevState, entry]);
    }
    setCurrentEntry("");
  };

  const removeEntry = (entry: string) => {
    setEntries(entries.filter((item) => item !== entry));
  };

  const validateForm = (data: any, schema: any) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) {
      //@ts-ignore
      setErrors({});
      return true;
    }

    const newErrors = {};
    error.details.forEach((detail: any) => {
      newErrors[detail.path[0]] = detail.message;
    });

    //@ts-ignore
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitData((prevState) => ({ ...prevState, requirements: entries }));

      const obj = {
        title: submitData.title,
        description: submitData.description,
        mainObjective: submitData.mainObjective,
        requirements: entries,
        modeOfExecution: submitData.modeOfExecution,
      };
      if (validateForm(submitData, programSchema)) {
        await dispatch(createProgramAction(obj));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //hehe
  return (
    <>
      <div
        className={`h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 overflow-auto ${
          addNewProgramModal === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full mt-48 mb-9 max-h-[900px] sm_:mt-40 sm_:mb-10 md_:max-h-full overflow-auto md_:w-[65%] md-sm:w-[95%] rounded-lg p-4 pb-8">
          <div className="card-title w-full flex flex-wrap justify-center items-center">
            <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
              <icons.AiOutlineClose
                className="float-right text-3xl cursor-pointer"
                onClick={() => removeModal()}
              />

              {"CREATE PROGRAM"}
            </h3>
            <div className="flex flex-col w-full mt-14 md_:mt-5">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md_:flex-row justify-center space-y-7 md_:space-x-7 md_:space-y-0"
              >
                <div className="flex flex-col w-full md_:w-[300px] space-y-3">
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <label className="font-bold text-black-text dark:text-white text-left">
                      Program Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white border border-white py-2 px-5 rounded outline-none font-sans text-xs w-full"
                      placeholder={"Program title"}
                      value={submitData.title}
                      onChange={handleInputChange}
                    />
                    {errors.title && (
                      <span className="text-xs text-red-500">
                        {errors.title}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-start space-y-2">
                    <label className="font-bold text-black-text dark:text-white text-left">
                      Program Description
                    </label>
                    <textarea
                      name="description"
                      className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white resize-none h-36 py-2 px-5 rounded outline-none font-sans text-xs w-full"
                      placeholder={"Program Description"}
                      value={submitData.description}
                      onChange={handleInputChange}
                    />
                    {errors.description && (
                      <span className="text-xs text-red-500">
                        {errors.description}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <label className="font-bold text-black-text dark:text-white text-left">
                      Main objective
                    </label>
                    <input
                      type="text"
                      name="mainObjective"
                      className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white py-2 px-5 rounded outline-none font-sans text-xs w-full"
                      placeholder={"e.g: Web development training..."}
                      value={submitData.mainObjective}
                      onChange={handleInputChange}
                    />
                    {errors.mainObjective && (
                      <span className="text-xs text-red-500">
                        {errors.mainObjective}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <label className="font-bold text-black-text dark:text-white text-left">
                      Mode of execution
                    </label>
                    <input
                      type="text"
                      name="modeOfExecution"
                      className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white py-2 px-5 rounded outline-none font-sans text-xs w-full"
                      placeholder={"e.g: self-paced online, in-person..."}
                      value={submitData.modeOfExecution}
                      onChange={handleInputChange}
                    />
                    {errors.modeOfExecution && (
                      <span className="text-xs text-red-500">
                        {errors.modeOfExecution}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md_:justify-start md_:items-center w-full md_:w-[300px] space-y-3">
                  <div className="flex flex-col items-start space-y-2">
                    <label className="font-bold text-black-text dark:text-white text-left">
                      Entry requirements
                    </label>
                    <div className="flex flex-row items-center space-x-3 w-full">
                      <input
                        type="text"
                        name="entries"
                        className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white py-2 px-5 rounded outline-none font-sans text-xs w-full"
                        placeholder={"Entry requirement"}
                        value={currentEntry}
                        onChange={handleInputChange}
                      />
                      {errors.requirements && (
                        <span className="text-xs text-red-500">
                          {errors.requirements}
                        </span>
                      )}

                      <button
                        type="button"
                        className="flex items-center justify-center bg-white text-dark-frame-bg transition-colors border border-black dark:border-transparent hover:bg-dark-frame-bg hover:text-white hover:border hover:border-white font-extrabold px-2 rounded"
                        onClick={() => addEntry(currentEntry)}
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2 overflow-auto">
                      <div className="flex flex-col p-3 max-h-14 md_:max-h-96">
                        {entries.length > 0 &&
                          entries.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-row items-center space-x-1"
                            >
                              <icons.AiOutlineArrowRight
                                size={13}
                                className="text-black-text dark:text-white"
                              />
                              <label className="text-black-text dark:text-white text-sm">
                                {item}
                              </label>
                              <button
                                type="button"
                                className="flex items-center justify-center bg-white text-dark-frame-bg rounded transition-colors border border-black dark:border-transparent hover:bg-dark-frame-bg hover:text-white hover:border hover:border-white font-extrabold px-2 h-4"
                                onClick={() => removeEntry(item)}
                              >
                                -
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={createProgramStates.loading}
                      className="flex justify-self-start self-start rounded w-15 px-5 py-1 mt-10 bg-green text-white transition-colors hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
                    >
                      {createProgramStates.loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  h-screen absolute w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen overflow-x-hidden lg:ml-[3rem]">
              <div className="flex items-left px-7 lg:px-64 pt-24">
                <div className="flex px-5 py-2 pb-8 w-fit">
                  <button
                    onClick={Open}
                    className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer"
                  >
                    <icons.AiOutlinePlus className="mt-1 mr-1 font-bold" />{" "}
                    Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

const mapState = (state: any) => ({
  createProgram: state.createProgram,
});

export default connect(mapState, {
  createProgramAction,
})(Programs);
