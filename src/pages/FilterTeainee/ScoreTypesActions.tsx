import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as icons from "react-icons/ai";
import {
  createScoreType,
  getAllScoreTypes,
  deleteScoreType,
  updateScoreType,
  getOneScoreType,
} from "../../redux/actions/scoreTypesActions";
import { useAppDispatch } from "../../hooks/hooks";
import { getAllScoreValues } from "../../redux/actions/scoreValueActions";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "../../components/sidebar/navHeader";
import DataTable from "components/TableData";
import filterTraineeReducer from "../../redux/reducers/filterTraineeReducer";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import Select from "react-select";
import { fetchPrograms } from "../../redux/actions/fetchProgramsAction";

const ScoreTypesActions = (props: any) => {
  const { scoreTypes, scoreValues, fetchProgramStates } = props;
  const dispatch = useAppDispatch();
  const allPrograms = fetchProgramStates.data;

  const scoreTypesData = scoreTypes.data;

  const scoreValuesArray = scoreValues.data?.map((values: any, idx: number) => {
    return values.score_id.score_type;
  });

  const scoreTypesArray = scoreTypesData?.map((dta: any) => {
    const filtered = scoreValuesArray?.filter((values: any) => {
      return values == dta.score_type;
    });

    return {
      id: dta.id,
      description: dta.description,
      modeOfEngagement: dta.modeOfEngagement,
      duration: dta.duration,
      startDate: dta.startDate,
      endDate: dta.endDate,
      title: dta.title,
    };
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [startdate, setStartdate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [program, setProgram] = useState("");
  const [engagement, setEngagement] = useState("");
  const [deleteScoreTypeId, setdeleteScoreTypeId] = useState("");
  const [updateScoreTypeId, setupdateScoreTypeId] = useState("");
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [score_type, setscore_type] = useState("");
  const [id, setId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [programDuration, setProgramDuration] = useState("");
  const [assessmentModel, setAssmentModel] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [page, setPage] = useState(0);
  const [openAssessment, setOpenAssessment] = useState(false);
  const handleCloseUpdateModal = (e: any) => {
    e.preventDefault();
    setOpenUpdateModel(false);
  };
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (e: any) => {
    const cycle = scoreTypesData[activeCycle!];

    setOpenUpdateModel(true);
    setscore_type(cycle.score_type);
    setupdateScoreTypeId(cycle.id);
    setId(cycle.id);
    setAnchorEl(null);
  };
  const handleSubmit = () => {
    const data = {
      description: description,
      duration: duration,
      endDate: endDate,
      modeOfEngagement: engagement, // This is assuming selectedOption is what you intended to use.
      program: program,
      startDate: startdate,
      title: title,
    };
    console.log(data);
    dispatch(createScoreType(data));
    props.createScoreType(data);
    setOpenCreateModal(false);
  };
  const handleOpenCreateCycle = () => {
    setAssmentModel(true);
    setOpenCreateModal(true);
  };
  const updateScoreType = () => {
    const data = {
      updateScoreTypeId,
      id,
      score_type,
    };
    props.updateScoreType(data);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const deleteScoreType = () => {
    const data = {
      deleteScoreTypeId,
    };

    props.deleteScoreType(data);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const removeModel = () => {
    // let newState = !assessmentModel;
    setAssmentModel(!assessmentModel);
  };

  const options = [
    { value: "remote", label: "remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "office", label: "Office" },
    { value: "online", label: "Online" },
  ];
  const [moredrop, setmoredrop] = useState("");
  const [singleViewModal, setsingleViewModal] = useState(false);
  const onSubmitHandler = (userid: any) => {
    if (!moredrop) setmoredrop(userid);
    if (moredrop) setmoredrop("");
  };
  const onSubmitHandlesoft = async (userId: any) => {
    // await dispatch(softdeletetraine(userId));
    // setmoredrop("");
  };

  const handleSelectChange = (e) => {
    setEngagement(e.target.value);
  };
  const handleViewAssessment = (assessment_id: any) => {
    try {
      dispatch(getOneScoreType(assessment_id));
    } catch (e) {
      console.log(e);
    }
  };

  const input = {
    page: page + 1,
    pageSize: itemsPerPage,
  };

  useEffect(() => {
    props.getAllScoreTypes();
    props.getAllScoreValues();
  }, []);
  useEffect(() => {
    props.fetchPrograms(input);
  }, [page, itemsPerPage]);
  return (
    <>
      <div className="flex bg-[#F9F9FB] min-h-[100vh] overflow-x-hidden">
        <div
          className={`h-screen w-full z-50 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 overflow-y-hidden ${
            singleViewModal === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-white dark:bg-dark-bg w-full mt-48 mb-9 max-h-[900px] sm_:mt-40 sm_:mb-10 md_:max-h-full overflow-auto md_:w-[65%] md-sm:w-[95%] rounded-lg p-4 pb-8">
            <div className="card-title w-full flex flex-wrap justify-center items-center">
              <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
                <icons.AiOutlineClose
                  className="float-right text-3xl cursor-pointer"
                  onClick={() => setsingleViewModal(false)}
                />
                {"Assessment details"}
              </h3>
              <div className="flex flex-col justify-center gap-3 mb-8">
                {scoreTypes.obj !== null ? (
                  <>
                    <div className="flex flex-col">
                      <h3 className="dark:text-white text-black">Title</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {scoreTypes.obj.title}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="dark:text-white text-black">
                        Program description
                      </h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {scoreTypes.obj.description}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="dark:text-white text-black">
                        Engagement mode
                      </h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {scoreTypes.obj.modeOfEngagement}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="dark:text-white text-black">Duration</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {`${scoreTypes.obj.duration} month(s)`}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="dark:text-white text-black">Program</h3>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        {scoreTypes.obj.program === null
                          ? "N/A"
                          : scoreTypes.obj.program}
                      </p>
                    </div>
                  </>
                ) : (
                  "loading..."
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[50vh] w-[100%] mt-10 md:w-[100%] md:mt-0 pl-[16rem] pt-[80px] md:pl-0 dark:bg-dark-frame-bg flex justify-start flex-col">
          {assessmentModel ? (
            <Modal
              open={openCreateModal}
              onClose={handleCloseCreateModel}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box className="absolute w-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-fit">
                <div className="bg-white dark:bg-dark-bg w-full rounded-lg p-4 pb-8">
                  <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
                    <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
                      <icons.AiOutlineClose
                        className="float-right text-3xl cursor-pointer"
                        onClick={() => removeModel()}
                      />

                      {"Assessment"}
                    </h3>
                    <hr className=" bg-primary border-b my-3 w-full" />
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="border border-[#333] border-1 dark:text-[#ffffff9f] bg-[#eaeaea] dark:bg-dark-bg rounded-[5px] p-2 w-fit md:mx-auto my-7 space-y-3"
                  >
                    <input
                      required
                      type="text"
                      placeholder="Title/Name"
                      className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                      value={title}
                      onChange={(e) => {
                        e.preventDefault();
                        setTitle(e.target.value);
                      }}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Description."
                      className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                      value={description}
                      onChange={(e) => {
                        e.preventDefault();
                        setDescription(e.target.value);
                      }}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Duration"
                      className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                      value={duration}
                      onChange={(e) => {
                        e.preventDefault();
                        setDuration(e.target.value);
                      }}
                    />
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold">----Start Date End Date----</p>
                      <div className="w-full flex flex-row space-x-2">
                        <input
                          required
                          type="date"
                          placeholder="Start date"
                          className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                          value={startdate}
                          onChange={(e) => {
                            e.preventDefault();
                            setStartdate(e.target.value);
                          }}
                        />
                        <input
                          required
                          type="date"
                          placeholder="End date"
                          className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                          value={endDate}
                          onChange={(e) => {
                            e.preventDefault();
                            setEndDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <select
                      required
                      className="dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                    >
                      <option value="" disabled>
                        ---Select Programs---
                      </option>
                      {allPrograms.map((program: any) => (
                        <option key={program._id} value={program._id}>
                          {program.title}
                        </option>
                      ))}
                    </select>
                    <select
                      required
                      className="dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans  py-2 w-full pt-4"
                      value={engagement}
                      onChange={handleSelectChange}
                    >
                      <option value="" disabled>
                        ---Select Engagement---
                      </option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      className="block text-white border border-[#333] dark:bg-[#56C870] border-1 bg-dark-bg rounded-[5px] p-2 w-[100px] mb-5 mx-auto"
                    >
                      SAVE
                    </button>
                  </form>
                </div>
              </Box>
            </Modal>
          ) : (
            ""
          )}
          <div className="">
            <div className="flex px-8 flex-row space-x-8">
              <button
                onClick={() => handleOpenCreateCycle()}
                className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer"
              >
                <icons.AiOutlinePlus className="mt-1 mr-1 font-bold" />{" "}
                Assessments
              </button>
            </div>
            <div className="bg-white  dark:bg-dark-bg shadow-lg rounded-md w-[100%] mx-auto lg:w-[95%]">
              <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll">
                    <table className="min-w-full leading-normal">
                      <thead className="w-full px-32 sticky top-0">
                        <tr>
                          <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                            {"Title"}
                          </th>
                          <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                            {"Description"}
                          </th>
                          <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                            {"Engagement Mode"}
                          </th>
                          <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                            {"Duration"}
                          </th>
                          <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                            {"Action"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scoreTypesArray?.map((values: any, i: number) => (
                          <tr key={i}>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                              <div className="flex">
                                <div className="">
                                  <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                    {values.title}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                              <div className="flex items-center">
                                <div className="">
                                  <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                    {values.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                              <div className="flex items-center">
                                <div className="">
                                  <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                    {values.modeOfEngagement}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                              <div className="flex items-center">
                                <div className="">
                                  <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                    {values.duration} month
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
                                    onSubmitHandler(values.id);
                                  }}
                                />
                                <div
                                  className={`${
                                    moredrop === values.id ? "block" : "hidden"
                                  } absolute right-10  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                  id="dropdown"
                                >
                                  <ul
                                    className="py-1"
                                    aria-labelledby="dropdown"
                                  >
                                    <li>
                                      <Link
                                        to={`/trainee-applicant/${values.id}/edit`}
                                        className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                      >
                                        Edit
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to={`#`}
                                        onClick={() => {
                                          handleViewAssessment(values.id);
                                          setsingleViewModal(true);
                                        }}
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
                                          onSubmitHandlesoft(values._id);
                                        }}
                                      >
                                        Delete
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                        { value: "10", label: "10" },
                        { value: "50", label: "50" },
                        { value: "100", label: "100" },
                        { value: "500", label: "500" },
                        { value: "1000", label: "1000" },
                      ]}
                      defaultValue={{ value: "", label: "10" }}
                      onChange={(e: any) => setItemsPerPage(Number(e?.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* })} */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={(e) => {
                handleOpenUpdateModal(e);
              }}
            >
              Update
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteScoreType();
              }}
            >
              Delete
            </MenuItem>
          </Menu>{" "}
          <Modal
            open={openUpdateModal}
            onClose={handleCloseUpdateModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="absolute w-fit top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[fit]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateScoreType();
                }}
                className="border border-[#333] border-1 bg-[#eaeaea] rounded-[5px] px-2 w-fit mx-auto "
              >
                <hr style={{ marginBottom: "40px" }} />
                <input
                  required
                  type="text"
                  name="score_type"
                  value={score_type}
                  placeholder="Enter new score type name"
                  onChange={(e) => {
                    e.preventDefault();
                    setscore_type(e.target.value);
                  }}
                  className="block border border-[#333] border-1 bg-[#ffffff] rounded-[5px] p-2 w-[260px] mx-auto mb-3"
                />
                <div className="flex flex-wrap w-[300px] m-auto">
                  <button
                    className="block text-white border border-[#333] border-1 bg-[#173b3f] rounded-[5px] p-2 w-[100px] mb-5 mx-auto"
                    type="submit"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
      <NavBar />
    </>
  );
};
const mapState = (state: any) => ({
  scoreTypes: state.scoreTypes,
  scoreValues: state.scoreValues,
  fetchProgramStates: state.fetchPrograms,
});

export default connect(mapState, {
  fetchPrograms,
  createScoreType,
  getAllScoreTypes,
  deleteScoreType,
  updateScoreType,
  getAllScoreValues,
})(ScoreTypesActions);
