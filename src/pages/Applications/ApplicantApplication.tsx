import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMyOwnAppliedJob } from "../../redux/actions/applications";
import DynamicTable from "../../components/Tables/DynamicTable";

export const ApplicantApplication = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyOwnAppliedJob());
  }, [dispatch]);

  const { loading, data } = useAppSelector((state) => state.myApplications);

  const tableData = Array.isArray(data) ? data : [];

  const headers = ["Title", "Date of Submission", "Status", "Action"];


  return (
    <div className="p-4">
      <DynamicTable headers={headers} data={tableData} isLoading={loading} />
    </div>
  );
};
