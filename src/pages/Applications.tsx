import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import * as icons from "react-icons/ai";
import { Link } from "react-router-dom";
import Select from "react-select";
import * as AiIcons from "react-icons/ai";
import {
  deleteApplication,
  getMyApplications,
  getSingleApplication,
} from "../redux/actions/applications";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import Box from "@mui/material/Box";
import { useCustomPagination } from "components/Pagination/useCustomPagination";

type Props = {};

interface Update {
  id: string;
  open: boolean;
}
const Applications = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { myApplications, currentApplication, loading } = props;
  console.log("My Applications:", myApplications);

  const [moredrop, setmoredrop] = useState("");
  const [filter, setFilter] = useState("submitted");
  const [pagination, setPagination] = useState({
    pageSize: 5,
    page: 1,
  });

  const [deleteWarn, setDeleteWarn] = useState<Update>({
    id: "",
    open: false,
  });

  const [displayApplication, setDisplayApplication] = useState({
    open: false,
  });
  const handleViewApplication = (application_id: any) => {
    try {
      dispatch(getSingleApplication(application_id));
    } catch (e) {
      console.log(e);
    }
  };
  const handleMoreOptions = (item_id: any) => {
    if (!moredrop) setmoredrop(item_id);
    if (moredrop) setmoredrop("");
  };

  const handleDeleteApplication = (item_id: any) => {
    try {
      dispatch(deleteApplication(item_id));
    } catch (e) {
      console.log(e);
    }
  };
  const handleDateOfSubmission = (dateString: any) => {
    const datePart = dateString.slice(0, dateString.indexOf("T"));
    return datePart;
  };
  useEffect(() => {
    const result = dispatch(getMyApplications(filter, pagination));

    if (
      result.error === "Oops! You must be logged in to proceed" ||
      result.error === "Session expired. Please login again to continue."
    ) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [filter, pagination, dispatch]);

  return (
    <>
      <div className="flex flex-col  h-screen w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden">
                <div className="flex items-left px-8 pt-1">
                  <Link to="/filter_trainee-applicants">
                    <button
                      className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer"
                      disabled
                    >
                      <icons.AiOutlineSearch className="mt-1 mr-1 font-bold" />{" "}
                      Search
                    </button>
                  </Link>
                </div>
                {/* Filter Bar */}
                <div>
                  <ul className=" flex dark:text-white semi-md:space-x-5 p-5  text-sm  lg:px-8 semi-md:flex-row sm:flex-col ">
                    <li
                      className={`${
                        filter === "submitted"
                          ? "underline underline-offset-8 decoration-green"
                          : ""
                      } cursor-pointer`}
                      onClick={() => setFilter("submitted")}
                    >
                      Submitted
                    </li>
                    <li
                      className={`${
                        filter === "withdrawn"
                          ? "underline underline-offset-8 decoration-green"
                          : ""
                      } cursor-pointer`}
                      onClick={() => setFilter("withdrawn")}
                    >
                      Withdrawn
                    </li>
                  </ul>
                </div>

                <div className="px-8">
                  <div className="bg-white  dark:bg-dark-bg shadow-lg px-7 py-8 rounded-md w-[100%] mx-auto">
                    <div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll">
                          <table className="min-w-full leading-normal">
                            <thead className=" w-full px-32 sticky top-0">
                              <tr>
                                <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"Title"}
                                </th>

                                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                  {'Description'}
                                </th> */}

                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"Date of submission"}
                                </th>
                                {
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    {"status"}
                                  </th>
                                }
                                <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"action"}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="overflow-y-auto">
                              {loading ? (
                                <tr>
                                  <td
                                    colSpan={4}
                                    className="text-center px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-lg text-gray-500"
                                  >
                                    Processing...
                                  </td>
                                </tr>
                              ) : myApplications.data?.totalCount === 0 ? (
                                <tr>
                                  <td
                                    colSpan={4}
                                    className="text-center px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-lg text-[#fff]"
                                  >
                                    Found 0 applications.
                                  </td>
                                </tr>
                              ) : (
                                myApplications.data?.applications.map(
                                  (item: any) => (
                                    <tr key={item._id}>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="flex">
                                          <div className="">
                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                              {item.associatedForm.title}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      {/* Other table data cells */}
                                      <td>
                                        <div>
                                          <HiDotsVertical
                                            className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                            onClick={(e: any) => {
                                              e.preventDefault();
                                              handleMoreOptions(item?._id);
                                            }}
                                          />
                                          <div
                                            className={`${
                                              moredrop === item?._id
                                                ? "block"
                                                : "hidden"
                                            } absolute bg-white dark:bg-dark-tertiary dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                            id="dropdown"
                                          >
                                            <ul
                                              className="py-1"
                                              aria-labelledby="dropdown"
                                            >
                                              <li>
                                                <div
                                                  className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white block px-4 py-2"
                                                  onClick={(e: any) => {
                                                    e.preventDefault();
                                                    setDisplayApplication({
                                                      open: true,
                                                    });
                                                    handleViewApplication(
                                                      item?._id
                                                    );
                                                  }}
                                                >
                                                  View
                                                </div>
                                              </li>
                                              <li>
                                                <div
                                                  className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white block px-4 py-2"
                                                  onClick={(e: any) => {
                                                    e.preventDefault();
                                                    setDeleteWarn({
                                                      id: item?._id,
                                                      open: true,
                                                    });
                                                  }}
                                                >
                                                  Withdraw
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )
                              )}
                            </tbody>
                          </table>
                          {deleteWarn.open && (
                            <div
                              className={`h-screen w-screen z-50 bg-black bg-opacity-10 backdrop-blur-sm absolute flex items-center justify-center  px-4 top-0 left-0 ${
                                deleteWarn.open === true ? "block" : "hidden"
                              }`}
                            >
                              <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] dark:bg-dark-bg bg-[#f0f0f0]">
                                <div className="block w-[300px] h-[200px] dark:bg-dark-bg  dark:text-white bg-[#f0f0f0] rounded-[5px]">
                                  <div className="text-center">
                                    <icons.AiFillExclamationCircle className="w-[40px] my-[20px] mx-auto text-[40px]" />
                                    <p className="w-[60%] m-auto font-bold">
                                      Are you sure you want to withdraw this
                                      application?
                                    </p>
                                  </div>
                                  <div className="flex flex-wrap my-[20px] mx-0">
                                    <button
                                      className="block text-white bg-[#940000] my-[10px] mx-auto rounded-[5px] w-[100px] h-[40px]"
                                      onClick={() => {
                                        console.log(deleteWarn.id);
                                        handleDeleteApplication(deleteWarn?.id);
                                        setDeleteWarn({
                                          ...deleteWarn,
                                          open: false,
                                        });
                                        setmoredrop("");
                                      }}
                                    >
                                      Withdraw
                                    </button>
                                    <button
                                      className="h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-auto bg-[#ABB8C3] text-[#fff]"
                                      onClick={() => {
                                        setDeleteWarn({
                                          ...deleteWarn,
                                          open: false,
                                        });
                                        setmoredrop("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </Box>
                            </div>
                          )}
                          {displayApplication.open && (
                            <div
                              className={`h-screen w-screen z-50 bg-black bg-opacity-10 backdrop-blur-sm absolute flex items-center justify-center  px-4 top-0 left-0 ${
                                displayApplication.open === true
                                  ? "block"
                                  : "hidden"
                              }`}
                            >
                              <Box className="absolute top-[55%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] dark:bg-dark-bg bg-[#f0f0f0]">
                                <div className="flex flex-col w-[100%] h-[100%] dark:bg-dark-tertiary  dark:text-white bg-[#f0f0f0] rounded-[5px] px-10">
                                  <div className="absolute right-0 top-0">
                                    <icons.AiOutlineClose
                                      className="mx-2 my-2  text-xl cursor-pointer hover:text-red-600"
                                      onClick={() =>
                                        setDisplayApplication({
                                          ...displayApplication,
                                          open: false,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="text-center">
                                    <p className="w-[80%] m-auto font-bold underline px-3 py-3 text-lg">
                                      {
                                        currentApplication.data?.associatedForm
                                          .title
                                      }
                                    </p>
                                  </div>
                                  <div className=" flex flex-col space-y-5  py-10">
                                    {/* FirstName */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">
                                        First Name:
                                      </p>
                                      <p className="font-sans">
                                        {" "}
                                        {currentApplication.data?.firstName}
                                      </p>
                                    </div>
                                    {/* LastName */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">
                                        Last Name:
                                      </p>
                                      <p className="font-sans">
                                        {" "}
                                        {currentApplication.data?.lastName}
                                      </p>
                                    </div>
                                    {/* Email */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">Email:</p>
                                      <p className="font-sans">
                                        {" "}
                                        {currentApplication.data?.email}
                                      </p>
                                    </div>
                                    {/* Address */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">Address:</p>
                                      <p className="font-sans">
                                        {" "}
                                        {currentApplication.data?.address}
                                      </p>
                                    </div>
                                    {/* Phone Number */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">
                                        Phone Number:
                                      </p>
                                      <p className="font-sans">
                                        {currentApplication.data?.telephone}
                                      </p>
                                    </div>
                                    {/* Gender */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">Gender:</p>
                                      <p className="font-sans">
                                        {" "}
                                        {currentApplication.data?.gender}
                                      </p>
                                    </div>
                                    {/* Interview Date */}
                                    <div className="flex space-x-3 md:space-x-2">
                                      <p className="font-semibold">
                                        Availability Date For Inteview:
                                      </p>
                                      <p className="font-sans">
                                        {
                                          currentApplication.data
                                            ?.availability_for_interview
                                        }
                                      </p>
                                    </div>
                                    {/* Submitted At */}
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">
                                        Submitted At:
                                      </p>
                                      <p className="font-sans">
                                        {currentApplication.data
                                          ?.dateOfSubmission !== undefined
                                          ? handleDateOfSubmission(
                                              currentApplication.data
                                                ?.dateOfSubmission
                                            )
                                          : null}
                                      </p>
                                    </div>
                                    <div className="flex space-x-3">
                                      <p className="font-semibold">Status:</p>
                                      <p className="font-sans">
                                        {" "}
                                        {currentApplication.data?.status}{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="py-3 flex items-center text-center justify-center pt-10">
                      <div className="pb-1">
                        <label htmlFor="" className="dark:text-zinc-100">
                          rows per page
                        </label>
                        <Select
                          menuPlacement="top"
                          className="sm:text-sm  w-13 rounded-bt-rd absolute active dark:bg-dark-frame-bg"
                          options={[
                            { value: "5", label: "5" },
                            { value: "50", label: "50" },
                            { value: "100", label: "100" },
                            { value: "500", label: "500" },
                            { value: "1000", label: "1000" },
                          ]}
                          defaultValue={{ value: "", label: "5" }}
                          onChange={(e: any) =>
                            setPagination({
                              page: 1,
                              pageSize: Number(e?.value),
                            })
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
                            className=" cursor-pointer disabled:cursor-default my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8] dark:disabled:bg-[#485970]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100"
                            onClick={() =>
                              setPagination({
                                page: 1,
                                pageSize: pagination.pageSize,
                              })
                            }
                            disabled={pagination.page <= 1}
                          >
                            <AiIcons.AiOutlineDoubleLeft />
                          </button>
                          <button
                            className=" cursor-pointer disabled:cursor-default border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:text-zinc-100 dark:disabled:bg-[#485970]"
                            onClick={() =>
                              setPagination({
                                page: pagination.page - 1,
                                pageSize: pagination.pageSize,
                              })
                            }
                            disabled={pagination.page <= 1}
                          >
                            <AiIcons.AiOutlineLeft />
                          </button>

                          <button
                            className={`border-solid border-[1px]  cursor-pointer border-[#a8a8a8] bg-[#fff] min-w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 rounded-[2px] md:hidden`}
                          >
                            {pagination.page}
                          </button>
                          <button
                            className=" cursor-pointer disabled:cursor-default border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                            onClick={() =>
                              setPagination({
                                page: pagination.page + 1,
                                pageSize: pagination.pageSize,
                              })
                            }
                            disabled={
                              pagination.page >=
                              Math.ceil(
                                myApplications?.data?.totalCount /
                                  pagination.pageSize
                              )
                            }
                          >
                            <AiIcons.AiOutlineRight />
                          </button>
                          <button
                            className=" cursor-pointer disabled:cursor-default my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                            onClick={() =>
                              setPagination({
                                pageSize: pagination.pageSize,
                                page: Math.ceil(
                                  myApplications?.data?.totalCount /
                                    pagination.pageSize
                                ),
                              })
                            }
                            disabled={
                              pagination.page >=
                              Math.ceil(
                                myApplications?.data?.totalCount /
                                  pagination.pageSize
                              )
                            }
                          >
                            <AiIcons.AiOutlineDoubleRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //pagination */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default Applications;

const mapState = (state: any) => ({
  myApplications: state.myApplications,
  currentApplication: state.currentApplication,
  loading: state.myApplications.loading,
});

export default connect(mapState, {
  getMyApplications,
  deleteApplication,
  getSingleApplication,
})(Applications);
