import React from "react";

interface FieldData {
  key: string;
  value: string | null;
}

interface AppliedJob {
  appliedJob: FieldData[];
  id: string;
  status: string;
}

interface TableProps {
  headers: string[]; // The table headers will be dynamic
  data: AppliedJob[]; // The data is an array of AppliedJob objects
  isLoading?: boolean; // Optional loading state
}

const DynamicTable: React.FC<TableProps> = ({ headers, data, isLoading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr className="bg-gray-700 text-left">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 font-semibold text-sm uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                Processing...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-700">
                {headers.map((header, colIndex) => {
                  let content;
                  
                  // Map the data fields to the specific headers
                  if (header === "Date of Submission") {
                    const timestamp = row.appliedJob.find(
                      (f) => f.key === "Timestamp"
                    )?.value;
                    content = timestamp || "N/A";
                  } else if (header === "Status") {
                    content = row.status || "N/A";
                  } else if (header === "Action") {
                    content = <span className="cursor-pointer">...</span>;
                  } else if (header === "Title") {
                    const jobTitle = row.appliedJob.find(
                      (f) => f.key === "Job Title"
                    )?.value;
                    content = jobTitle || "N/A";
                  }

                  return (
                    <td
                      key={colIndex}
                      className="py-2 px-4 text-sm text-gray-400"
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
