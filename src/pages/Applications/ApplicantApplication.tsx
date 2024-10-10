import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMyOwnAppliedJob } from "../../redux/actions/applications";
import DynamicTable from "../../components/Tables/DynamicTable";

export const ApplicantApplication = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOwnAppliedJob());
  }, [dispatch]);

  const { loading, success, data } = useAppSelector((state) => state.myApplications);
  
  // Ensure data is always an array
  const tableData = Array.isArray(data) ? data : [];

  const headers = ["Title", "Date of Submission", "Status", "Action"];

  console.log(tableData);

  return (
    <div className="p-4">
      <h1 className="text-white mb-4">Job Applications</h1>
      <DynamicTable headers={headers} data={tableData} isLoading={loading} />
    </div>
  );
};
