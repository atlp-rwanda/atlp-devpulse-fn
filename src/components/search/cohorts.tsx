import React from 'react';

const Cohorts = ({ cohorts }: { cohorts: Array<any> }) => {
  return (
    <div className="w-full">
      {cohorts.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">Title</th>
              <th className="py-3 px-6 border">Program</th>
              <th className="py-3 px-6 border">Cycle</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map((cohort, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {cohort.title}
                </td>
                <td className="py-4 px-6 border">
                  {cohort.program.title}
                </td>
                <td className="py-4 px-6 border">
                  {cohort.cycle.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No cohorts found.</p>
        </div>
      )}
    </div>
  );
};

export default Cohorts;
