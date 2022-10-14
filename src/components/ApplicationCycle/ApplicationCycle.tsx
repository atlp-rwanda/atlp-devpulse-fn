import React, { useEffect, useState } from "react";
import {
  getAllCycles,
  createCycle,
  updateApplicationCycle,
  deleteApplicationCycle,
} from "../../redux/actions/cyclesActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { connect } from "react-redux";
import * as BsIcons from "react-icons/bs";
import "./ApplicationCycle.css";

const Axios = (props: any) => {
  const { allCycles } = props;

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");
  const [updateCycleId, setUpdateCycleId] = useState("");
  const [open, setOpen] = React.useState(false);

  const [showCycleActions, setShowCycleActions] = useState<any>({
    0: false,
    1: false,
    2: false,
  });
  const [newCycle, setNewCycle] = useState(false);

  const [deleteCycleId, setDeleteCycleId] = useState("");
  const [showDeletePopUp, setDeletePopUp] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getAllCycles();
  }, []);

  const submitNewCycle = () => {
    const data = {
      name: name,
      startDate: startDate,
      endDate: endDate,
    };

    props.createCycle(data);
  };

  const cycles = allCycles.data;

  const handleOpen = (e: any, i: number) => {
    const cycle = cycles[i];
    setOpen(true);
    setUpdateName(cycle.name);
    setUpdateStartDate(cycle.startDate);
    setUpdateEndDate(cycle.endDate);

    setUpdateCycleId(e.target.id);
  };

  const updateCycle = () => {
    const data = {
      updateApplicationCycleId: updateCycleId,
      name: updateName,
      startDate: updateStartDate,
      endDate: updateEndDate,
      id: updateCycleId,
    };
    console.log(data);

    props.updateApplicationCycle(data);
  };

  const getDeleteCycleId = (e: any) => {
    setDeleteCycleId(e.target.id);
    setDeletePopUp(true);
  };
  const deleteCycle = () => {
    const data = {
      deleteApplicationCycleId: deleteCycleId,
    };
    props.deleteApplicationCycle(data);
    window.location.reload();
  };

  return (
    <div>
      <button
        className="add-button"
        onClick={() => {
          setNewCycle((value) => !value);
        }}
      >
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
          {cycles?.map((values: any, i: number) => {
            return (
              <tr key={values.name}>
                <td>{values.name}</td>
                <td>{values.startDate}</td>
                <td>{values.endDate} </td>
                <td
                  style={{
                    position: "relative",
                  }}
                >
                  <span>
                    <BsIcons.BsThreeDotsVertical
                      onClick={() => {
                        console.log(showCycleActions);
                        setShowCycleActions({
                          ...showCycleActions,
                          [i]: !showCycleActions[i],
                        });
                      }}
                    />
                  </span>
                  {showCycleActions[i] && (
                    <div
                      style={{
                        position: "absolute",
                        width: "100px",
                        border: "1px solid #f2f2f2",
                        right: "90px",
                        top: "10px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <span
                        id={values.id}
                        style={{
                          color: "red",
                          margin: "10px 5px",
                          cursor: "pointer",
                          display: "block",
                          textAlign: "center",
                        }}
                        onClick={getDeleteCycleId}
                      >
                        Delete
                      </span>
                      <hr />
                      <span
                        id={values.id}
                        style={{
                          color: "blue",
                          margin: "10px 5px",
                          cursor: "pointer",
                          display: "block",
                          textAlign: "center",
                        }}
                        onClick={(e) => {
                          handleOpen(e, i);
                        }}
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
      <br />
      <hr />
      <br />
      {newCycle && (
        <form
          action=""
          onSubmit={submitNewCycle}
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
      )}
      {showDeletePopUp && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "300px",
            margin: "auto",
            background: "#000",
            border: "1px solid #333",
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
            }}
            onClick={() => {
              setDeletePopUp(false);
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
              background: "#940000",
              color: "#fff",
            }}
            onClick={deleteCycle}
          >
            Delete
          </button>
        </div>
      )}
      <br />
      <hr />
      <br />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
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
              onSubmit={updateCycle}
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
                  onClick={handleClose}
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
        </Modal>
      </div>
    </div>
  );
};

const mapState = ({ cycles }: any) => ({
  allCycles: cycles,
});

export default connect(mapState, {
  getAllCycles,
  createCycle,
  updateApplicationCycle,
  deleteApplicationCycle,
})(Axios);
