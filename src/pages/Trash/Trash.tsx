// import React, { useEffect, useState, useMemo } from "react";
// import { getAllSoftDeletedTrainees } from "../../redux/actions/softDeletedTraineesActions";
// import { restoretraine } from "../../redux/actions/restoreDelTrainee";
// import { connect } from "react-redux";
// import { useTable, usePagination, useRowSelect } from "react-table";
// import * as BsIcons from "react-icons/bs";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";
// import CheckBox from "../../components/CkeckBox";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import NavBar from "../../components/sidebar/navHeader";

// const Trash = (props: any) => {
//   console.log(props);
//   const { allTrainees, restore } = props;
//   const [pageIdx] = useState(1);
//   const [itemsPerPage] = useState(100);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [traineid, settraineid] = useState("");

//   const open = Boolean(anchorEl);
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);

//   useEffect(() => {
//     const data = {
//       page: pageIdx,
//       itemsPerPage,
//     };

//     props.getAllSoftDeletedTrainees(data);
//   }, [restore]);
//   const [moredrop, setmoredrop] = useState("");
//   const trainees = allTrainees.data;
//   const onSubmitHandler = (e: any) => {
//     const traine = trainees[activeCycle!];
//     settraineid(traine._id);
//     props.restoretraine(traine._id);
//     setAnchorEl(null);
//   };
//   const onSubmitHandle = async (userId: any) => {
//     setmoredrop("");
//   };
//   console.log(moredrop);

//   const COLS = [
//     {
//       Header: "First name",
//       accessor: "firstName",
//     },
//     {
//       Header: "Last name",
//       accessor: "lastName",
//     },
//     {
//       Header: "Email",
//       accessor: "email",
//     },
//     {
//       Header: "Actions",
//       accessor: "",
//       Cell: ({ row }: any) => {
//         return (
//           <div>
//             <BsIcons.BsThreeDotsVertical
//               onClick={(event) => {
//                 setActiveCycle(row.id);
//                 setAnchorEl(event.currentTarget as unknown as HTMLElement);
//               }}
//               style={{
//                 color: "#000",
//                 fontSize: "20px",
//               }}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   const columns = useMemo(() => COLS, []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     gotoPage,
//     pageCount,
//     setPageSize,
//     state,
//     prepareRow,
//     rows,
//     selectedFlatRows,
//   }: any = useTable(
//     {
//       columns,
//       data: trainees,
//     },
//     usePagination,
//     useRowSelect,
//     (hooks: any) => {
//       hooks.visibleColumns.push((columns: any) => {
//         return [
//           {
//             id: "selection",
//             Header: ({ getToggleAllRowsSelectedProps }: any) => (
//               <CheckBox {...getToggleAllRowsSelectedProps()} />
//             ),
//             Cell: ({ row }: any) => (
//               <CheckBox {...row.getToggleRowSelectedProps()} />
//             ),
//           },
//           ...columns,
//         ];
//       });
//     }
//   );
//   const { pageIndex, pageSize } = state;
//   return (
//     <>
//       <NavBar />
//       <div className="bg-[#F9F9FB] h-[100vh]">
//         <div className="flex">
//         <div className="min-h-[50vh] w-[100%] block  md:w-[100%] md:mt-0  pl-[16rem] pt-[80px] md:pl-0">
//           <div className=" w-[100%] top-[20%] md:top-[10%] md:relative px-[10%] md:px-[10px]">
//             <div className="flex justify-between align-center mb-6 mt-6 relative md:block">
//               <div className="absolute bottom-0 right-0 md:relative md:mb-3">
//                 <button className="px-3 rounded-[5px] bg-[#173b3f] text-white flex items-center">
//                   Empty trash
//                 </button>
//               </div>
//               <div>
//                 <div className="relative mb-2 w-[fit-content]">
//                   <IoIcons.IoMdArrowDropdown className="h-[1.5rem] w-[1.5rem] absolute box-border top-[50%] right-[2px] translate-y-[-50%]" />
//                   <input
//                     type="text"
//                     placeholder="Sort by"
//                     className="px-2 py-1 border border-[#999999] rounded-[5px]"
//                   />
//                 </div>

//                 <div className="relative" style={{ width: "fit-content" }}>
//                   <AiIcons.AiOutlineSearch className="h-[1.5rem] w-[1.5rem] absolute box-border top-[50%] right-[2px] translate-y-[-50%]" />
//                   <input
//                     type="search"
//                     placeholder="Search"
//                     className="px-2 pl-7 py-1 border border-[#999999] rounded-[5px]"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className=" w-[100%] max-h-[70vh] m-auto  bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll 	md:w-[100%]">
//                 <table
//                   {...getTableProps()}
//                   className="border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap "
//                 >
//                   <thead className=" w-full px-32 sticky top-0">
//                     {headerGroups.map((headerGroup: any, index: number) => (
//                       <tr
//                         key={index}
//                         {...headerGroup.getHeaderGroupProps()}
//                         className="border-solid border-[1px] border-white even:bg-[#eef1f1] first:w-[20px]"
//                       >
//                         {headerGroup.headers.map(
//                           (column: any, index: number) => (
//                             <th
//                               key={index}
//                               {...column.getHeaderProps}
//                               className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] py-6   last:pl-[0px] w-[150px] last:w-[20px]  first:w-[20px]  "
//                             >
//                               {column.render("Header")}
//                             </th>
//                           )
//                         )}
//                       </tr>
//                     ))}
//                   </thead>
//                   <tbody {...getTableBodyProps()}>
//                     {page.map((row: any) => {
//                       prepareRow(row);
//                       return (
//                         <tr
//                           {...row.getRowProps()}
//                           key={row.original.id}
//                           className="even:bg-[#eef1f1] border-b border-gray-200 "
//                         >
//                           {row.cells.map((cell: any) => {
//                             return (
//                               <td
//                                 {...cell.getCellProps()}
//                                 className="pl-[30px] text-left max-w-[150px] overflow-x-auto p-4 last:w-[2px] last:pl-[0px]"
//                               >
//                                 {cell.render("Cell")}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>{" "}
//             </div>
//             <Menu
//               id="basic-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               MenuListProps={{
//                 "aria-labelledby": "basic-button",
//               }}
//             >
//               <MenuItem
//                 onClick={(e) => {
//                   onSubmitHandler(e);
//                 }}
//               >
//                 <BsIcons.BsPencilFill className="mr-[5px]" />
//                 Restore
//               </MenuItem>
//             </Menu>

//             <div className="block mx-auto my-0 w-[100%]  bottom-0 overflow-x-auto">
//               <div className="w-[100%] flex items-center justify-center my-[30px]  mx-auto md:block md:mx-auto">
//                 <span className="flex items-center md:justify-center md:mt-[10px]">
//                   {" "}
//                   <button
//                     className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
//                     onClick={() => gotoPage(0)}
//                     disabled={!canPreviousPage}
//                   >
//                     <AiIcons.AiOutlineDoubleLeft />
//                   </button>
//                   <button
//                     className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] "
//                     onClick={() => previousPage()}
//                     disabled={!canPreviousPage}
//                   >
//                     <AiIcons.AiOutlineLeft />
//                   </button>
//                   <span className="flex flex-wrap md:hidden " id="pages">
//                     {pageOptions?.map((pageOption: any, i: number) => {
//                       return (
//                         <div>
//                           <button
//                             className={`border-solid border-[1px] mx-[2px]  border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${
//                               pageIndex === i && "bg-[#eef1f1]"
//                             }`}
//                             onClick={(e: any) => {
//                               const pageNumber = e.target.innerText;
//                               gotoPage(pageNumber - 1);
//                             }}
//                           >
//                             {pageOption + 1}
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </span>
//                   <button
//                     className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
//                     onClick={() => nextPage()}
//                     disabled={!canNextPage}
//                   >
//                     <AiIcons.AiOutlineRight />
//                   </button>
//                   <button
//                     className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
//                     onClick={() => gotoPage(pageCount - 1)}
//                     disabled={!canNextPage}
//                   >
//                     <AiIcons.AiOutlineDoubleRight />
//                   </button>
//                 </span>{" "}
//                 <span className="flex ml-3 md:justify-center  text-center md:mt-3 md:ml-0">
//                   Page <strong>{pageIndex + 1} </strong>of{" "}
//                   <strong>{pageOptions.length}</strong>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
      
//     </>
//   );
// };

// const mapState = (state: any) => ({
//   allTrainees: state.softDeletedTrainees,
//   restore: state.restore,
// });

// export default connect(mapState, { getAllSoftDeletedTrainees, restoretraine })(
//   Trash
// );



import React, { useEffect, useState, useMemo } from "react";
import { getAllSoftDeletedTrainees } from "../../redux/actions/softDeletedTraineesActions";
import { restoretraine } from "../../redux/actions/restoreDelTrainee";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import CheckBox from "../../components/CkeckBox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "../../components/sidebar/navHeader";
import { clearTrash } from "../../redux/actions/clearTrash";

const Trash = (props: any) => {
  console.log(props);
  const { allTrainees, restore, clearTrashMessage } = props;
  const [pageIdx] = useState(1);
  const [itemsPerPage] = useState(100);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [traineid, settraineid] = useState("");

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);

  useEffect(() => {
    const data = {
      page: pageIdx,
      itemsPerPage,
    };

    props.getAllSoftDeletedTrainees(data);
  }, [restore, clearTrashMessage]);
  const [moredrop, setmoredrop] = useState("");
  const trainees = allTrainees.data;
  const onSubmitHandler = (e: any) => {
    const traine = trainees[activeCycle!];
    settraineid(traine._id);
    props.restoretraine(traine._id);
    setAnchorEl(null);
  };
  const onSubmitHandle = async (userId: any) => {
    setmoredrop("");
  };
  console.log(moredrop);

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
  const { pageIndex, pageSize } = state;

const emptyRecycleBin =async () => {
  await props.clearTrash();
  // setTimeout(()=> window.location.reload(), 2000)
}

  return (
    <>
      <NavBar />
      <div className="flex bg-[#F9F9FB]">
        <div className="min-h-[50vh] w-[100%] block  md:w-[100%] md:mt-0  pl-[16rem] pt-[80px] md:pl-0">
          <div className=" w-[100%] top-[20%] md:top-[10%] md:relative px-[10%] md:px-[10px]">
            <div className="flex justify-between align-center mb-5 relative md:block">
              <div className="absolute bottom-0 right-0 md:relative md:mb-3">
                <button onClick={emptyRecycleBin} className="px-3 rounded-[5px] bg-[#173b3f] text-white flex items-center">
                  Empty trash
                </button>
              </div>
              <div>
                <div className="relative mb-2 w-[fit-content]">
                  <IoIcons.IoMdArrowDropdown className="h-[1.5rem] w-[1.5rem] absolute box-border top-[50%] right-[2px] translate-y-[-50%]" />
                  <input
                    type="text"
                    placeholder="Sort by"
                    className="px-2 py-1 border border-[#999999] rounded-[5px]"
                  />
                </div>

                <div className="relative" style={{ width: "fit-content" }}>
                  <AiIcons.AiOutlineSearch className="h-[1.5rem] w-[1.5rem] absolute box-border top-[50%] right-[2px] translate-y-[-50%]" />
                  <input
                    type="search"
                    placeholder="Search"
                    className="px-2 pl-7 py-1 border border-[#999999] rounded-[5px]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" w-[100%] max-h-[70vh] m-auto  bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll 	md:w-[100%]">
                <table
                  {...getTableProps()}
                  className="border-collapse w-[100%] m-auto rounded-[15px] whitespace-nowrap "
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
                              className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1]  first:rounded-tl-[10px] last:rounded-tr-[10px] border-b-[2px] border-[#c5c5c5] py-6   last:pl-[0px] w-[150px] last:w-[20px]  first:w-[20px]  "
                            >
                              {column.render("Header")}
                            </th>
                          )
                        )}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={row.original.id}
                          className="even:bg-[#eef1f1] border-b border-gray-200 "
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
                <BsIcons.BsArrowCounterclockwise className="mr-[5px]" />
                Restore
              </MenuItem>
            </Menu>

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

const mapState = (state: any) => ({
  allTrainees: state.softDeletedTrainees,
  restore: state.restore,
  clearTrashMessage: state.clearTrash,

});

export default connect(mapState, { getAllSoftDeletedTrainees, restoretraine, clearTrash })(
  Trash
);
