import React from 'react';

const Programs = ({ programs }: { programs: Array<any> }) => {
  return (
    <div className="w-full">
      {programs.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">Title</th>
              <th className="py-3 px-6 border">Description</th>
              <th className="py-3 px-6 border">Main Objective</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {program.title}
                </td>
                <td className="py-4 px-6 border">
                  {program.description}
                </td>
                <td className="py-4 px-6 border">
                  {program.mainObjective}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No programs found.</p>
        </div>
      )}
    </div>
  );
};

export default Programs;
