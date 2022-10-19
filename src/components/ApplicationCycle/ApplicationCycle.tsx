import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAllCycles,
  createCycle,
  updateApplicationCycle,
  deleteApplicationCycle,
} from "../../redux/actions/cyclesActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { connect } from "react-redux";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import "./ApplicationCycle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Axios = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { allCycles, errors } = props;

  const cycles = allCycles.data;
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const addCycle = async () => {
    console.log(name);

  const [updateName, setUpdateName] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");
  const [updateCycleId, setUpdateCycleId] = useState("");
  const [openUpdateModal, setOpenUpdateModel] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeCycle, setActiveCycle] = useState<number | undefined>(undefined);

  const [deleteApplicationCycle] = useMutation(DELETE_CYCLE);
  const [deleteCycleId, setDeleteCycleId] = useState("");

  const handleCloseUpdateModal = () => {
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
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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

  return (
    <div>
      <div className="container">
        <button className="add-button" onClick={() => handleOpenCreateCycle()}>
          <BsIcons.BsPlusLg style={{ margin: "0 5px" }} />
          <span>New Cycle</span>
        </button>
        <div className="body">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start date</th>
                <th>Start date</th>
              </tr>
            </thead>
            <tbody>
              {cycles?.map((values: any, i: number) => {
                return (
                  <tr key={values.name}>
                    <td>{values.name}</td>
                    <td>{values.startDate}</td>
                    <td
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        width: "100%",
                      }}
                    >
                      {values.endDate}

                      <div
                        style={{
                          marginLeft: "5px",
                        }}
                      >
                        <BsIcons.BsThreeDotsVertical
                          onClick={(event) => {
                            setActiveCycle(i);
                            setAnchorEl(
                              event.currentTarget as unknown as HTMLElement
                            );
                          }}
                          style={{
                            color: "#000",
                            fontSize: "20px",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
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
            </tbody>
          </table>

          <Modal
            open={openCreateModal}
            onClose={handleCloseCreateModel}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="create-box">
              <form
                action=""
                onSubmit={createNewCycle}
                className="create-cycle-form"
              >
                <h1>Add new cycle</h1>
                <AiIcons.AiOutlineClose
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "35px",
                    cursor: "pointer",
                  }}
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
                  className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded"
                />
                <input
                  type="date"
                  name="start date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded"
                />
                <input
                  type="date"
                  name="end date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  className="w-24 mt-3 bg-lime cursor-pointer text-xl self-center py-1 rounded"
                />
                <button type="submit">Save</button>
              </form>
            </Box>
          </Modal>
          <Modal
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "none",
                background: "#f0f0f0",
                borderRadius: "5px",
              }}
              onClick={() => {
                setUpdatePopUp(false);
              }}
            >
              Cancel
            </button>
            <button
              style={{
                height: "40px",
                width: "100px",
                display: "block",
                borderRadius: "5px",
                margin: "10px auto",
                background: "#333",
                color: "#fff",
              }}
              type="submit"
            >
              <div
                style={{
                  display: "block",
                  width: "300px",
                  height: "200px",
                  background: "#f0f0f0",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <AiIcons.AiFillExclamationCircle
                    style={{
                      fontSize: "40px",
                      width: "40px",
                      margin: "20px auto",
                    }}
                  />
                  <p
                    style={{
                      width: "60%",
                      margin: "auto",
                    }}
                  >
                    Are you sure you want to delete this cycle?
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "20px 0",
                  }}
                >
                  <button
                    style={{
                      height: "40px",
                      width: "100px",
                      display: "block",
                      borderRadius: "5px",
                      margin: "10px auto",
                      background: "#940000",
                      color: "#fff",
                    }}
                    onClick={deleteCycle}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      height: "40px",
                      width: "100px",
                      display: "block",
                      borderRadius: "5px",
                      margin: "10px auto",
                      background: "#ABB8C3",
                      color: "#fff",
                    }}
                    onClick={handleCloseDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Box>
          </Modal>

          <div>
            <Modal
              open={openUpdateModal}
              onClose={handleCloseUpdateModal}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box className="create-box">
                <form
                  action=""
                  onSubmit={updateCycle}
                  className="create-cycle-form"
                >
                  <h1>Update new cycle</h1>
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
                  />
                  <input
                    type="date"
                    name="start date"
                    value={updateStartDate}
                    onChange={(e) => {
                      setUpdateStartDate(e.target.value);
                    }}
                  />
                  <input
                    type="date"
                    name="end date"
                    value={updateEndDate}
                    onChange={(e) => {
                      setUpdateEndDate(e.target.value);
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "300px",
                      margin: "auto",
                    }}
                  >
                    <button
                      style={{
                        height: "40px",
                        width: "100px",
                        display: "block",
                        borderRadius: "5px",
                        margin: "10px auto",
                        background: "#f1f1f1",
                        color: "#000",
                        border: "1px solid #333",
                      }}
                      onClick={handleCloseUpdateModal}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        height: "40px",
                        width: "100px",
                        display: "block",
                        borderRadius: "5px",
                        margin: "10px auto",
                        background: "#173b3f",
                        color: "#fff",
                      }}
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
            <ToastContainer theme="colored" />
          </div>
        </div>
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
})(Axios);
