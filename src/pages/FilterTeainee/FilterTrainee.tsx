import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import NavBar from "../../components/sidebar/navHeader";
import * as AiIcons from "react-icons/ai";
import CheckBox from "../../components/CkeckBox";


import Select from "react-select";
import Threedots from "../../components/Dropdown/Threedots";
import { getAllFilteredTraineess } from "../../redux/actions/filterTraineeActions";


const FilterTrainee = (props: any) => {


    const [filterAttribute, setFilterAttribute] = useState("");
    const [enteredWord, setEnteredWord] = useState("");
    const [All, setAll] = useState(true);

    const customTheme = (theme: any) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                text: 'light-gray',
                primary25: "#E5E7EB",
                primary: 'cgray'
            }
        }
    }

    const clearInpunt = () => {
        setEnteredWord("")
    }

    // All trainees in DB
    const { allfilteredTrainees } = props;


    const traineeList = allfilteredTrainees.data
    console.log("afer useffect1", traineeList)
    console.log(props)

    const [pageIdx, setPageIdx] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const data = {
            page: pageIdx,
            itemsPerPage: 10,
            All,
            wordEntered: enteredWord,
            filterAttribute
        };
        console.log(" dATA SENT", data)
        props.getAllFilteredTraineess(data)
    }, [enteredWord, filterAttribute]);

    const COLS = [
        {
            Header: "Name",
            accessor: "",
            Cell: ({ row }: any) => {
                return (

                    <div>
                        {row.original.trainee_id.firstName + " " + row.original.trainee_id.lastName}
                    </div>
                )
            },
        },
        {
            Header: "Email",
            accessor: "trainee_id.email",
        },
        {
            Header: "Status",
            accessor: "",
            Cell: ({ row }: any) => {
                return (
                    <select defaultValue={""} id="status" className="border bg-row-gray border-solid border-bdr shadow-sm px-4 py-4px rounded-bt-rd focus:outline-none sm:text-sm">
                        <option value="" >Select value</option>
                        <option value="passed">Passed</option>
                        <option value="failed">Failed</option>
                        <option value="religated">Religated</option>
                    </select>
                );
            },
        },

        {
            Header: "Actions",
            accessor: "",
            Cell: ({ row }: any) => {

                return (
                    <Threedots />
                );
            },
        },
    ];
    console.log("pageIdx", pageIdx)

    const columns = useMemo(() => COLS, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
        rows,
        selectedFlatRows,
    }: any = useTable(
        {
            columns,
            data: traineeList,
        },
        usePagination,
        useRowSelect,
        (hooks: any) => {
            hooks.visibleColumns.push((columns: any) => {
                return [
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }: any) => (
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }: any) => (
                            <CheckBox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ];
            });
        }
    );
    const { pageIndex, pageSize } = state;
    return (
        <>
            <div className="flex bg-[#F9F9FB]">
                <NavBar />
                <div className="min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem] md:pl-0">
                    <div className=" table table-fixed mt-[5rem] w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-[10%] md:px-[10px]">
                        <div className="">
                            <Select
                                className="test sm:text-sm border bg-cgray border-solid border-bdr w-40 rounded-bt-rd"
                                options={[
                                    { value: "_id", label: "Trainee ID" },
                                    { value: "firstName", label: "First Name" },
                                    { value: "lastName", label: "Last Name" },
                                    { value: "email", label: "Email" },
                                    { value: "gender", label: "Gender" },
                                    { value: "birth_date", label: "Birth Date" },
                                    { value: "Address", label: "Address" },
                                    { value: "phone", label: "Phone Number" },
                                    { value: "field_of_study", label: "Field of Study" },
                                    { value: "education_level", label: "Education Level" },
                                    { value: "province", label: "Province" },
                                    { value: "district", label: "District" },
                                    { value: "sector", label: "Sector" },
                                    { value: "cohort", label: "Cohort" },
                                    { value: "isEmployed", label: "Employment Status" },
                                    { value: "haveLaptop", label: "Laptop Availability" },
                                    { value: "isStudent", label: "Student" },
                                    { value: "Hackerrank_score", label: "Hackerrank Score" },
                                    { value: "english_score", label: "English Score" },
                                    { value: "interview_decision", label: "Interview Decision" },
                                    { value: "past_andela_programs", label: "Attended Andela Programs" },
                                    { value: "", label: "Select by" },
                                ]}
                                defaultValue={{ value: '', label: 'Select by' }}
                                onChange={(e) => setFilterAttribute(`${e?.value}`)}
                                theme={customTheme}
                            />
                        </div>
                        <div className="flex items-center mb-6 semi-sm:flex-wrap">
                            <div className=" searchInputs relative block">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg className="h-5 w-5 fill-slate-300 text-cg cursor-pointer" onClick={clearInpunt} viewBox="-6 -6 20 20">
                                        {enteredWord === "" ? (
                                            <AiIcons.AiOutlineSearch />
                                        ) : (
                                            <AiIcons.AiOutlineClose />
                                        )}

                                    </svg>
                                </span>
                                <input onChange={(e) => setEnteredWord(e.target.value)} className="block bg-row-gray w-50 border border-bdr rounded-bt-rd mt-2 py-2 pl-9 pr-4 focus:outline-none sm:text-sm" value={enteredWord} placeholder="Search" type="text" name="search" />
                            </div>
                            <div className="ml-auto order-2 semi-sm:mt-2">
                                <button className="bg-button-color text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-0">
                                    ADD INTERVIEWER
                                </button>
                                <button className="bg-button-color text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                                    EXPORT TO
                                </button>
                                <button className="bg-cgray text-button-color text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                                    BULK EMAIL
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className=" w-[100%] max-h-[70vh] m-auto bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll md:w-[100%]">
                                <table
                                    {...getTableProps()}
                                    className="border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap"
                                >
                                    <thead className=" w-full px-32 sticky top-0">
                                        {headerGroups.map((headerGroup: any, index: number) => (
                                            <tr
                                                key={index}
                                                {...headerGroup.getHeaderGroupProps()}
                                                className="border-solid border-[1px] border-white even:bg-[#eef1f1] first:w-[20px]"
                                            >
                                                {headerGroup.headers.map(
                                                    (column: any, index: number) => (
                                                        <th
                                                            key={index}
                                                            {...column.getHeaderProps}
                                                            className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] py-6 last:pl-[0px] w-[150px] last:w-[20px] first:w-[20px]  "
                                                        >
                                                            {column.render("Header")}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                    {console.log("page", page)}
                                    {console.log("trainleist", traineeList)}
                                        {
                                            traineeList.length !== 0 ? (
                                                page.map((row: any) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr
                                                            {...row.getRowProps()}
                                                            key={row.original.id}
                                                            className="even:bg-[#eef1f1] border-b border-gray-200"
                                                        >
                                                            {row.cells.map((cell: any) => {
                                                                return (
                                                                    <td
                                                                        {...cell.getCellProps()}
                                                                        className="pl-[30px] text-left max-w-[150px] overflow-x-auto p-4 last:w-[2px] last:pl-[0px]"
                                                                    >
                                                                        {cell.render("Cell")}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td></td><td></td>
                                                    <td className="float-right text-fb p-5 font-normal text-stone-500">No data </td>
                                                    <td></td><td></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="block mx-auto my-0 w-[100%]  bottom-0 overflow-x-auto">
                            <div className="w-[100%] flex items-center justify-center my-[30px]  mx-auto md:block md:mx-auto">
                                <span className="flex items-center md:justify-center md:mt-[10px]">
                                    {" "}
                                    <button
                                        className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                                        onClick={() => gotoPage(0)}
                                        disabled={!canPreviousPage}
                                    >
                                        <AiIcons.AiOutlineDoubleLeft />
                                    </button>

                                    <button
                                        className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] "
                                        onClick={() => previousPage()}
                                        disabled={!canPreviousPage}
                                    >
                                        <AiIcons.AiOutlineLeft />
                                    </button>
                                    <span className="flex flex-wrap md:hidden " id="pages">
                                        {pageOptions?.map((pageOption: any, i: number) => {
                                            return (
                                                <div>
                                                    <button
                                                        className={`border-solid border-[1px] mx-[2px]  border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${pageIndex === i && "bg-[#eef1f1]"
                                                            }`}
                                                        onClick={(e: any) => {
                                                            const pageNumber = e.target.innerText;
                                                            gotoPage(pageNumber - 1);
                                                            setPageIdx(pageNumber)
                                                        }}
                                                    >
                                                        {pageOption + 1}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </span>
                                    <button
                                        className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                                        onClick={() => nextPage()}
                                        disabled={!canNextPage}
                                    >
                                        <AiIcons.AiOutlineRight />
                                    </button>
                                    <button
                                        className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                                        onClick={() => gotoPage(pageCount - 1)}
                                        disabled={!canNextPage}
                                    >
                                        <AiIcons.AiOutlineDoubleRight />
                                    </button>
                                </span>{" "}
                                <span className="flex ml-3 md:justify-center  text-center md:mt-3 md:ml-0">
                                    Page <strong>{pageIndex + 1} </strong>of{" "}
                                    <strong>{pageOptions.length}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = ({ filterTrainee }: any) => ({
    allfilteredTrainees: filterTrainee
});

export default connect(mapState, {
    getAllFilteredTraineess: getAllFilteredTraineess
})(FilterTrainee)

