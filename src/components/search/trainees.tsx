import React from 'react';

const Trainees = ({ trainees }: { trainees: Array<any> }) => {
  return (
    <div className="w-full">
      {trainees.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">First Name</th>
              <th className="py-3 px-6 border">Last Name</th>
              <th className="py-3 px-6 border">Email</th>
              <th className="py-3 px-6 border">Cycle</th>
            </tr>
          </thead>
          <tbody>
            {trainees.map((trainee, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {trainee.firstName}
                </td>
                <td className="py-4 px-6 border">
                  {trainee.lastName}
                </td>
                <td className="py-4 px-6 border">
                  {trainee.email}
                </td>
                <td className="py-4 px-6 border">
                  {trainee.cycle_id.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No trainees found.</p>
        </div>
      )}
    </div>
  );
};

export default Trainees;
