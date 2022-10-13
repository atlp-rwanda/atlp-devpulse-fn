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
import * as BsIcons from "react-icons/bs";

const ApplicationCycle = () => {
  const { loading, data } = useQuery(GET_CYCLES);
  const [cycles, setCycles] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setCycles(data.getAllApplicationCycles);
    }
  }, [data]);

  const [createCycle, { error }] = useMutation(CREATE_CYCLE);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const addCycle = async () => {
    console.log(name);

    await createCycle({
      variables: {
        input: {
          name: name,
          startDate: startDate,
          endDate: endDate,
        },
      },
    });
    if (error) {
      toast.error("error");
      console.log(error.message);
    }
  };

  const [showCycleActions, setShowCycleActions] = useState(true);
  const [newCycle, setNewCycle] = useState(false);

  const [deleteApplicationCycle] = useMutation(DELETE_CYCLE);
  const [deleteCycleId, setDeleteCycleId] = useState("");
  const [showDeletePopUp, setDeletePopUp] = useState(false);
  const getDeleteCycleId = (e: any) => {
    setDeleteCycleId(e.target.id);
    setDeletePopUp(true);
  };
  const deleteCycle = async () => {
    await deleteApplicationCycle({
      variables: {
        deleteApplicationCycleId: deleteCycleId,
      },
    });
    window.location.reload();
  };

  const [updateApplicationCycle] = useMutation(UPDATE_CYCLE);
  const [updateName, setUpdateName] = useState("");
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");
  const [updateCycleId, setUpdateCycleId] = useState("");
  const [showUpdatePopUp, setUpdatePopUp] = useState(false);
  const getUpdateCycleId = (e: any) => {
    console.log(e);

    setUpdateCycleId(e.target.id);
    setUpdatePopUp(true);
  };
  const updateCycle = async () => {
    await updateApplicationCycle({
      variables: {
        updateApplicationCycleId: updateCycleId,
        input: {
          name: updateName,
          startDate: updateStartDate,
          endDate: updateEndDate,
          id: updateCycleId,
        },
      },
    });
  };

  console.log(updateCycleId);

  return (
    <div>
      <button
        style={{
          height: "40px",
          borderRadius: "5px",
          margin: "10px auto",
          background: "#333",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 10px 0 5px",
        }}
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
                        onClick={getDeleteCycleId}
                      >
                        Delete
                      </span>
                      <span
                        id={values.id}
                        style={{
                          color: "blue",
                          margin: "0 5px",
                          cursor: "pointer",
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
      {newCycle && (
        <form
          action=""
          onSubmit={addCycle}
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
              // border: "1px solid #333",
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
              // border: "1px solid #333",
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
      {showUpdatePopUp && (
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
              Update
            </button>
          </div>
        </form>
      )}
      <ToastContainer theme="colored" />
    </div>
  );
};

export default ApplicationCycle;
