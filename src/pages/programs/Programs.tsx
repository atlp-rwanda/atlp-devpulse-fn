import React, { useEffect, useState } from "react";
import NavBar from "../../components/sidebar/navHeader";
import * as icons from "react-icons/ai";
import { connect } from "react-redux";
import { createProgramAction } from "../../redux/actions/createProgramAction";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import programSchema from "../../validation/programSchema";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import Select from "react-select";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import { fetchPrograms } from "../../redux/actions/fetchProgramsAction";
import { deleteProgramAction } from "../../redux/actions/deleteProgramAction";
import { ToastContainer } from "react-toastify";

const Programs = (props: any) => {
  const { createProgramStates, fetchProgramStates, deleteProgramStates } =
    props;
  const [addNewProgramModal, setAddNewProgramModal] = useState(false);
  const [entries, setEntries] = useState<Array<string>>([]);
  const [submitData, setSubmitData] = useState({
    title: "",
    description: "",
    mainObjective: "",
    requirements: [""],
    modeOfExecution: "",
    duration: "",
  });
  const [actionsList, setActionsList] = useState(null);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    mainObjective: "",
    modeOfExecution: "",
    requirements: "",
    duration: "",
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
      duration:
        e.target.name === "duration" ? e.target.value : prevState.duration,
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
      duration: "",
    });

    setErrors({
      title: "",
      description: "",
      mainObjective: "",
      requirements: "",
      modeOfExecution: "",
      duration: "",
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
        duration: submitData.duration,
      };
      if (validateForm(submitData, programSchema)) {
        await dispatch(createProgramAction(obj));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(fetchProgramStates?.data?.length / itemsPerPage),
    currentPage: page,
  });
  const input = {
    page: page + 1,
    pageSize: itemsPerPage,
  };

  const toogleActions = (id: any) => {
    setActionsList((prevState) => (!prevState ? id : null));
  };

  const handleDelete = (id: any) => {
    try {
      props.deleteProgramAction({ id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    props.fetchPrograms(input);
  }, [page, itemsPerPage]);

  return (
    <>
      <ToastContainer />
      <div
        className={`w-[63.5rem] h-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center overflow-y-hidden ${
          addNewProgramModal === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full max-h-[900px]  overflow-auto md_:w-[65%] md-sm:w-[95%] rounded-lg p-4 pb-8">
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
                  <div className="flex flex-col items-start space-y-2">
                    <label className="font-bold text-black-text dark:text-white text-left">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      className=" dark:bg-dark-tertiary bg-slate-300 text-black dark:text-white py-2 px-5 rounded outline-none font-sans text-xs w-full"
                      placeholder={"e.g: 6 months..."}
                      value={submitData.duration}
                      onChange={handleInputChange}
                    />
                    {errors.duration && (
                      <span className="text-xs text-red-500">
                        {errors.duration}
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
      <div className="flex flex-col w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="bg-light-bg dark:bg-dark-frame-bg h-screen">
              <div className="flex items-left px-7">
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
              <div className="px-8">
                <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto">
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="hidden md_:inline-block w-full h-auto lg:min-w-full shadow rounded-lg overflow-y-hidden">
                        <table className="min-w-full leading-normal">
                          <thead className=" w-full px-32 sticky top-0">
                            <tr>
                              <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Program Name"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                {"Main objective"}
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Mode of execution"}
                              </th>
                              {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"Requirements"}
                              </th> */}
                              <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                {"action"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            {fetchProgramStates.data ? (
                              fetchProgramStates.data.map((item: any) => (
                                <tr
                                  className="dark:hover:bg-slate-700 hover:bg-slate-300 transition-colors"
                                  key={item._id}
                                >
                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex">
                                      <div className="">
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                          {item.title}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                          {item.mainObjective}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                          {item.modeOfExecution}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  {/* <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                    <div className="flex items-center">
                                      <div className="">
                                        {item.requirements
                                          .slice(0, 2)
                                          .map((req: any, index: any) => (
                                            <div key={req}>
                                              {index < 1 ? (
                                                <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                                  {`${index + 1}. ${req}`}
                                                </p>
                                              ) : (
                                                <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                                  {`...and ${
                                                    item.requirements.length -
                                                    index
                                                  } more`}
                                                </p>
                                              )}
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </td> */}
                                  <td>
                                    <div>
                                      <HiDotsVertical
                                        size={16}
                                        onClick={(e: any) => {
                                          e.preventDefault();
                                          toogleActions(item._id);
                                        }}
                                        className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                      />
                                      <div
                                        className={`${
                                          actionsList === item._id
                                            ? "block"
                                            : "hidden"
                                        } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                        id="dropdown"
                                      >
                                        <ul
                                          className="py-1"
                                          aria-labelledby="dropdown"
                                        >
                                          <li>
                                            <Link
                                              to={`/program/${item._id}/edit`}
                                              className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                            >
                                              Edit
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              to={`/program/${item._id}`}
                                              className="text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2"
                                            >
                                              View
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              to={`#`}
                                              onClick={() =>
                                                handleDelete(item._id)
                                              }
                                              className="text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                            >
                                              Delete
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td></td>
                                <td className="float-right text-fb p-5 font-normal text-stone-500 dark:text-stone-400">
                                  No data
                                </td>
                                <td></td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex md_:hidden flex-col gap-4 w-full rounded-lg">
                        <label className="text-left text-black-text dark:text-white text-lg font-bold">
                          Programs
                        </label>
                        {fetchProgramStates.data &&
                          fetchProgramStates.data.map((item: any) => (
                            <div
                              key={item._id}
                              className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                            >
                              <div className="flex flex-col w-full mt-3">
                                <label className="text-left text-gray-400 text-sm">
                                  Program Title
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {item.title}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Main objective
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {item.mainObjective}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Mode of execution
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {item.modeOfExecution}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Duration
                                </label>
                                <label className="text-left text-black-text dark:text-white text-base font-normal">
                                  {item.duration}
                                </label>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Requirements
                                </label>
                                <div className="flex flex-row">
                                  {item.requirements
                                    .slice(0, 2)
                                    .map((req: any, index: any) => (
                                      <div key={req}>
                                        {index < 1 ? (
                                          <label className="text-left text-black-text dark:text-white text-xs font-normal">
                                            {`${req} ${
                                              index + 1 !=
                                              item.requirements.length
                                                ? ","
                                                : ""
                                            }`}
                                          </label>
                                        ) : (
                                          <label className="text-left text-black-text dark:text-white text-xs font-normal">
                                            {`and ${
                                              item.requirements.length - index
                                            } more`}
                                          </label>
                                        )}
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div className="flex flex-col w-full">
                                <label className="text-left text-gray-400 text-sm">
                                  Action
                                </label>
                                <div className="flex flex-row gap-2 mt-2">
                                  <Link
                                    to={`/program/${item._id}/edit`}
                                    className="text-white bg-yellow-500 border border-solid border-yellow-500 rounded-md px-2 text-xs"
                                  >
                                    Edit
                                  </Link>
                                  <Link
                                    to={`/program/${item._id}`}
                                    className="text-white bg-green border border-solid border-green rounded-md px-2 text-xs"
                                  >
                                    View
                                  </Link>
                                  <Link
                                    to={"#"}
                                    className="text-white bg-red-700 border border-solid border-red-700 rounded-md px-2 text-xs"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {fetchProgramStates.data && (
                    <div className="py-3 flex items-center text-center justify-center pt-10">
                      <div className="pb-1">
                        <label htmlFor="" className="dark:text-zinc-100">
                          rows per page
                        </label>
                        <Select
                          menuPlacement="top"
                          className="sm:text-sm  w-13 rounded-bt-rd absolute active dark:bg-dark-frame-bg"
                          options={[
                            { value: "10", label: "10" },
                            { value: "50", label: "50" },
                            { value: "100", label: "100" },
                            { value: "500", label: "500" },
                            { value: "1000", label: "1000" },
                          ]}
                          defaultValue={{ value: "10", label: "10" }}
                          onChange={(e: any) =>
                            setItemsPerPage(Number(e?.value))
                          }
                        />
                      </div>
                      <div
                        className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                        aria-label="Pagination"
                      >
                        <div
                          className="relative z-0 inline-flex items-center ml-auto mr-auto  rounded-[2px] shadow-sm space-x-2"
                          aria-label="Pagination"
                        >
                          <button
                            className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8] dark:disabled:bg-[#485970]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100"
                            onClick={() => setPage(0)}
                            disabled={page <= 0}
                          >
                            <AiIcons.AiOutlineDoubleLeft />
                          </button>
                          <button
                            className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100 dark:disabled:bg-[#485970]"
                            onClick={() => setPage(page - 1)}
                            disabled={page <= 0}
                          >
                            <AiIcons.AiOutlineLeft />
                          </button>
                          {paginationRange?.map((pageNumber, idx) => {
                            if (pageNumber === DOTS) {
                              return (
                                <div
                                  key={idx}
                                  className="dark:text-zinc-100 md:hidden"
                                >
                                  ...
                                </div>
                              );
                            }

                            if (pageNumber - 1 === page) {
                              return (
                                <button
                                  key={idx}
                                  className={`border-solid border-[1px] cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden
                        ${page && "bg-[#d6dfdf] text-black"} 
                        ${page === 0 && "bg-[#d6dfdf] text-black"} 
                          `}
                                  onClick={() => setPage(pageNumber - 1)}
                                >
                                  {pageNumber}
                                </button>
                              );
                            }

                            return (
                              <button
                                key={idx}
                                className={`border-solid border-[1px]  cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden`}
                                onClick={() => setPage(pageNumber - 1)}
                              >
                                {pageNumber}
                              </button>
                            );
                          })}
                          <button
                            className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                            onClick={() => setPage(page + 1)}
                            // disabled={
                            //   page >=
                            //   Math.ceil(
                            //     fetchProgramStates.count / itemsPerPage
                            //   ) -
                            //     1
                            // }
                          >
                            <AiIcons.AiOutlineRight />
                          </button>
                          <button
                            // onClick={() =>
                            //   setPage(
                            //     Math.ceil(
                            //       fetchProgramStates.count / itemsPerPage
                            //     ) - 1
                            //   )
                            // }
                            // disabled={
                            //   page >=
                            //   Math.ceil(
                            //     fetchProgramStates.count / itemsPerPage
                            //   ) -
                            //     1
                            // }
                            className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                          >
                            <AiIcons.AiOutlineDoubleRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state: any) => ({
  createProgramStates: state.createProgram,
  fetchProgramStates: state.fetchPrograms,
  deleteProgramStates: state.deleteProgram,
});

export default connect(mapState, {
  fetchPrograms,
  createProgramAction,
  deleteProgramAction,
})(Programs);
