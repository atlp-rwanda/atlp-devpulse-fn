import React, { useState, useEffect } from "react";
// import { FaCaretDown } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
// import Dropdown from "../../components/Dropdown/Dropdown";
import Threedots from "../../components/Dropdown/Threedots";
import Select from "react-select";
import Sidebar from "../../components/sidebar/sidebar";
import { getAllFilteredTraineess } from "../../redux/actions/filterTraineeActions";
import { connect } from "react-redux";
import pagination from "../../components/pagination"


const FilterTrainee = (props: any) => {
    // const [select, setSelect] = useState<string>("");

    // All trainees in DB
    const { allfilteredTrainees } = props;
    const [page, setPage] = useState(0);
    const [itemsPerPage, setiIemsPerPage] = useState(0);
    const [All, setAll] = useState(true);
    const [filterAttribute, setFilterAttribute] = useState("");
    const [enteredWord, setEnteredWord] = useState("");
    // const [filteredData, setFilteredData] = useState<any[]>([]);
    let filterOptions;
    // let newFilterOptions;
    let traineeList;

    traineeList = allfilteredTrainees.data
    console.log("afer useffect1", traineeList)

    filterOptions = {
        page: page,
        itemsPerPage: itemsPerPage,
        All: All,
        wordEntered: enteredWord,
        filterAttribute: filterAttribute
    };

    console.log("checking2", filterOptions, typeof filterAttribute)

    // const handleFilter = (e) => {
    //     e.preventDefault();
    //     const searchWord = e.target.value
    //     setEnteredWord(searchWord)

    //     filterOptions = {
    //         page: page,
    //         itemsPerPage: itemsPerPage,
    //         All: All,
    //         wordEntered: searchWord,
    //         filterAttribute: filterAttribute
    //     };

    //     if (searchWord === "") {
    //         setFilteredData([])
    //     } else {
    //         setFilteredData(traineeList)
    //     }
    //     console.log("searchWord", searchWord, filteredData)
    // }

    useEffect(() => {
        props.getAllFilteredTraineess(filterOptions)
    }, [enteredWord, filterAttribute])

    const clearInpunt = () => {
        setEnteredWord("")
    }


    // Paginating all trainees
    // const {
    //     firstContentIndex,
    //     lastContentIndex,
    //     nextPage,
    //     prevPage,
    //     paging,
    //     gaps,
    //     setPaging,
    //     totalPages
    // } = pagination({ contentPerPage: 10, count: traineeList.length })

    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                text: 'light-gray',
                primary25: "#E5E7EB",
                primary: 'gray'
            }
        }
    }


    return (
        <div className="flex flex-row">
            <div className="">
                <Sidebar />
            </div>
            <div className="ml-24 mr-1 mt-36">
                <div className="">
                    {/* <button className="flex items-center border bg-row-gray border-solid border-bdr pl-8 pr-4 py-2 rounded-bt-rd">
                        <span className="">
                            <h4 className="text-gray sm:text-sm">Search by</h4>
                        </span>
                        <span className="pl-8 text-button-color"><FaCaretDown /></span>
                    </button> */}
                    <Select
                        className="test sm:text-sm border bg-gray border-solid border-bdr w-40 rounded-bt-rd"
                        options={[
                            { value: "gender", label: "Gender" },
                            { value: "fistName", label: "First Name" },
                            { value: "lastName", label: "Last Name" },
                            { value: "birth_date", label: "Birth date" },
                            { value: "education_level", label: "Education level" },
                            { value: "isEmployed", label: "Employment" },
                            { value: "", label: "Select by" },
                        ]}
                        defaultValue={{ value: '', label: 'Select by' }}
                        onChange={(e) => setFilterAttribute(`${e?.value}`)}
                        theme={customTheme}
                    />
                </div>
                <div className="flex items-center">
                    {/* <SearchBar placeholder="Search" data={TraineeData}/> */}
                    <div className=" searchInputs relative block ">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg className="h-5 w-5 fill-slate-300 text-cg cursor-pointer" onClick={clearInpunt} viewBox="-6 -6 20 20">
                                {enteredWord === "" ? (
                                    <AiOutlineSearch />
                                ) : (
                                    <AiOutlineClose />
                                )}

                            </svg>
                        </span>
                        <input onChange={(e) => setEnteredWord(e.target.value)} className="block bg-row-gray w-50 border border-bdr rounded-bt-rd mt-2 py-2 pl-9 pr-4 focus:outline-none sm:text-sm" value={enteredWord} placeholder="Search" type="text" name="search" />
                    </div>

                    <button className="bg-button-color text-ltb text-fb font-medium ml-72 mt-2 pl-3 pr-3 py-1 rounded-bt-rd">
                        ADD INTERVIEWER
                    </button>
                    <button className="bg-button-color text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd">
                        EXPORT TO
                    </button>
                    <button className="bg-gray text-button-color text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd">
                        BULK EMAIL
                    </button>
                </div>

                <div className="overflow-x-auto relative my-6 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-black-text">
                        <thead className="text-black-text bg-row-gray">
                            <tr className="border-b border-bdr">
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-black-text bg-gray rounded border-gray-300 focus:ring-gray dark:focus:ring-cg dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        {/* <label for="checkbox-all-search" className="sr-only">checkbox</label> */}
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Email
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3 px-10">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                traineeList.length !== 0 ? (
                                    traineeList?.map((value: any, key: any) => {
                                        return (
                                            <tr key={value._id} className="odd:bg-white even:bg-row-gray hover:bg-gray-50">
                                                <td className="p-4 w-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                                        {/* <label for="checkbox-table-search-1" className="sr-only">checkbox</label> */}
                                                        <label className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td scope="row" className="text-fb py-1 px-6 font-normal text-black-text whitespace-nowrap">
                                                    {value.trainee_id.firstName + " " + value.trainee_id.lastName}
                                                </td>
                                                <td className="text-fb py-1 px-6 font-normal text-black-text">
                                                    {value.trainee_id.email}
                                                </td>
                                                <td className="py-1 px-6">
                                                    <select defaultValue={""} id="status" className="border bg-row-gray border-solid border-bdr shadow-sm px-4 py-4px rounded-bt-rd focus:outline-none sm:text-sm">
                                                        <option value="" >Select value</option>
                                                        <option value="passed">Passed</option>
                                                        <option value="failed">Failed</option>
                                                        <option value="religated">Religated</option>
                                                    </select>
                                                </td>
                                                <td className="text-fb py-1 px-10">
                                                    <Threedots />
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td></td><td></td>
                                        <td className="float-right text-fb p-3 font-normal text-stone-500">No data </td>
                                        <td></td><td></td>
                                    </tr>
                                )

                            }
                            

                        </tbody>
                    </table>
                    <nav className="flex justify-between items-center pt-16 pb-10" aria-label="Table navigation">
                        <span className="pl-6 text-sm font-normal text-gray-500 dark:text-gray">Showing <span className="font-semibold text-gray-900">1-10</span> of <span className="font-semibold text-gray-900 ">1000</span></span>
                        <ul className="pr-6 inline-flex items-center -space-x-px">
                            <li>
                                <a href="#" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 ">3</a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</a>
                            </li>
                            <li>
                                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">100</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

const mapState = ({ filterTrainee }: any) => ({
    allfilteredTrainees: filterTrainee
})

export default connect(mapState, {
    getAllFilteredTraineess: getAllFilteredTraineess
})(FilterTrainee)