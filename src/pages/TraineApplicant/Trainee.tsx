/* eslint-disable */
import React, { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import * as icons from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
import pagination from "../../components/pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTraineess, createTrainee } from "../../redux/actions/TraineeAction";
import { connect, useSelector } from "react-redux";
// import Modal from "./modal";
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
const Open=() =>{
    setAddNewTraineeModel(true);
  }
  const removeModel = () => {
    // location.reload();
    let newState = !addNewTraineeModel;
    setAddNewTraineeModel(newState);
  };
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cycle_id, setCycleId] = useState("");
  // LIST ALL TRAINEE
  const { alltrainees, delettraine, softdeletettraine, traines,cycles } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
   

  const cycle=cycles.data;
  console.log("hello",cycle)

  const traine = traines.message;
  useEffect(() => {
    dispatch(fetchtraine(input));
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

// console.log("Here",props.traines)
const validation = () => {
  if (firstName === "") {
    toast.error("Enter your firstname");
    return;
  }
  if (lastName === "") {
    toast.error("Enter your Lastname");
    return;
  }
  if (email === "") {
    toast.error("Enter your Email");
    return;
  }
  if (cycle_id === "") {
    toast.error("select a cycle");
    return;
  } else {
    createNewTrainee();
  }
};
const createNewTrainee = () => {
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    cycle_id: cycle_id,
  };
  if (props.createTrainee(data)) {
    setFirstname("");
    setLastname("");
    setEmail("");
    //   toast.success("succeed")
    setAddNewTraineeModel(false);
    setTimeout(reload, 3000);
  }
};

function reload() {
  location.reload();
}
  return (
    <>
      <ToastContainer />
      {/* =========================== Start:: addnewtraineeModel =============================== */}
      <div
        className={`h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 ${
          addNewTraineeModel === true ? "block" : "hidden"
        }`}
      >
        {/* <Modal cycles={props.cycles.data} /> */}
        <div className="bg-white dark:bg-dark-bg w-full sm:w-[50%] xl:w-4/12 rounded-lg p-4 pb-8">
        <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
          <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
            <icons.AiOutlineClose
              className="float-right text-3xl cursor-pointer"
              onClick={() => removeModel()}
            />

            {"New Trainee"}
          </h3>
          <hr className=" bg-primary border-b my-3 w-full" />
        </div>
        <div className="card-body">
          <section className=" py-3 px-8">
            <div className="input my-3 h-9 ">
              <div className="grouped-input flex items-center h-full w-full rounded-md">
                <input
                  type="text"
                  name="gpa"
                  className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4"
                  placeholder={"FirstName"}
                  value={firstName}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input my-3 h-9 ">
              <div className="grouped-input flex items-center h-full w-full rounded-md">
                <input
                  type="text"
                  name="definition"
                  className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                  placeholder={"LastName"}
                  value={lastName}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input my-3 h-9 ">
              <div className="grouped-input flex items-center h-full w-full rounded-md">
                <input
                  type="text"
                  name="grade"
                  className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                  placeholder={"Email"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input my-3 h-9 ">
              <div className="grouped-input flex items-center h-full w-full rounded-md">
                <select
                  name="cycle"
                  id="cycle"
                  value={cycle_id}
                  className=" dark:bg-dark-tertiary border dark:text-white border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                  onChange={(e) => setCycleId(e.target.value)}
                >
                  <option className="dark:text-white " value="">--Please choose a cycle--</option>
                  {cycle?.map((cycle: any) => (
                    <option className="dark:text-white " value={cycle.id}>{cycle.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer m-auto"
              onClick={validation}
            >
              save
            </button>
          </section>
        </div>
      </div>
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
                      onClick={Open}
                      className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer"
                    >
                      <icons.AiOutlinePlus className="mt-1 mr-1 font-bold" />{" "}
                      Trainee
                    </button>
                    <div></div>
                  </div>

                  <Link to="/filter_trainee">
                    <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer">
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
                              {props.traines.message!== null
                              ?props.traines.message.slice(firstContentIndex, lastContentIndex).map((item: any) =>
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
                                              {item.cycle_id?item.cycle_id.name:'-'}
                                            </p>
                                          </div>
                                        </div>
                                      </td>

                                      <td>
                                        <div>
                                          <HiDotsVertical
                                            className=" text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                            onClick={(e: any) => {
                                              e.preventDefault();
                                              onSubmitHandler(item._id);
                                            }}
                                          />
                                          <div
                                            className={`${
                                              moredrop === item._id
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
                                                <Link to={`/trainees/${item._id}/edit`}
                                                className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                                >
                                                  Edit 
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to={`/trainee-details/${item._id}`}
                                                className="text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2"
                                                >
                                                  View
                                                </Link>
                                              </li>
                                              <li>
                                                <div
                                                  className="text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                                  onClick={(e: any) => {
                                                    e.preventDefault();
                                                    onSubmitHandlesoft(item._id);
                                                  }}
                                                >
                                                  Soft Delete
                                                </div>
                                              </li>
                                              <li>
                                                <div
                                                  className="text-sm hover:bg-gray-100 text-gray-700   dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                                  onClick={(e: any) => {
                                                    e.preventDefault();
                                                    onSubmitHandle(item._id);
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
                                  ) :null
                                ):null}
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
                    {totalPages?
                    <button
                      onClick={() => setPaging(totalPages)}
                      data-testid="page3"
                      className={`page py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        page === totalPages && "disabled"
                      }`}
                    >
                      {totalPages}
                    </button>:null}
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
  createTrainee,
})(AddTrainee);
