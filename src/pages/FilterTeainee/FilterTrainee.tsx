/** @format */

import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import NavBar from "../../components/sidebar/navHeader";
import * as AiIcons from "react-icons/ai";
import CheckBox from "../../components/CkeckBox";
import Select from "react-select";
import Threedots from "../../components/Dropdown/Threedots";
import { FaCaretDown } from "react-icons/fa";
import { getAllFilteredTraineess } from "../../redux/actions/filterTraineeActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "../../hooks/darkmode";
import { Link } from "react-router-dom";

export const customTheme = (theme: any) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      text: "light-gray",
      primary25: "#E5E7EB",
      primary: "cgray",
      neutral0: "white",
    },
  };
};

export const darkTheme = (theme: any) => {
  return {
    ...theme,
    colors: {
      primary25: "#404657",
      primary: "cgray",
      neutral0: "#293647",
    },
  };
};

const FilterTrainee = (props: any) => {
  const { theme, setTheme } = useTheme();

  const [filterAttribute, setFilterAttribute] = useState("");
  const [enteredWord, setEnteredWord] = useState("");
  const [All, setAll] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const clearInpunt = () => {
    setEnteredWord("");
  };

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showTaggleOptions = () => {
    return (
      <div>
        <div className="flex">
          <div className="mr-[5px]">
            <CheckBox {...getToggleHideAllColumnsProps()} />{" "}
          </div>
          <div>Toggle All</div>
        </div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input
                type="checkbox"
                {...column.getToggleHiddenProps()}
                className="mr-[5px]"
              />
              {column.Header}
            </label>
          </div>
        ))}
      </div>
    );
  };
  // All trainees in DB
  const { allfilteredTrainees } = props;

  const traineeList = allfilteredTrainees?.data;
  const handleNullTraineeList = traineeList === undefined ? [] : traineeList;

  const [pageIdx, setPageIdx] = useState(1);
  const [itemsPerPage] = useState(10);

  const nonNullTrainee = handleNullTraineeList.filter((value) => {
    return value !== null;
  });

  const nonDeletedTrainee = nonNullTrainee?.filter((value) => {
    return value.trainee_id.delete_at == false;
  });

  useEffect(() => {
    const data = {
      page: pageIdx,
      itemsPerPage: 10,
      All,
      wordEntered: enteredWord,
      filterAttribute,
    };
    // console.log(" dATA SENT", data)
    props.getAllFilteredTraineess(data);
  }, [enteredWord, filterAttribute]);

  const [me, setMe] = useState("Keroity");

  const handleMe = () => {
    setMe("Heroiks");
  };

  const COLS = [
    {
      Header: "Name",
      accessor: "",
      Cell: ({ row }: any) => {
        return (
          <div>
            <span>{row.original.trainee_id.firstName} </span>
            <span className="semi-md-col:hidden">
              {row.original.trainee_id.lastName}
            </span>
          </div>
        );
      },
      visible: false,
    },
    {
      Header: "Email",
      accessor: "trainee_id.email",
    },
    {
      Header: "Deleted",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original.trainee_id.delete_at.toString()}</div>;
      },
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Birth Date",
      accessor: "",
      Cell: ({ row }: any) => {
        const humanDateFormat = new Date(
          parseInt(row.original.birth_date)
        ).toLocaleDateString();
        return <div>{humanDateFormat}</div>;
      },
    },
    {
      Header: "Phone number",
      accessor: "phone",
    },
    {
      Header: "Field of Study",
      accessor: "field_of_study",
    },
    {
      Header: "Education Level",
      accessor: "education_level",
    },
    {
      Header: "Province",
      accessor: "province",
    },
    {
      Header: "District",
      accessor: "district",
    },
    {
      Header: "Sector",
      accessor: "sector",
    },
    {
      Header: "Employment",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original.isEmployed.toString()}</div>;
      },
    },
    {
      Header: "Has Laptop",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original.haveLaptop.toString()}</div>;
      },
    },
    {
      Header: "Student",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original.isStudent.toString()}</div>;
      },
    },
    {
      Header: "Hackerrank Score",
      accessor: "Hackerrank_score",
    },
    {
      Header: "English Score",
      accessor: "english_score",
    },
    {
      Header: "Interview Decision",
      accessor: "interview_decision",
    },
    {
      Header: "Andela Programs",
      accessor: "past_andela_programs",
    },
    {
      Header: "Address",
      accessor: "Address",
    },
    {
      Header: "Status",
      accessor: "",
      Cell: ({ row }: any) => {
        return (
          <select
            defaultValue={""}
            id="status"
            className="dark:text-[#dbdee6] border bg-row-gray dark:bg-[#293647] border-solid border-bdr dark:border-cg dark:border-opacity-5 shadow-sm px-4 py-4px rounded-bt-rd focus:outline-none sm:text-sm"
          >
            <option value="">Select value</option>
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
          <Threedots useParentFx={() => handleMe()} min={row.original._id} />
        );
      },
    },
  ];

  const columns = useMemo(() => COLS, []);
  const data = useMemo(() => nonDeletedTrainee, [allfilteredTrainees]);
  const initialState = {
    hiddenColumns: [
      "trainee_id.firstName",
      "Deleted",
      "gender",
      "birth_date",
      "phone",
      "field_of_study",
      "education_level",
      "province",
      "district",
      "sector",
      "Employment",
      "Has Laptop",
      "Student",
      "Hackerrank_score",
      "english_score",
      "interview_decision",
      "past_andela_programs",
      "Address",
    ],
  };

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
    state,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  }: any = useTable(
    {
      columns,
      data,
      initialState,
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
      <div className="flex bg-[#F9F9FB] dark:bg-dark-bg min-h-[100vh]">
        <NavBar />
        <div className="min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem] md:pl-0">
          <div className=" table table-fixed mt-[5rem] w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-[10%] md:px-[10px]">
            <div className="">
              <Select
                className="sm:text-sm w-40 rounded-bt-rd dark:text-ltb"
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
                  {
                    value: "past_andela_programs",
                    label: "Attended Andela Programs",
                  },
                  { value: "", label: "Select by" },
                ]}
                defaultValue={{ value: "", label: "Select by" }}
                onChange={(e) => setFilterAttribute(`${e?.value}`)}
                theme={theme ? customTheme : darkTheme}
              />
            </div>
            <div className="flex items-center mb-6 semi-sm:flex-wrap">
              <div className=" searchInputs relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    className="h-5 w-5 fill-slate-300 text-cg dark:text-[#dbdee6] cursor-pointer"
                    onClick={clearInpunt}
                    viewBox="-6 -6 20 20"
                  >
                    {enteredWord === "" ? (
                      <AiIcons.AiOutlineSearch />
                    ) : (
                      <AiIcons.AiOutlineClose />
                    )}
                  </svg>
                </span>
                <input
                  onChange={(e) => setEnteredWord(e.target.value)}
                  className="dark:text-ltb block bg-row-gray dark:bg-[#293647] w-50 border border-bdr dark:border-cg dark:border-opacity-5 rounded-bt-rd mt-2 py-2 pl-9 pr-4 focus:outline-none sm:text-sm"
                  value={enteredWord}
                  placeholder="Search"
                  type="text"
                  name="search"
                />
              </div>

              <div className="mx-auto order-2 semi-sm:mt-2 lg:mr-0 block semi-md:mr-0">
                <button className="bg-button-color dark:bg-green text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-0">
                  ADD INTERVIEWER
                </button>

                <Link to="/import_trainee-aplicants">
                  <button className="bg-button-color dark:bg-green text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                    IMPORT FROM
                  </button>
                </Link>
                <button className="bg-button-color dark:bg-green text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                  EXPORT TO
                </button>
                <button className="bg-cgray text-button-color dark:bg-button-color dark:text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                  BULK EMAIL
                </button>
              </div>
            </div>
            <div>
              <div className="relative block">
                <button
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget as unknown as HTMLElement);
                  }}
                  className="flex items-center mb-4 py-2 px-7 w-50 rounded-bt-rd border bg-row-gray dark:bg-[#293647] border-solid border-bdr dark:border-cg dark:border-opacity-5 shadow-sm text-button-color dark:text-[#dbdee6]  text-fb font-medium"
                >
                  <h4>CHOOSE COLUMN</h4>
                  <span className="pl-3">
                    <FaCaretDown />
                  </span>
                </button>
              </div>
              <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                className="h-[23rem] mt-[8px]"
              >
                <MenuItem>
                  <div className="flex">
                    <div className="mr-[5px]">
                      <CheckBox {...getToggleHideAllColumnsProps()} />{" "}
                    </div>
                    <div className="text-[#173B3F] text-base">Toggle All</div>
                  </div>
                </MenuItem>
                {allColumns?.map((column) => (
                  <MenuItem>
                    <div key={column.id}>
                      <label className="text-[#173B3F] text-base">
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                          className="mr-[5px]"
                        />
                        {column.Header}
                      </label>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
              <div className=" w-[100%] max-h-[70vh] m-auto bg-[#fff] dark:bg-dark-bg shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll md:w-[100%]">
                <table
                  {...getTableProps()}
                  className="border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap"
                >
                  <thead className=" w-full px-32 sticky top-0">
                    {headerGroups?.map((headerGroup: any, index: number) => (
                      <tr
                        key={index}
                        {...headerGroup.getHeaderGroupProps()}
                        className="border-solid border-[1px] border-white dark:border-[#abb8c3] dark:border-opacity-10 even:bg-[#eef1f1] first:w-[20px]"
                      >
                        {headerGroup.headers.map(
                          (column: any, index: number) => (
                            <th
                              key={index}
                              {...column.getHeaderProps}
                              className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1] dark:bg-dark-frame-bg dark:text-ltb first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] dark:border-[#f3f4f5] dark:border-opacity-10 py-6 last:pl-[0px] w-[150px] last:w-[20px] first:w-[20px]"
                            >
                              {column.render("Header")}
                            </th>
                          )
                        )}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {nonDeletedTrainee?.length !== 0 ? (
                      page?.map((row: any) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={row.original.id}
                            className="even:bg-[#eef1f1] dark:even:bg-dark-frame-bg border-b dark:text-ltb border-gray-200 dark:border-cg dark:border-opacity-5"
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
                        <td></td>
                        <td></td>
                        <td className="float-right text-fb p-5 font-normal text-stone-500 dark:text-stone-400">
                          No data{" "}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
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
                            className={`border-solid border-[1px] mx-[2px]  border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${
                              pageIndex === i && "bg-[#eef1f1]"
                            }`}
                            onClick={(e: any) => {
                              const pageNumber = e.target.innerText;
                              gotoPage(pageNumber - 1);
                              setPageIdx(pageNumber);
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
                <span className="flex ml-3 md:justify-center dark:text-ltb text-center md:mt-3 md:ml-0">
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
  allfilteredTrainees: filterTrainee,
  errors: filterTrainee.errors,
});

export default connect(mapState, {
  getAllFilteredTraineess: getAllFilteredTraineess,
})(FilterTrainee);
