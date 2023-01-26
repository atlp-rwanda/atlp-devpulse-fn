import { useTable, usePagination, useRowSelect } from "react-table";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { updateTraineeStatus } from "../../../redux/actions/updateStatus";
import { connect } from "react-redux";
import CheckBox from "../../../components/CkeckBox";
import { FaCaretDown } from "react-icons/fa";
import Threedots from "../../../components/Dropdown/Threedots";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Userxlsxtable = ({updateTraineeStatus, data, nonDeletedTrainee,setrowsSelected}) => {
  const traineeStatusUpdate = async(id: any, status: any, cycle_id: any) => {
    const input = {
      id,
      status,
      cycle_id,
    };
    await updateTraineeStatus(input);
  };
  const [me, setMe] = useState("Keroity");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsActive(!isActive);
    }
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            defaultValue={row.original.trainee_id.status}
            id="status"
            className="dark:text-[#dbdee6] border bg-row-gray dark:bg-[#293647] border-solid border-bdr dark:border-cg dark:border-opacity-5 shadow-sm px-4 py-4px rounded-bt-rd focus:outline-none sm:text-sm"
            onChange={(e) => {
              traineeStatusUpdate(
                row.original.trainee_id._id,
                e.target.value,
                row.original.trainee_id.cycle_id.id
              );
            }}
          >
            <option value="">Not Assigned</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="relegated">Relegated</option>
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
  const columns = useMemo(() => COLS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
  const rowsSelecte = selectedFlatRows.map(
    (row) => row.original.trainee_id.email
  );
  useEffect(()=>{
      setrowsSelected(rowsSelecte)
  },[selectedFlatRows])
  return(
        <>
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
                </>
                  );
}
const mapState = (state: any) => ({
  allfilteredTrainees: state.filterTrainee,
  errors: state.filterTrainee.errors,
  count: state.count,
});
export default connect(mapState, {
  updateTraineeStatus: updateTraineeStatus,
})(Userxlsxtable);
