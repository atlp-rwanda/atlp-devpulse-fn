import { useEffect, useState } from 'react';
import NavBar from '../../components/sidebar/navHeader';
import * as BsIcons from 'react-icons/bs';
import * as BsFillGrid3X3GapFill from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import * as icons from 'react-icons/ai';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchJobPost } from '../../redux/actions/fetchJobPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { connect, useSelector } from 'react-redux';
import { createJobPostAction } from '../../redux/actions/createJobPostAction';
import {
  DOTS,
  useCustomPagination,
} from '../../components/Pagination/useCustomPagination';
import * as AiIcons from 'react-icons/ai';
import { getAllPrograms } from '../../redux/actions/programsActions';
import { getAllCycles } from '../../redux/actions/cyclesActions';
import { getAllCohorts } from '../../redux/actions/cohortActions';
import { deleteJobPostAction } from '../../redux/actions/deleteJobPostAction';

const Jobs = (props: any) => {
  const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);
  const Open = () => {
    setAddNewTraineeModel(true);
  };
  const removeModel = () => {
    let newState = !addNewTraineeModel;
    setAddNewTraineeModel(newState);
  };
  const [title, setTitle] = useState('');
  const [program, setProgram] = useState('');
  const [cycle, setCycle] = useState('');
  const [cohort, setCohort] = useState('');
  const [description, setDescription] = useState('');
  const { cycles, programs, cohorts } = props;

  //FETCH PROGRAMS
  const [fetchProgram, setfetchProgram] = useState([]);
  const [fetchCycle, setfetchCycle] = useState([]);
  const [fetchCohort, setfetchCohort] = useState([]);
  const [actionsList, setActionsList] = useState(null);

  // LIST ALL JOB POST
  const { jobs } = props;
  const dispatch = useAppDispatch();
  const fetchJobPostStates = useAppSelector((state) => state.fetchJobPost);
  useEffect(() => {
    dispatch(fetchJobPost());
  }, []);
  const [moredrop, setmoredrop] = useState('');
  const onSubmitHandler = (userid: any) => {
    if (!moredrop) setmoredrop(userid);
    if (moredrop) setmoredrop('');
  };
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [All, setAll] = useState(false);
  const input = {
    page: page + 1,
    itemsPerPage: itemsPerPage,
    All: All,
  };
  useEffect(() => {
    props.getAllPrograms();
    props.getAllCycles();
    props.getAllCohorts();
  }, []);

  const validation = () => {
    if (program === '') {
      toast.error('select a program');
      return;
    }
    if (cycle === '') {
      toast.error('select a cycle');
      return;
    }
    if (cohort === '') {
      toast.error('select a cohort');
      return;
    }
    if (description === '') {
      toast.error('Enter your description');
      return;
    } else {
      createNewJobPost();
    }
  };
  const createNewJobPost = () => {
    const data = {
      title: title,
      program: program,
      cycle: cycle,
      cohort: cohort,
      description: description,
    };
    if (props.createJobPostAction(data)) {
      setTitle('');
      setProgram('');
      setCycle('');
      setCohort('');
      setDescription('');
      setAddNewTraineeModel(false);
    }
  };
  const toogleActions = (id: any) => {
    setActionsList((prevState) => (!prevState ? id : null));
  };
  const handleDelete = (id: any) => {
    try {
      props.deleteJobPostAction({ id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    props.fetchJobPost(input);
  }, [page, itemsPerPage]);

  console.log(
    'Here',
    Math.ceil(jobs?.pagination.totalItems / itemsPerPage),
    page,
  );

  const paginationRange = useCustomPagination({
    totalPageCount: Math.ceil(jobs?.pagination.totalItems / itemsPerPage),
    currentPage: page,
  });
  return (
    <>
      <ToastContainer />
      {/* =========================== Start:: addnewJobPostModel =============================== */}
      <div
        className={`h-screen w-full z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 overflow-y-hidden  ${
          addNewTraineeModel === true ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full mt-48 mb-9 max-h-[900px] sm_:mt-40 sm_:mb-10 md_:max-h-full overflow-auto md_:w-[40%] md-sm:w-[95%] rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
              <icons.AiOutlineClose
                className="float-right text-3xl cursor-pointer"
                onClick={() => removeModel()}
              />

              {'New Job Post'}
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <section className=" py-3 px-8">
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="title"
                    className=" dark:bg-dark-tertiary border dark:text-white border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4"
                    placeholder={'Job Title'}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <select
                    name="program"
                    id="program"
                    className=" dark:bg-dark-tertiary border dark:text-white border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                    onChange={(e) => setProgram(e.target.value)}
                  >
                    <option className="dark:text-white " value="">
                      --Please choose a program--
                    </option>
                    {programs.data?.map((program: any) => (
                      <option className="dark:text-white " value={program._id}>
                        {program?.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <select
                    name="cycle"
                    id="cycle"
                    className=" dark:bg-dark-tertiary border dark:text-white border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                    onChange={(e) => setCycle(e.target.value)}
                  >
                    <option className="dark:text-white " value="">
                      --Please choose a cycle--
                    </option>
                    {cycles.data?.map((cycle: any) => (
                      <option className="dark:text-white " value={cycle.id}>
                        {cycle?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <select
                    name="cohort"
                    id="cohort"
                    className=" dark:bg-dark-tertiary border dark:text-white border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                    onChange={(e) => setCohort(e.target.value)}
                  >
                    <option className="dark:text-white " value="">
                      --Please choose a cohort--
                    </option>
                    {cohorts.data?.map((cohrt: any) => (
                      <option className="dark:text-white " value={cohrt.id}>
                        {cohrt?.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <textarea
                    name="description"
                    className=" dark:bg-dark-tertiary border dark:text-white border-primary h-35 py-2 rounded outline-none px-5 font-sans text-xs w-full mt-4"
                    placeholder={'Program Description'}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="flex justify-self-start self-start rounded w-15 px-5 py-1 mt-10 bg-green ml-56 text-white transition-colors hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
                onClick={validation}
              >
                Submit
              </button>
            </section>
          </div>
        </div>
      </div>
      {/* =========================== End:: addnewJobPostModel =============================== */}
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
                    <icons.AiOutlinePlus className="mt-1 mr-1 font-bold" /> Job
                    Post
                  </button>
                </div>
              </div>
              <div className="px-3 md:px-8">
                <div className="bg-white  dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10">
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="hidden md_:inline-block w-full h-auto lg:min-w-full shadow rounded-lg overflow-y-hidden">
                        <table className="min-w-full leading-normal">
                          <thead className=" w-full px-32 sticky top-0">
                            <tr>
                              <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Job Title
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                Program
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Cycle
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Cohort
                              </th>
                              {
                                // <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                //   Description
                                // </th>
                              }
                              <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            {fetchJobPostStates?.data?.map((item: any) => (
                              <tr
                                className="hover:bg-slate-700 transition-colors"
                                key={item.id}
                              >
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.title}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.program?.title}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      {item?.cycle && (
                                        <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                          {item?.cycle?.name}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.cohort?.title}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                {/* <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                  <div className="flex items-center">
                                    <div className="">
                                      <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                        {item?.description}
                                      </p>
                                    </div>
                                  </div>
                                </td> */}
                                <td>
                                  <div>
                                    <HiDotsVertical
                                      size={16}
                                      onClick={(e: any) => {
                                        e.preventDefault();
                                        toogleActions(item.id);
                                      }}
                                      className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                    />
                                    <div
                                      className={`${
                                        actionsList === item.id
                                          ? 'block'
                                          : 'hidden'
                                      } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                      id="dropdown"
                                    >
                                      <ul
                                        className="py-1"
                                        aria-labelledby="dropdown"
                                      >
                                        <li>
                                          <Link
                                            to={`#`}
                                            className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                          >
                                            Edit
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            to={`/Job/Post/${item.id}`}
                                            className="text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2"
                                          >
                                            View
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            to={`#`}
                                            onClick={() =>
                                              handleDelete(item.id)
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex md_:hidden flex-col gap-4 w-full rounded-lg">
                        <label className="text-left text-black-text dark:text-white text-lg font-bold">
                          Job POST
                        </label>
                        {fetchJobPostStates?.data?.map((item: any) => (
                          <div
                            key={item._id}
                            className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                          >
                            <div className="flex flex-col w-full mt-3">
                              <label className="text-left text-gray-400 text-sm">
                                Job Title
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.title}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Program
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.program?.title}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Cycle
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.cycle && (
                                  <p className="text-gray-900  dark:text-white whitespace-no-wrap">
                                    {item?.cycle?.name}
                                  </p>
                                )}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Cohort
                              </label>
                              <label className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.cohort?.title}
                              </label>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Description
                              </label>
                              <div className="text-left text-black-text dark:text-white text-base font-normal">
                                {item?.description}
                              </div>
                            </div>
                            <div className="flex flex-col w-full">
                              <label className="text-left text-gray-400 text-sm">
                                Action
                              </label>
                              <div className="flex flex-row gap-2 mt-2">
                                <Link
                                  to={`/Job/Post/${item.id}/edit`}
                                  className="text-white bg-yellow-500 border border-solid border-yellow-500 rounded-md px-2 text-xs"
                                >
                                  Edit
                                </Link>
                                <Link
                                  to={`/Job/Post/${item.id}`}
                                  className="text-white bg-green border border-solid border-green rounded-md px-2 text-xs"
                                >
                                  View
                                </Link>
                                <Link
                                  to={'#'}
                                  className="text-white bg-red-700 border border-solid border-red-700 rounded-md px-2 text-xs"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
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
                            { value: '10', label: '10' },
                            { value: '50', label: '50' },
                            { value: '100', label: '100' },
                            { value: '500', label: '500' },
                            { value: '1000', label: '1000' },
                          ]}
                          defaultValue={{ value: '', label: '10' }}
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
                        ${page && 'bg-[#d6dfdf] text-black'} 
                        ${page === 0 && 'bg-[#d6dfdf] text-black'} 
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
                            disabled={
                              page >=
                              Math.ceil(
                                jobs?.pagination.totalItems / itemsPerPage,
                              ) -
                                1
                            }
                          >
                            <AiIcons.AiOutlineRight />
                          </button>
                          <button
                            className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                            onClick={() =>
                              setPage(
                                Math.ceil(
                                  jobs?.pagination.totalItems / itemsPerPage,
                                ) - 1,
                              )
                            }
                            disabled={
                              page >=
                              Math.ceil(
                                jobs?.pagination.totalItems / itemsPerPage,
                              ) -
                                1
                            }
                          >
                            <AiIcons.AiOutlineDoubleRight />
                          </button>
                        </div>
                      </div>
                    </div>
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

const mapState = (state: any) => ({
  programs: state.programs,
  cycles: state.cycles,
  cohorts: state.cohorts,
  deleteJobPostStates: state.deleteJobPost,
  fetchJoPostStates: state.fetchJobPost,
});

export default connect(mapState, {
  getAllPrograms,
  getAllCycles,
  getAllCohorts,
  createJobPostAction,
  deleteJobPostAction,
  fetchJobPost,
})(Jobs);
