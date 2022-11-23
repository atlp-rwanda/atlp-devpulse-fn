import React, { useEffect, useState, useMemo } from "react";
import { getAllSoftDeletedTrainees } from "../../redux/actions/softDeletedTraineesActions";
import { restoretraine } from "../../redux/actions/restoreDelTrainee";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import CheckBox from "../../components/CkeckBox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "../../components/sidebar/navHeader";
import { clearTrash } from "../../redux/actions/clearTrash";
import Select from "react-select";
import { customTheme, darkTheme } from "../FilterTeainee/FilterTrainee";
import { useTheme } from "../../hooks/darkmode";

const Trash = (props: any) => {
  const { allTrainees, restore, clearTrashMessage } = props;
  const [pageIdx] = useState(1);
  const [itemsPerPage] = useState(100);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [traineid, settraineid] = useState("");
  const [filterAttribute, setFilterAttribute] = useState("");
  const [wordsEntered, setWordsEntered] = useState("");
  const { theme, setTheme } = useTheme();
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);

  useEffect(() => {
    const data = {
      page: pageIdx,
      itemsPerPage,
      filterAttribute,
      wordEntered: wordsEntered,
    };

    props.getAllSoftDeletedTrainees(data);
  }, [restore, clearTrashMessage, filterAttribute, wordsEntered]);
  const [moredrop, setmoredrop] = useState("");
  const trainees = allTrainees.data;
  const onSubmitHandler = (e: any) => {
    const traine = trainees[activeCycle!];
    settraineid(traine.id);
    props.restoretraine(traine.id);
    setAnchorEl(null);
  };
  const onSubmitHandle = async (userId: any) => {
    setmoredrop("");
  };

  const COLS = [
    {
      Header: "First name",
      accessor: "firstName",
    },
    {
      Header: "Last name",
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Actions",
      accessor: "",
      Cell: ({ row }: any) => {
        return (
          <div>
            <BsIcons.BsThreeDotsVertical
              onClick={(event) => {
                setActiveCycle(row.id);
                setAnchorEl(event.currentTarget as unknown as HTMLElement);
              }}
              style={{
                color: "#000",
                fontSize: "20px",
              }}
            />
          </div>
        );
      },
    },
  ];

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
      data: trainees,
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
  console.log("trashdata", page);
  const { pageIndex, pageSize } = state;

  const emptyRecycleBin = async () => {
    await props.clearTrash();
  };

  const clearInput = () => {
    setWordsEntered("");
  };

  return (
    <>
      <NavBar />
      <div className="flex bg-[#F9F9FB] min-h-[100vh] dark:bg-dark-bg dark:text-white">
        <div className="min-h-[50vh] w-[100%] block  md:w-[100%] md:mt-0  pl-[16rem] pt-[80px] md:pl-0">
          <div className=" w-[100%] top-[20%] md:top-[10%] md:relative px-[10%] md:px-[10px]">
            <div className="flex justify-between align-center mb-5 relative md:block">
              <div className="absolute bottom-0 right-0 md:relative md:mb-3">
                <button
                  onClick={emptyRecycleBin}
                  className="px-3 rounded-[5px] dark:bg-[#56C870] bg-[#173b3f] text-white flex items-center"
                >
                  Empty trash
                </button>
              </div>
              <div>
                <div className="">
                  <Select
                    className="test sm:text-sm border bg-cgray border-solid border-bdr w-40 rounded-bt-rd dark:text-ltb"
                    options={[
                      { value: "_id", label: "Trainee ID" },
                      { value: "firstName", label: "First Name" },
                      { value: "lastName", label: "Last Name" },
                      { value: "email", label: "Email" },
                      { value: "cycle_id._id", label: "Cycle ID" },
                      { value: "cycle_id.name", label: "Cycle Name" },
                      { value: "cycle_id.startDate", label: "Start Date" },
                      { value: "cycle_id.endDate", label: "End Date" },
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
                        className="h-5 w-5 fill-slate-300 text-cg cursor-pointer"
                        onClick={clearInput}
                        viewBox="-6 -6 20 20"
                      >
                        {wordsEntered === "" ? (
                          <AiIcons.AiOutlineSearch />
                        ) : (
                          <AiIcons.AiOutlineClose />
                        )}
                      </svg>
                    </span>
                    <input
                      onChange={(e) => setWordsEntered(e.target.value)}
                      className="dark:text-ltb dark:bg-[#293647] dark:border-opacity-5 block bg-row-gray w-50 border border-bdr rounded-bt-rd mt-2 py-2 pl-9 pr-4 focus:outline-none sm:text-sm"
                      value={wordsEntered}
                      placeholder="Search"
                      type="text"
                      name="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className=" w-[100%] dark:bg-dark-bg max-h-[70vh] m-auto  bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll 	md:w-[100%]">
                <table
                  {...getTableProps()}
                  className="border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap "
                >
                  <thead className=" w-full px-32 sticky top-0">
                    {headerGroups.map((headerGroup: any, index: number) => (
                      <tr
                        key={index}
                        {...headerGroup.getHeaderGroupProps()}
                        className="border-solid border-[1px] border-white dark:border-dark-tertiary even:bg-[#eef1f1] first:w-[20px]"
                      >
                        {headerGroup.headers.map(
                          (column: any, index: number) => (
                            <th
                              key={index}
                              {...column.getHeaderProps}
                              className="border-solid pl-[30px] h-[50px] text-left dark:bg-dark-tertiary bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] dark:border-dark-tertiary py-6   last:pl-[0px] w-[150px] last:w-[20px]  first:w-[20px]  "
                            >
                              {column.render("Header")}
                            </th>
                          )
                        )}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page?.map((row: any) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={row.original.id}
                          className="border-b dark:border-dark-tertiary border-gray-200 "
                          // className="even:bg-[#eef1f1] border-b border-gray-200 dark:border-dark-tertiary"
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
                    })}
                  </tbody>
                </table>
              </div>{" "}
            </div>
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
                  onSubmitHandler(e);
                }}
              >
                <BsIcons.BsArrowCounterclockwise className="mr-[5px] " />
                Restore
              </MenuItem>
            </Menu>

            <div className="block mx-auto my-0 w-[100%]  bottom-0 overflow-x-auto">
              <div className="w-[100%] flex items-center justify-center my-[30px]  mx-auto md:block md:mx-auto">
                <span className="flex items-center md:justify-center md:mt-[10px]">
                  {" "}
                  <button
                    className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <AiIcons.AiOutlineDoubleLeft />
                  </button>
                  <button
                    className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white"
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
                            className={`border-solid border-[1px] mx-[2px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${
                              pageIndex === i && "bg-[#eef1f1]"
                            }`}
                            onClick={(e: any) => {
                              const pageNumber = e.target.innerText;
                              gotoPage(pageNumber - 1);
                            }}
                          >
                            {pageOption + 1}
                          </button>
                        </div>
                      );
                    })}
                  </span>
                  <button
                    className=" border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <AiIcons.AiOutlineRight />
                  </button>
                  <button
                    className="my-0 mx-[5px] px-[5px] py-0 dark:border-dark-tertiary dark:bg-dark-bg dark:text-white text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
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

const mapState = (state: any) => ({
  allTrainees: state.softDeletedTrainees,
  restore: state.restore,
  clearTrashMessage: state.clearTrash,
  error: state.softDeletedTrainees,
});

export default connect(mapState, {
  getAllSoftDeletedTrainees,
  restoretraine,
  clearTrash,
})(Trash);
