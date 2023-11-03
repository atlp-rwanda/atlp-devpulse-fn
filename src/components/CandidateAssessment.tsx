import { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as BsFillGrid3X3GapFill from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import * as icons from 'react-icons/ai';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { connect, useSelector } from 'react-redux';
import {
    DOTS,
    useCustomPagination,
} from './Pagination/useCustomPagination';
import * as AiIcons from 'react-icons/ai';
import { getOneTraineeAllDetails } from "../redux/actions/trainnee";
import { useParams } from "react-router";

const CandidateAssessment = (props: any) => {

    const params = useParams();
    const [id, setId] = useState(params.id);
    const { candidate } = props;

    const assessment = [
        { id: 1, name: "Technical Assessment", job: "ATLP", grading: "general grading", status: "Rated" },
        { id: 2, name: "English Assessment", job: "ATLP", grading: "Recruiting 22", status: "Rated" },
        { id: 3, name: "Home Assessment", job: "ATLP", grading: "Recruiting 23", status: "No rating" },
        { id: 4, name: "Hackrank", job: "ATLP", grading: "Recruiting 24", status: "Rated" }
    ]
    const [rateCandidate, setrateCandidate] = useState(false);
    const [grading, setgrading] = useState("");
    const [cAssessment, setcAssessment] = useState("");
    const Open = () => {
        setrateCandidate(true);
    };
    const removeModel = () => {
        let newState = !rateCandidate;
        setrateCandidate(newState);
    };
 
    const [actionsList, setActionsList] = useState(null);


    const [moredrop, setmoredrop] = useState('');
    const onSubmitHandler = (userid: any) => {
        if (!moredrop) setmoredrop(userid);
        if (moredrop) setmoredrop('');
    };
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [All, setAll] = useState(false);

    let input = {
        id: id,
    };

    useEffect(() => {
        props.getOneTraineeAllDetails(input);
    }, []);

    const candidateInfo = candidate.data;

    const toogleActions = (id: any) => {
        setActionsList((prevState) => (!prevState ? id : null));
    };
    console.log(candidate.data);

    return (

        <>
            <ToastContainer />
            <div
                className={`h-screen w-full  bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 overflow-y-hidden z-50  ${rateCandidate === true ? 'block' : 'hidden'}`}
            >
                <div className="bg-white dark:bg-dark-bg w-full mt-48 mb-9 max-h-[900px] sm_:mt-40 sm_:mb-10 md_:max-h-full overflow-auto md_:w-[40%] md-sm:w-[95%] rounded-lg p-4 pb-8">
                    <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
                        <h3 className="font-bold text-md dark:text-white text-center w-11/12 ">
                            <icons.AiOutlineClose
                                className="float-right text-3xl cursor-pointer  hover:text-red-600"
                                onClick={() => removeModel()} />

                            {cAssessment}
                        </h3>
                        <hr className=" bg-primary border-b my-3 w-full" />
                    </div>
                    <div className="card-body">
                        <section className=" py-3 px-8">
                            <div className="input my-3 h-9 ">
                                <div className="grouped-input flex items-center h-full w-full rounded-md">
                                    <label
                                        htmlFor=""
                                        className="   dark:text-white py-3 rounded outline-none px-5 font-sans text-md font-semibold w-1/2 "
                                    >Quality:</label>
                                    <input
                                        type="number"
                                        className=" dark:bg-dark-tertiary border dark:text-white text-center border-primary py-2 ml-[10%] rounded outline-none px-5 font-sans text-base w-1/3 "
                                        min={0}
                                        max={2}
                                    />
                                </div>
                            </div>

                            <div className="input my-3 h-9 ">
                                <div className="grouped-input flex items-center h-full w-full rounded-md">
                                    <label
                                        htmlFor=""
                                        className="   dark:text-white py-3 rounded outline-none px-5 font-sans text-md font-semibold w-1/2 "
                                    >Quantity:</label>
                                    <input
                                        type="number"
                                        className=" dark:bg-dark-tertiary border dark:text-white text-center border-primary py-2 ml-[10%] rounded outline-none px-5 font-sans text-base w-1/3 "
                                        min={0}
                                        max={2}
                                    />
                                </div>
                            </div>
                            <button
                                className="flex justify-center rounded w-2/3 px-5 py-1 mt-10 mx-auto bg-green dark:text-white hover:border hover:border-green"
                                onClick={removeModel}
                            >
                                Save
                            </button>
                        </section>
                    </div>
                </div>
            </div>

            <div className="flex flex-col  h-screen absolute w-[100%]">
                <div className="flex flex-row">
                    <div className="w-full">
                        <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen overflow-x-hidden lg:ml-[3rem]">
                            <div className="flex items-left px-7 lg:px-64 pt-24">
                                <div className=" px-5 py-2 pb-8 w-fit">
                                    <div
                                        className="flex py-2 px-4 dark:text-white font-bold text-2xl"
                                    >
                                        <div className=' pr-3 mt-1 text-3xl'>
                                            <icons.AiOutlineSolution />
                                        </div>
                                        Candidate's Assessments
                                    </div>
                                    <div
                                        className="flex py-1 pl-6 mt-3 dark:text-white font-medium text-lg "
                                    >
                                        {candidateInfo?.trainee_id && (
                                            `${candidateInfo?.trainee_id?.firstName + " " + candidateInfo?.trainee_id?.lastName}`
                                        )}
                                    </div>
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
                                                                Assessment
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-center text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                                                Job Post
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-center text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                                                Grading system
                                                            </th>
                                                            <th className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-center text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                                                Status
                                                            </th>
                                                            <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="overflow-y-auto">
                                                        {assessment.map((item: any) => (
                                                            <tr
                                                                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                key={item.id}
                                                            >
                                                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                                    <div className="flex">
                                                                        <div className="">
                                                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                                                                {item?.name}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                                    <div className="flex">
                                                                        <div className="">
                                                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                                                                {item?.job}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                                    <div className="flex items-center">
                                                                        <div className="">
                                                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                                                                {item?.grading}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className=" border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                                    <div className=" flex justify-center">
                                                                        <div className="">

                                                                            <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                                                                {item?.status}
                                                                            </p>

                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className=" flex justify-center">
                                                                        <HiDotsVertical
                                                                            size={16}
                                                                            onClick={(e: any) => {
                                                                                e.preventDefault();
                                                                                toogleActions(item.id);
                                                                            }}
                                                                            className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer" />
                                                                        <div
                                                                            className={`${actionsList === item.id
                                                                                ? 'block'
                                                                                : 'hidden'} absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-30 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                                                            id="dropdown"
                                                                        >
                                                                            <ul
                                                                                className="py-1"
                                                                                aria-labelledby="dropdown"
                                                                            >

                                                                                <li>
                                                                                    {candidateInfo?.trainee_id && (<Link
                                                                                        to={`/candidate/assessment/${candidateInfo?.trainee_id.firstName + " " + candidateInfo?.trainee_id.lastName}`}
                                                                                        className="text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2"
                                                                                    >
                                                                                        Preview
                                                                                    </Link>)}
                                                                                </li>
                                                                                <li
                                                                                    className="text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                                                                    onClick={() => {
                                                                                        setrateCandidate(true)
                                                                                        setgrading(item.grading)
                                                                                        setcAssessment(item.name)
                                                                                    }}
                                                                                >

                                                                                    Rate
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
                                                    Assessments
                                                </label>
                                                {assessment.map((item: any) => (
                                                    <div
                                                        key={item._id}
                                                        className="flex flex-col w-full gap-2 border border-solid border-transparent border-t-black dark:border-t-white border-t-4 rounded-t-sm"
                                                    >
                                                        <div className="flex flex-col w-full mt-3">
                                                            <label className="text-left text-gray-400 text-sm">
                                                                Assessment
                                                            </label>
                                                            <label className="text-left text-black-text dark:text-white text-base font-normal">
                                                                {item?.name}
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col w-full">
                                                            <label className="text-left text-gray-400 text-sm">
                                                                Grading system
                                                            </label>
                                                            <label className="text-left text-black-text dark:text-white text-base font-normal">
                                                                {item?.grading}
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col w-full">
                                                            <label className="text-left text-gray-400 text-sm">
                                                                rates
                                                            </label>
                                                            <label className="text-left text-black-text dark:text-white text-base font-normal">
                                                                {item?.rating}
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col w-full">
                                                            <label className="text-left text-gray-400 text-sm">
                                                                Action
                                                            </label>
                                                            <div className="flex flex-row gap-2 mt-2">
                                                                <Link
                                                                    to={`/Job/Post/${item.id}`}
                                                                    className="text-white bg-green border border-solid border-green rounded-md px-2 text-xs"
                                                                >
                                                                    Preview
                                                                </Link>
                                                                <Link
                                                                    to={'#'}
                                                                    className="text-white bg-amber-400 border border-solid border-amber-400 rounded-md px-2 text-xs"
                                                                    onClick={() => {

                                                                    }}
                                                                >
                                                                    Rate
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="py-3 flex items-center text-center justify-center pt-10">
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
                                                    <button
                                                        className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                                                        onClick={() => setPage(page + 1)}
                                                        disabled
                                                    >
                                                        <AiIcons.AiOutlineRight />
                                                    </button>
                                                    <button
                                                        className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:disabled:bg-[#485970] dark:text-zinc-100"
                                                        onClick={() => {

                                                        }}
                                                        disabled
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
            </div></>
    );
};

const mapState = (state: any) => ({
    candidate: state.traineeAllDetails,
});

export default connect(mapState, {
    getOneTraineeAllDetails,
})(CandidateAssessment);

// export default CandidateAssessment;

