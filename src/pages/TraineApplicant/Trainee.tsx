/* eslint-disable */
import React, { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import * as icons from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BrowserRouter as Router, Link } from "react-router-dom";
import pagination from "../../components/pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTraineess } from "../../redux/actions/TraineeAction";
import { connect, useSelector } from "react-redux";
import Modal from "./modal";
import NavBar from "../../components/sidebar/navHeader";
import {
  softdeletetraine,
  deletetraine,
  fetchtraine,
} from "../../redux/actions/deletetraine";
import { useAppDispatch } from "../../hooks/hooks";
import { getAllCycles } from "../../redux/actions/cyclesActions";

const AddTrainee = (props: any) => {
  const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);
  function open() {
    setAddNewTraineeModel(true);
  }

  // LIST ALL TRAINEE
  const { alltrainees, delettraine, softdeletettraine, traines } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setiIemsPerPage] = useState(0);
  const [All, setAll] = useState(true);
  const input = {
    page: page,
    itemsPerPage: itemsPerPage,
    All: All,
  };
  useEffect(() => {
    props.getAllTraineess(input);
    props.getAllCycles();
  }, []);
  const trainees = alltrainees.data;
  const traine = traines.message;
  useEffect(() => {
    dispatch(fetchtraine());
  }, [delettraine, softdeletettraine]);
  const [moredrop, setmoredrop] = useState("");
  const onSubmitHandler = (userid: any) => {
    if (!moredrop) setmoredrop(userid);
    if (moredrop) setmoredrop("");
  };
  const onSubmitHandle = async (userId: any) => {
    await dispatch(deletetraine(userId));
    setmoredrop("");
  };
  const onSubmitHandlesoft = async (userId: any) => {
    await dispatch(softdeletetraine(userId));
    setmoredrop("");
  };

  console.log(props);

  //pagination
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    paging,
    gaps,
    setPaging,
    totalPages,
  } = pagination({
    contentPerPage: 10,
    count: traine?.length,
  });
  return (
    <>
      <ToastContainer />
      {/* =========================== Start:: addnewtraineeModel =============================== */}
      <div
        className={`h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 ${
          addNewTraineeModel === true ? "block" : "hidden"
        }`}
      >
        <Modal cycles={props.cycles.data} />
      </div>
      {/* =========================== End:: addnewtraineeModel =============================== */}
      <div className="flex flex-col  h-screen absolute w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden lg:ml-[3rem]">
                <div className="flex items-left px-7 lg:px-64 pt-24">
                  <div className="flex px-5 py-2 pb-8 w-fit">
                    <button
                      onClick={open}
                      className="flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer"
                    >
                      <icons.AiOutlinePlus className="mt-1 mr-1 font-bold" />{" "}
                      Trainee
                    </button>
                    <div></div>
                  </div>

                  <Link to="/filter_trainee">
                    <button className="flex bg-primary rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer">
                      <icons.AiOutlineSearch className="mt-1 mr-1 font-bold" />{" "}
                      Search
                    </button>
                  </Link>
                </div>
                <div className="px-3 md:px-8">
                  <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10">
                    <div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll">
                          <table className="min-w-full leading-normal">
                            <thead className=" w-full px-32 sticky top-0">
                              <tr>
                                <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"firstname"}
                                </th>

                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                  {"lastname"}
                                </th>

                                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {('gender')}
                                </th> */}
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"email"}
                                </th>
                                {
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    {"cycle"}
                                  </th>
                                }
                                <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {"action"}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="overflow-y-auto">
                              {props.traines?.message
                                ?.slice(firstContentIndex, lastContentIndex)
                                ?.map((item: any) =>
                                  item.delete_at == false ? (
                                    <tr>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="flex">
                                          <div className="">
                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                              {item.firstName}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="flex items-center">
                                          <div className="">
                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                              {item.lastName}
                                            </p>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="flex items-center">
                                          <div className="">
                                            <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                              {item.email}
                                            </p>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="flex items-center">
                                          <div className="">
                                            <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                              {item.cycle_id.name}
                                            </p>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <div>
                                          <HiDotsVertical
                                            className=" text-black text-3xl ml-6 font-size-6 cursor-pointer"
                                            onClick={(e: any) => {
                                              e.preventDefault();
                                              onSubmitHandler(item.id);
                                            }}
                                          />
                                          <div
                                            className={`${
                                              moredrop === item.id
                                                ? "block"
                                                : "hidden"
                                            } absolute  bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                            id="dropdown"
                                          >
                                            <ul
                                              className="py-1"
                                              aria-labelledby="dropdown"
                                            >
                                              <li>
                                                <div
                                                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                                                  onClick={(e: any) => {
                                                    e.preventDefault();
                                                    onSubmitHandlesoft(item.id);
                                                  }}
                                                >
                                                  Soft Delete
                                                </div>
                                              </li>
                                              <li>
                                                <div
                                                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                                                  onClick={(e: any) => {
                                                    e.preventDefault();
                                                    onSubmitHandle(item.id);
                                                  }}
                                                >
                                                  Hard Delete
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        {/* </div> */}
                                      </td>
                                    </tr>
                                  ) : null
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //pagination */}
                  <div className="flex relative items-center justify-center gap-1  mb-10 lg:left-[100px]">
                    <button
                      onClick={prevPage}
                      data-testid="prev"
                      className={`page py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        page === 1 && "disabled"
                      }`}
                    >
                      {/* &larr; */}
                      Prev
                    </button>
                    <button
                      onClick={() => setPaging(1)}
                      data-testid="page1"
                      className={`page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        page === 1 && "disabled"
                      }`}
                    >
                      1
                    </button>
                    {gaps.paginationGroup.map((el) => (
                      <button
                        onClick={() => setPaging(el)}
                        data-testid="page2"
                        key={el}
                        className={`page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                          page === el ? "active" : ""
                        }`}
                      >
                        {el}
                      </button>
                    ))}
                    <button
                      onClick={() => setPaging(totalPages)}
                      data-testid="page3"
                      className={`page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        page === totalPages && "disabled"
                      }`}
                    >
                      {totalPages}
                    </button>
                    <button
                      onClick={nextPage}
                      data-testid="next"
                      className={`page py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        page === totalPages && "disabled"
                      }`}
                    >
                      {/* &rarr; */}
                      Next
                    </button>
                  </div>
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

// export default AddTrainee;

const mapState = (state: any) => ({
  alltrainees: state.trainee,
  delettraine: state.deletetraine,
  softdeletettraine: state.softdeletetraine,
  traines: state.traine,
  cycles: state.cycles,
});

export default connect(mapState, {
  getAllTraineess,
  deletetraine,
  softdeletetraine,
  fetchtraine,
  getAllCycles,
})(AddTrainee);
