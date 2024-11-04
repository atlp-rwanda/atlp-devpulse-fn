import React, { useEffect, useState, useMemo } from "react";
import {
  getAllCycles,
  createCycle,
  updateApplicationCycle,
  deleteApplicationCycle,
} from "../../redux/actions/cyclesActions";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useTable, usePagination } from "react-table";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import NavBar from "../../components/sidebar/navHeader";
import { CycleSkeleton } from "../../skeletons/cycleSkeleton";
import { useNavigate } from "react-router-dom";

const ApplicationCycle = (props: any) => {
  const { allCycles, errors } = props;
  const [loading, setLoading] = useState(true);
  const cycles = allCycles.data;
  const navigate = useNavigate();

  useEffect(() => {
    props.getAllCycles();
    if (allCycles.data) {
      setLoading(false);
    }
  }, [allCycles.data]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");
  const [updateCycleId, setUpdateCycleId] = useState("");
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);

  const [deleteCycleId, setDeleteCycleId] = useState("");

  const handleCloseUpdateModal = (e: any) => {
    e.preventDefault();
    setOpenUpdateModel(false);
  };
  const handleCloseCreateModel = () => {
    setOpenCreateModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenUpdateModal = (e: any) => {
    const cycle = cycles[activeCycle!];

    setOpenUpdateModel(true);
    setUpdateName(cycle.name);
    setUpdateStartDate(cycle.startDate);
    setUpdateEndDate(cycle.endDate);

    setUpdateCycleId(cycle.id);
    setAnchorEl(null);
  };
  const handleOpenCreateCycle = () => {
    setOpenCreateModal(true);
  };
  const handleOpenDeleteCycle = (e: any) => {
    setDeleteCycleId(cycles[activeCycle!].id);
    setOpenDeleteModal(true);
    setAnchorEl(null);
  };

  useEffect(() => {
    props.getAllCycles();
  }, []);

  const createNewCycle = (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      startDate: startDate,
      endDate: endDate,
    };

    props.createCycle(data);
    setOpenCreateModal(false);
  };

  const updateCycle = (e: any) => {
    e.preventDefault();

    const data = {
      updateApplicationCycleId: updateCycleId,
      name: updateName,
      startDate: updateStartDate,
      endDate: updateEndDate,
      id: updateCycleId,
    };
    props.updateApplicationCycle(data);
    setOpenUpdateModel(false);
  };
  const deleteCycle = (e: any) => {
    e.preventDefault();

    const data = {
      deleteApplicationCycleId: deleteCycleId,
    };
    props.deleteApplicationCycle(data);
    setOpenDeleteModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const COLS = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Starting date",
      accessor: "startDate",
    },
    {
      Header: "Closing date",
      accessor: "endDate",
    },
    {
      Header: " ",
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
                color: "#fff",
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
  }: any = useTable(
    {
      columns,
      data: cycles,
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;

  const handleNavigate = (link: string) => {
    navigate(`applicant-stages/${link}`);
  };

  return (
    <div className="flex dark:bg-dark-frame-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]">
      <div className="min-h-[50vh] w-[100%] block md:w-[100%] md:mt-0 pt-4">
        <div className=" table table-fixed w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-8 md:px-[10px]">
          <button
            className="h-[40px] rounded-[5px]  dark:bg-[#56C870] bg-[#173b3f] text-white flex items-center p-0 pl-[5px] pr-[10px] mb-[20px]"
            onClick={() => handleOpenCreateCycle()}
          >
            <BsIcons.BsPlusLg className="mx-[5px]" />
            <span>Add cycle</span>
          </button>
          <div className=" w-[100%] dark:bg-dark-bg max-h-[70vh] m-auto  bg-[#fff] shadow-md rounded-[10px] relative pb-[20px]  overflow-x-auto  overflow-y-scroll 	md:w-[100%]">
            {loading || cycles.length === 0 ? (
              <CycleSkeleton />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Starting Date</th>
                      <th className="p-4 text-left">Closing Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cycles.map((cycle) => (
                      <tr
                        key={cycle.id}
                        onClick={() => handleNavigate(cycle.name)}
                        className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <td className="p-4">{cycle.name}</td>
                        <td className="p-4">{cycle.startDate}</td>
                        <td className="p-4">{cycle.endDate}</td>
                        <td className="p-4 ">
                          <BsIcons.BsThreeDotsVertical
                            onClick={(event) => {
                              event.stopPropagation();
                              setAnchorEl(event.currentTarget as unknown as HTMLElement);
                              setActiveCycle(cycle.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* {cycles.map((cycle: any) => (
                  <div
                    key={cycle.id}
                    onClick={() => handleNavigate(cycle.name)}
                    className="flex  hover:bg-gray-100 cursor-pointer border-b border-gray-200 text-sm"
                  >
                    <div className="flex-1 p-2">{cycle.name}</div>
                    <div className="flex-1 p-2">{cycle.startDate}</div>
                    <div className="flex-1 p-2">{cycle.endDate}</div>
                    <div className="w-12 p-2 text-right">
                      <BsIcons.BsThreeDotsVertical
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent row click when clicking on icon
                          setActiveCycle(cycle.id);
                          setAnchorEl(
                            event.currentTarget as unknown as HTMLElement
                          );
                        }}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      />
                    </div>
                  </div>
                ))} */}
              </div>
            )}
          </div>
          <div className="block mx-auto my-0 w-[100%]  bottom-0 overflow-x-auto">
            <div className="w-[100%] flex items-center justify-center my-[30px]  mx-auto md:block md:mx-auto">
              <span className="flex items-center md:justify-center md:mt-[10px]">
                {" "}
                <button
                  className="my-0 mx-[5px] px-[5px] py-0 dark:border-dark-tertiary dark:bg-dark-bg dark:text-white text-[#333] h-[38px] border-solid border-[1px]  border-[#a8a8a8]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <AiIcons.AiOutlineDoubleLeft />
                </button>
                <button
                  className=" border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-l-[5px] h-[38px] disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8] "
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
                          className={`border-solid border-[1px] mx-[2px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] bg-[#fff] w-[35px] h-[38px]  active:bg-[#333] active:text-[#fff]-500 ${
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
                  className=" border-solid border-[1px] dark:border-dark-tertiary dark:bg-dark-bg dark:text-white  border-[#a8a8a8] py-0 px-[10px] text-[#333] rounded-r-[5px] h-[38px]  disabled:bg-[#E7E7E7] disabled:text-[#a8a8a8]"
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
            <BsIcons.BsPencilFill className="mr-2" />
            Edit
          </MenuItem>
          <MenuItem onClick={handleOpenDeleteCycle}>
            <BsIcons.BsFillTrashFill className="mr-2" />
            Delete
          </MenuItem>
        </Menu>

        {/* Modals for Create, Update, and Delete can go here, similar to your original code */}
      </div>
    </div>
  );
};

const mapState = ({ cycles }: any) => ({
  allCycles: cycles,
  errors: cycles.errors,
});

export default connect(mapState, {
  getAllCycles,
  createCycle,
  updateApplicationCycle,
  deleteApplicationCycle,
})(ApplicationCycle);
