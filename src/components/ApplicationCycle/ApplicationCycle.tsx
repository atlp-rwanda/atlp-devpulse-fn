import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CYCLES,
  CREATE_CYCLE,
  DELETE_CYCLE,
  UPDATE_CYCLE,
} from "./createCycle";
import "./ApplicationCycle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Axios = (props: any) => {
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

  const [showCycleActions, setShowCycleActions] = useState<any>({
    0: false,
    1: false,
    2: false,
  });

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

  const handleOpenUpdateModal = (e: any, i: number) => {
    const cycle = cycles[i];
    setOpenUpdateModel(true);
    setUpdateName(cycle.name);
    setUpdateStartDate(cycle.startDate);
    setUpdateEndDate(cycle.endDate);

    setUpdateCycleId(e.target.id);
  };
  const handleOpenCreateCycle = () => {
    setOpenCreateModal(true);
  };
  const handleOpenDeleteCycle = (e: any) => {
    setDeleteCycleId(e.target.id);
    setOpenDeleteModal(true);
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
    window.location.reload();
  };
  const deleteCycle = (e: any) => {
    e.preventDefault();

    const data = {
      deleteApplicationCycleId: deleteCycleId,
    };
    props.deleteApplicationCycle(data);
    setOpenDeleteModal(false);
    // window.location.reload();
  };

  return (
    <div>
      <button className="add-button" onClick={() => handleOpenCreateCycle()}>
        <BsIcons.BsPlusLg style={{ margin: "0 5px" }} />
        <span>New Cycle</span>
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start date</th>
            <th>Start date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cycles?.map((values) => {
            return (
              <tr key={values.name}>
                <td>{values.name}</td>
                <td>{values.startDate}</td>
                <td>{values.endDate} </td>
                <td
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {/* <span>
                    <BsIcons.BsThreeDotsVertical
                      onClick={() => {
                        setShowCycleActions((value) => !value);
                      }}
                    />
                  </span> */}
                  {showCycleActions && (
                    <div style={{}}>
                      <span
                        id={values.id}
                        style={{
                          color: "red",
                          margin: "0 5px",
                          cursor: "pointer",
                        }}
                        onClick={handleOpenDeleteCycle}
                      >
                        Delete
                      </span>
                      <span
                        id={values.id}
                        style={{
                          color: "blue",
                          margin: "0 5px",
                          cursor: "pointer",
                          display: "block",
                          textAlign: "center",
                        }}
                        onClick={(e) => {
                          handleOpenUpdateModal(e, i);
                        }}
                        onClick={getUpdateCycleId}
                      >
                        Edit
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModel}
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
          }}
        >
          <form
            action=""
            onSubmit={createNewCycle}
            style={{
              borderRadius: "5px",
              width: "max-content",
              height: "fit-content",
              margin: "auto",
              padding: "5px 10px 10px",
              background: "#f0f0f0",
            }}
          >
            <input
              type="text"
              name="name"
              style={{
                border: "1px solid #333",
                height: "40px",
                width: "250px",
                display: "block",
                borderRadius: "5px",
                margin: "10px auto",
                textIndent: "1ch",
              }}
              placeholder="Cycle name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="date"
              name="start date"
              style={{
                border: "1px solid #333",
                height: "40px",
                width: "250px",
                display: "block",
                borderRadius: "5px",
                margin: "10px auto",
                textIndent: "1ch",
              }}
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
            <input
              type="date"
              name="end date"
              style={{
                border: "1px solid #333",
                height: "40px",
                width: "250px",
                display: "block",
                borderRadius: "5px",
                margin: "10px auto",
                textIndent: "1ch",
              }}
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
            <button
              style={{
                border: "1px solid #333",
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
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  fontWeight: "bold",
                  margin: "20px 0",
                }}
              >
                Alert!
              </h1>
              <p>Do you want to delete this cycle?</p>
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
                  border: "1px solid #333",
                  background: "#f1f1f1",
                  color: "#000",
                }}
                onClick={handleCloseDeleteModal}
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
                  background: "#940000",
                  color: "#fff",
                }}
                onClick={deleteCycle}
              >
                Delete
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
          <input
            type="text"
            name="name"
            style={{
              border: "1px solid #333",
              height: "40px",
              width: "250px",
              display: "block",
              borderRadius: "5px",
              margin: "10px auto",
              textIndent: "1ch",
            }}
            placeholder="Cycle name"
            value={updateName}
            onChange={(e) => {
              setUpdateName(e.target.value);
            }}
          />
          <input
            type="date"
            name="start date"
            style={{
              border: "1px solid #333",
              height: "40px",
              width: "250px",
              display: "block",
              borderRadius: "5px",
              margin: "10px auto",
              textIndent: "1ch",
            }}
            value={updateStartDate}
            onChange={(e) => {
              setUpdateStartDate(e.target.value);
            }}
          />
          <input
            type="date"
            name="end date"
            style={{
              border: "1px solid #333",
              height: "40px",
              width: "250px",
              display: "block",
              borderRadius: "5px",
              margin: "10px auto",
              textIndent: "1ch",
            }}
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
              <input
                type="text"
                name="name"
                style={{
                  border: "1px solid #333",
                  height: "40px",
                  width: "250px",
                  display: "block",
                  borderRadius: "5px",
                  margin: "10px auto",
                  textIndent: "1ch",
                }}
                placeholder="Cycle name"
                value={updateName}
                onChange={(e) => {
                  setUpdateName(e.target.value);
                }}
              />
              <input
                type="date"
                name="start date"
                style={{
                  border: "1px solid #333",
                  height: "40px",
                  width: "250px",
                  display: "block",
                  borderRadius: "5px",
                  margin: "10px auto",
                  textIndent: "1ch",
                }}
                value={updateStartDate}
                onChange={(e) => {
                  setUpdateStartDate(e.target.value);
                }}
              />
              <input
                type="date"
                name="end date"
                style={{
                  border: "1px solid #333",
                  height: "40px",
                  width: "250px",
                  display: "block",
                  borderRadius: "5px",
                  margin: "10px auto",
                  textIndent: "1ch",
                }}
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
                    background: "#333",
                    color: "#fff",
                  }}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </Box>
        </Modal>{" "}
        <ToastContainer theme="colored" />
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
