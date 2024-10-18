import React from 'react';

const Jobs = ({ jobs }: { jobs: Array<any> }) => {
  return (
    <div className="w-full">
      {jobs.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">Job Name</th>
              <th className="py-3 px-6 border">Job Description</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {job.title}
                </td>
                <td className="py-4 px-6 border">
                  {job.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No jobs found.</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
