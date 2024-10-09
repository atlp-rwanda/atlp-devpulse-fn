import React from 'react';

const Applicationcycles = ({ applicationCycles }: { applicationCycles: Array<any> }) => {
  return (
    <div className="w-full">
      {applicationCycles.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">Name</th>
            </tr>
          </thead>
          <tbody>
            {applicationCycles.map((applicationCycle, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {applicationCycle.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No application cycles found.</p>
        </div>
      )}
    </div>
  );
};

export default Applicationcycles;
