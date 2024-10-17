import React from 'react';

const Users = ({ users }: { users: Array<any> }) => {
  return (
    <div className="w-full">
      {users.length > 0 ? (
        <table className="min-w-full bg-dark-900 border-separate border-spacing-0">
          <thead>
            <tr className="bg-dark-800 text-white">
              <th className="py-3 px-6 border">First Name</th>
              <th className="py-3 px-6 border">Last Name</th>
              <th className="py-3 px-6 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="odd:bg-dark-700 even:bg-dark-800 text-white text-center">
                <td className="py-4 px-6 border">
                  {user.firstname}
                </td>
                <td className="py-4 px-6 border">
                  {user.lastname}
                </td>
                <td className="py-4 px-6 border">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-6 text-white">
          <p>No users found.</p>
        </div>
      )}
    </div>
  );
};

export default Users;
