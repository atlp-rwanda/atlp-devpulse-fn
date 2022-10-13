import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_CYCLES, CREATE_CYCLE } from "./createCycle";
import "./ApplicationCycle.css";

const ApplicationCycle = () => {
  const { loading, data } = useQuery(GET_CYCLES);
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setUsers(data.getAllApplicationCycles);
    }
  }, [data]);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createCycle, { error }] = useMutation(CREATE_CYCLE);
  const addCycle = () => {
    createCycle({
      variables: {
        name: name,
        startDate: startDate,
        endDate: endDate,
      },
    });
    console.log(name);
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start date</th>
            <th>Start date</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((values) => {
            return (
              <tr key={values.name}>
                <td>{values.name}</td>
                <td>{values.startDate}</td>
                <td>{values.endDate} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <form>
        <input
          type="text"
          name="name"
          style={{
            border: "1px solid #333",
            height: "40px",
            width: "200px",
            display: "block",
            borderRadius: "5px",
            margin: "20px auto",
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
            width: "200px",
            display: "block",
            borderRadius: "5px",
            margin: "20px auto",
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
            width: "200px",
            display: "block",
            borderRadius: "5px",
            margin: "20px auto",
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
            margin: "20px auto",
            background: "#333",
            color: "#fff",
          }}
          onClick={addCycle}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ApplicationCycle;
