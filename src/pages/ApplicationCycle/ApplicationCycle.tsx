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

const ApplicationCycle = (props: any) => {
  const { allCycles, errors } = props;

  const cycles = allCycles.data;

  useEffect(() => {
    props.getAllCycles();
  }, []);

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
      Header: "Start date",
      accessor: "startDate",
    },
    {
      Header: "End date",
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
  }: any = useTable(
    {
      columns,
      data: cycles,
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="md:hidden"></div>
        <div className="relative min-h-[50vh] w-[84rem] md:w-[100rem]">
          <div className="absolute table table-fixed w-[100%] bottom-0 pb-10 md:relative">
            <div className="w-[70%] min-h-[70vh] m-auto  bg-[#fff] p-[10px] shadow-md rounded-[10px] relative pb-[80px]  overflow-x-auto	md:w-[90%]">
              <button
                className="h-[40px] rounded-[5px] bg-[#173b3f] text-white flex items-center p-0 pl-[5px] pr-[10px]"
                onClick={() => handleOpenCreateCycle()}
              >
                <BsIcons.BsPlusLg className="mx-[5px]" />
                <span>New Cycle</span>
              </button>
              <table
                {...getTableProps()}
                className="border-collapse w-[100%] my-[10px] mx-auto rounded-[15px] whitespace-nowrap "
              >
                <thead className="h-[50px]">
                  {headerGroups.map((headerGroup: any) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="border-solid border-[1px] border-white even:bg-[#eef1f1]"
                    >
                      {headerGroup.headers.map((column: any) => (
                        <th
                          {...column.getHeaderProps}
                          className="border-solid pl-[30px] h-[50px] text-left bg-[#eef1f1] first:rounded-tl-[10px] last:rounded-tr-[10px] last:pl-[0px] border-b-[2px] border-[rgb(168, 168, 168)]   last:pl-[0px] w-[150px] last:w-[20px]"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
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
                        className="even:bg-[#eef1f1]"
                      >
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="pl-[30px] text-left w-[150px] overflow-scroll p-[8px] last:w-[2px] last:pl-[0px]"
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
              <div className="block mx-auto my-0 w-[100%] absolute bottom-0 overflow-x-auto">
                <div className="w-[100%] flex items-center justify-center my-[30px]  mx-auto">
                  <span className="mx-[10px] md:hidden">
                    Page <strong>{pageIndex + 1}</strong> of{" "}
                    <strong>{pageOptions.length}</strong>{" "}
                  </span>
                  <button
                    className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[35px] border-solid border-[1px]  border-[#a8a8a8]"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <AiIcons.AiOutlineDoubleLeft />
                  </button>{" "}
                  <button
                    className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[5px] text-[#333] rounded-tl-[5px] h-[35px]"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <AiIcons.AiOutlineLeft />
                  </button>{" "}
                  <span className="flex flex-wrap md:hidden" id="pages">
                    {pageOptions?.map((pageOption: any) => {
                      return (
                        <div>
                          <button
                            className=" border-solid border-[1px]  border-[#a8a8a8] w-[30px] h-[35px]"
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
                    className=" border-solid border-[1px]  border-[#a8a8a8] py-0 px-[5px] text-[#333] rounded-tr-[5px] h-[35px]"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <AiIcons.AiOutlineRight />
                  </button>{" "}
                  <button
                    className="my-0 mx-[5px] px-[5px] py-0 text-[#333] h-[35px] border-solid border-[1px]  border-[#a8a8a8]"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <AiIcons.AiOutlineDoubleRight />
                  </button>
                </div>
              </div>
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
          <MenuItem onClick={handleOpenDeleteCycle}>Delete</MenuItem>
          <MenuItem
            onClick={(e) => {
              handleOpenUpdateModal(e);
            }}
          >
            Edit
          </MenuItem>
        </Menu>
        <Modal
          open={openCreateModal}
          onClose={handleCloseCreateModel}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className="absolute w-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <form
              action=""
              onSubmit={createNewCycle}
              className=" relative rounded-[5px] w-[50%] h-[455px] m-auto p-[10px] pt-[5px] bg-[#f0f0f0]"
            >
              <h1 className="text-center font-bold text-[24px] m-[20px]">
                Add new cycle
              </h1>
              <AiIcons.AiOutlineClose
                className="absolute top-[20px] right-[20px] text-[35px] cursor-pointer"
                onClick={handleCloseCreateModel}
              />
              <hr style={{ marginBottom: "40px" }} />
              <input
                type="text"
                name="name"
                placeholder="Cycle name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px]"
              />
              <input
                type="date"
                name="start date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px]"
              />
              <input
                type="date"
                name="end date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px]"
              />
              <button
                type="submit"
                className="text-white border-[1px] border-[#a8a8a8] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]"
              >
                Save
              </button>
            </form>
          </Box>
        </Modal>
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[5px] bg-[#f0f0f0]">
            <div className="block w-[300px] h-[200px] bg-[#f0f0f0] rounded-[5px]">
              <div className="text-center">
                <AiIcons.AiFillExclamationCircle className="w-[40px] my-[20px] mx-auto text-[40px]" />
                <p className="w-[60%] m-auto">
                  Are you sure you want to delete this cycle?
                </p>
              </div>
              <div className="flex flex-wrap my-[20px] mx-0">
                <button
                  className="block text-white bg-[#940000] my-[10px] mx-auto rounded-[5px] w-[100px] h-[40px]"
                  onClick={deleteCycle}
                >
                  Delete
                </button>
                <button
                  className="h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-auto bg-[#ABB8C3] text-[#fff]"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className="absolute w-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <form
              action=""
              onSubmit={updateCycle}
              className="relative rounded-[5px] w-[50%] h-[455px] m-auto p-[10px] pt-[5px] bg-[#f0f0f0]"
            >
              <h1 className="text-center font-bold text-[24px] m-[20px]">
                Update cycle
              </h1>
              <AiIcons.AiOutlineClose
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  fontSize: "35px",
                  cursor: "pointer",
                }}
                onClick={handleCloseUpdateModal}
              />
              <hr style={{ marginBottom: "40px" }} />
              <input
                type="text"
                name="name"
                placeholder="Cycle name"
                value={updateName}
                onChange={(e) => {
                  setUpdateName(e.target.value);
                }}
                className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px]"
              />
              <input
                type="date"
                name="start date"
                value={updateStartDate}
                onChange={(e) => {
                  setUpdateStartDate(e.target.value);
                }}
                className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px]"
              />
              <input
                type="date"
                name="end date"
                value={updateEndDate}
                onChange={(e) => {
                  setUpdateEndDate(e.target.value);
                }}
                className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded-[5px] h-[50px] my-[20px] mx-auto w-[80%] block border-[2px] border-[#a8a8a8]  px-[10px]"
              />
              <div className="flex flex-wrap w-[300px] m-auto">
                <button
                  className="text-[#000] border-[2px] border-[#a8a8a8] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#f1f1f1]"
                  onClick={handleCloseUpdateModal}
                >
                  Cancel
                </button>
                <button
                  className="text-white border-[1px] border-[#a8a8a8] h-[40px] w-[100px] block rounded-[5px] my-[10px] mx-[auto] bg-[#173b3f]"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
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
