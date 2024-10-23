/** @format */
/* codeclimate-disable */

import React, { useEffect, useState, useMemo, useRef } from "react";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import NavBar from "../../components/sidebar/navHeader";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import CheckBox from "../../components/CkeckBox";
import Select from "react-select";
import { FaCaretDown } from "react-icons/fa";
import Threedots from "../../components/Dropdown/Threedots";
import { 
    getAllFilteredJobPosts, 
    getAllJobPosts, 
    sendBulkyEmail } from "../../redux/actions/filterJobPost";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTheme } from "../../hooks/darkmode";
import { Link } from "react-router-dom";
import {
  DOTS,
  useCustomPagination,
} from "../../components/Pagination/useCustomPagination";
import { updateTraineeStatus } from "../../redux/actions/updateStatus";
import Pagination from "../../components/pagination2/pagination2";
import Tinymce from "../../components/tinymce/Tinymce";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { toast } from "react-toastify";
export const customTheme = (theme: any) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      text: "light-gray",
      primary25: "#E5E7EB",
      primary: "#d6dfdf",
      neutral0: "white",
    },
  };
};

export const darkTheme = (theme: any) => {
  return {
    ...theme,
    colors: {
      primary25: "#404657",
      primary: "#d6dfdf",
      neutral0: "#293647",
    },
  };
};

//tynmce editor
// const editorRef = useRef();
// const editorRef = useRef(null);

const input= {
  page:1,
  itemsPerPage:1,
  All:true,
  wordEntered:"reading",
  filterAttribute:"title",
}

const FilterJobPost = (props: any) => {
  const { theme, setTheme } = useTheme();
  console.log("props:",props);
  const [filterAttribute, setFilterAttribute] = useState("");
  const [enteredWord, setEnteredWord] = useState("");
  const [enteredsubmitWord, setenteredsubmitWord] = useState("");
  const [All, setAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalJobPosts: 0,
  });
  const [openSendModal, setOpenSendModal] = useState(false);
  const [to, setTo] = useState([""]);
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsActive(!isActive);
    }
  };
  console.log("to", to);
  const handleCloseSendModel = () => {
    setOpenSendModal(false);
  };
  const handleOpenSendModel = () => {
    setOpenSendModal(true);
    {
      rowsSelected.length != "" ? setTo(rowsSelected) : setTo([]);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const clearInpunt = () => {
    setenteredsubmitWord("");
    setEnteredWord("");
  };

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEnteredWord(enteredsubmitWord);
    }
  };

  const handleSendEmail = (e: any) => {
    e.preventDefault();

    const data = {
      to,
      subject,
      html,
    };

    props.sendBulkyEmail(data);
    setOpenSendModal(false);
  };
  console.log("to", to);
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
  // All job posts in DB
  const { allfilteredjobPosts, updateTraineeStatus, count } = props;
  const jobPostList = allfilteredjobPosts?.data;

  console.log("post:",jobPostList)
  const handleNullJobPostList = jobPostList === undefined ? [] : jobPostList;

  const [itemsPerPage, setitemsPerPage] = useState(10);

  const nonNullJobPost = handleNullJobPostList?.filter((value) => {
    return value !== null;
  });

  const nonDeletedJobPost = nonNullJobPost

  const traineeStatusUpdate = (id: any, status: any, cycle_id: any) => {
    const input = {
      id,
      status,
      cycle_id,
    };
    updateTraineeStatus(input);
  };
  const input = {
    page: 1,
    itemsPerPage: 5,
    All,
    wordEntered: enteredWord,
    filterAttribute:filterAttribute,
  };
  useEffect(() => {
    props.getAllFilteredJobPosts(input);
    props.getAllJobPosts()
  }, [enteredWord, filterAttribute]);

  const [me, setMe] = useState("Keroity");

  const handleMe = () => {
    setMe("Heroiks");
  };
  const COLS = [
    {
      Header: "Job Title",
      accessor: "",
      Cell: ({ row }: any) => {
        console.log(row.original)
        return (
          <div>
            <span>{row.original.title} </span>
          </div>
        );
      },
      visible: false,
    },
    {
      Header: "Program",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original.program.title}</div>;
      },
    },

    {
      Header: "Cycle",
      accessor: "",
      Cell: ({ row }: any) => {
        return <div>{row.original.cycle.name}</div>;
      },
    },
    {
      Header: "Cohort",
      accessor: "jobPost_id.cohort",
      Cell: ({ row }: any) => {
        return <div>{row.original.cohort.title}</div>;
      },
    },
    // {
      //   Header: "Status",
      //   accessor: "",
      //   Cell: ({ row }: any) => {
      //     return (
      //       <select
      //         defaultValue={row.original}
      //         id="status"
      //         className="dark:text-[#dbdee6] border bg-row-gray dark:bg-[#293647] border-solid border-bdr dark:border-cg dark:border-opacity-5 shadow-sm px-4 py-4px rounded-bt-rd focus:outline-none sm:text-sm"
      //         onChange={(e) => {
      //           traineeStatusUpdate(
      //             row.original.trainee_id._id,
      //             e.target.value,
      //             row.original.trainee_id.cycle_id.id
      //           );
      //         }}
      //       >
      //         <option value="">Active</option>
      //         <option value="">Not Active</option>
      //       </select>
      //     );
      //   },
      // },

      // {
      //   Header: "Actions",
      //   accessor: "",
      //   Cell: ({ row }: any) => {
      //     return (
      //       <Threedots useParentFx={() => handleMe()} min={row.original._id} />
      //     );
      //   },
      // },
  ];
  const columns = useMemo(() => COLS, []);
  const data = useMemo(() => nonDeletedJobPost, [allfilteredjobPosts]);
  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));
    setPageData((prevstate) => ({
      ...prevstate,
      isLoading: false,
      rowData: data,
      totalJobPosts: count.message,
    }));
  }, [currentPage, enteredWord, filterAttribute, itemsPerPage]);
  const initialState = {
    hiddenColumns: [
      "Deleted",
      "Description",
      "Duration",
    ],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // page,
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    // pageOptions,
    // gotoPage,
    // pageCount,
    setPageSize,
    state,
    prepareRow,
    allColumns,
    rows,
    getToggleHideAllColumnsProps,
    selectedFlatRows,
  }: any = useTable(
    {
      columns,
      data,
      initialState,
    },
    // usePagination,

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
  const rowsSelected = selectedFlatRows.map(
    (row) => row.original.id.email
  );
  console.log("rowsSelected", rowsSelected);

  function push(value: string): React.SetStateAction<never[]> {
    throw new Error("Function not implemented.");
  }

  // const paginationRange = useCustomPagination({
  //   totalPageCount: pageCount,
  //   currentPage: pageIndex,
  // });

  return (
    <>
      <div className="flex bg-[#F9F9FB] dark:bg-dark-bg  min-h-[100vh]">
        <div className="">
          <div className=" table table-fixed mt-[5rem] w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-[10%] md:px-[10px]">
            <div className="">
              <Select
                className="sm:text-sm w-40 rounded-bt-rd dark:text-ltb"
                options={[
                  { value: "_id", label: "Job Post ID" },
                  { value: "title", label: "Job Title" },
                  { value: "program", label: "Program" },
                  { value: "cycle", label: "Cycle" },
                  { value: "cohort", label: "Cohort" },
                  { value: "description", label: "Description" },
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
                    {enteredsubmitWord === "" ? (
                      <AiIcons.AiOutlineSearch />
                    ) : (
                      <AiIcons.AiOutlineClose />
                    )}
                  </svg>
                </span>
                <input
                  onChange={(e) => setenteredsubmitWord(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="dark:text-ltb block bg-row-gray dark:bg-[#293647] w-50 border border-bdr dark:border-cg dark:border-opacity-5 rounded-bt-rd mt-2 py-2 pl-9 pr-4 focus:outline-none sm:text-sm"
                  value={enteredsubmitWord}
                  placeholder="Search"
                  type="text"
                  name="search"
                />
              </div>

              <div className="mx-auto order-2 semi-sm:mt-2 lg:mr-0 block semi-md:mr-0">
                {/* <button className="bg-button-color dark:bg-green text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-0">
                  ADD INTERVIEWER
                </button> */}

                <Link to="/import_trainee-aplicants">
                  <button className="bg-button-color dark:bg-green text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                    IMPORT FROM
                  </button>
                </Link>
                {/* <button className="bg-button-color dark:bg-green text-ltb text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2">
                  EXPORT TO
                </button> */}
                <button
                  style={{
                    backgroundColor: isActive ? "#293647" : "#dbdee6",
                    color: isActive ? "white" : "#293647",
                  }}
                  onClick={() => handleOpenSendModel()}
                  className="text-fb font-medium ml-8 mt-2 pl-3 pr-3 py-1 rounded-bt-rd semi-sm:ml-2"
                >
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
                      <CheckBox
                        {...getToggleHideAllColumnsProps()}
                        checked={isChecked}
                      />{" "}
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
                          checked={isChecked}
                          // onChange={handleOnChange}
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
                    {nonDeletedJobPost?.length !== 0 ? (
                      rows?.map((row: any) => {
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
                                  onClick={handleOnChange}
                                  // checked={handleOnChange}
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
            <div className="py-3 flex items-center text-center justify-center pt-10">
              <Pagination
                totalRows={count.message}
                pageChangeHandler={setCurrentPage}
                rowsChangeHandler={setitemsPerPage}
                rowsPerPage={itemsPerPage}
              />
            </div>
          </div>
          <Modal
            open={openSendModal}
            onClose={handleCloseSendModel}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="absolute w-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%]">
              <form
                action=""
                onSubmit={handleSendEmail}
                className=" relative w-[100%] rounded-[5px] h-[555px] m-auto p-[10px] pt-[5px] dark:bg-dark-bg bg-[#f0f0f0] "
              >
                <h1 className="text-center font-bold dark:text-white text-[22px] m-[20px]">
                  New Email
                </h1>
                <IoIcons.IoClose
                  className="absolute top-[20px] right-[20px] text-[35px] cursor-pointer"
                  onClick={handleCloseSendModel}
                />
                <hr style={{ marginBottom: "4px" }} />
                <div>
                  <input
                    type="text"
                    name="to"
                    placeholder="To whom (Email...)"
                    value={to}
                    onChange={(e) => {
                      // setTo(rowsSelected);
                      setTo([...e.target.value.split(",")]);
                    }}
                    className=" mt-1 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    className=" mt-1 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]"
                  />
                </div>
                <div>
                  <div className=" mt-1 cursor-pointer text-[18px] self-center py-0 h-[10rem] my-[50px] mx-auto w-[90%] block px-[5px] md:w-[100%]">
                    <Editor
                      value={html}
                      onEditorChange={(Editorcontent) => {
                        setHtml(Editorcontent);
                      }}
                      init={{
                        height: 220,
                        //menubar: false,
                        placeholder: "Write your Email Here.....",
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  {/* <input
                    type="text"
                    name="message"
                    value={html}
                    onChange={(e) => {
                      setHtml(e.target.value);
                    }}
                    className=" mt-2 bg-lime cursor-pointer text-[18px] self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px] md:w-[90%]"
                  /> */}
                </div>
                <button
                  type="submit"
                  className="text-white border-[1px] border-[#a8a8a8] dark:bg-[#56C870] h-[40px] w-[100px] block rounded-[5px] my-[2px] mt-[5rem]  mx-[auto] bg-[#173b3f]"
                >
                  Send
                </button>
              </form>
            </Box>
          </Modal>
          <div></div>
        </div>
      </div>
    </>
  );
};

const mapState = (state: any) => ({
    allfilteredjobPosts: state.filterJobPost,
    errors: state.errors,
    count: state.count,
});

export default connect(mapState, {
  getAllFilteredJobPosts: getAllFilteredJobPosts,
  updateTraineeStatus: updateTraineeStatus,
  getAllJobPosts: getAllJobPosts,
  sendBulkyEmail: sendBulkyEmail,
})(FilterJobPost);
