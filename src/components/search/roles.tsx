import React from 'react';

const Roles = ({ roles }: { roles: Array<any> }) => {
  return (
    <div className="w-full">
      {roles.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">Role Name</th>
              <th className="py-3 px-6 border">Role Description</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {role.roleName}
                </td>
                <td className="py-4 px-6 border">
                  {role.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No roles found.</p>
        </div>
      )}
    </div>
  );
};

export default Roles;
