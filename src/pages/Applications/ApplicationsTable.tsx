
import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ApplicationsTable = ({ applications, onSubmitHandler, isDrop }) => (
  <div className="bg-dark-frame-bg flex-grow overflow-auto' text-white py-4 rounded-lg shadow-lg">
    <table className='min-w-full min-h-[350px] leading-normal'>
      <thead>
        <tr className="border-b-2 border-white-700 shadow-lg">
          <th className='p-3 text-center text-xs font-semibold uppercase tracking-wider'>First Name</th>
          <th className='p-3 text-center text-xs font-semibold uppercase tracking-wider'>Last Name</th>
          <th className='p-3 text-center text-xs font-semibold uppercase tracking-wider'>Email</th>
          <th className='p-3 text-center text-xs font-semibold uppercase tracking-wider'>Gender</th>
          <th className='p-3 text-center text-xs font-semibold uppercase tracking-wider'>Status</th>
          <th className='p-3 text-center text-xs font-semibold uppercase tracking-wider'>Action</th>
        </tr>
      </thead>
      <tbody>
        {applications?.length > 0 ? (
          applications.map((item) => (
            <tr key={item._id} className='border-b border-gray-700'>
              <td className='p-3'>{item.firstName}</td>
              <td className='p-3'>{item.lastName}</td>
              <td className='p-3'>{item.email}</td>
              <td className='p-3'>{item.gender}</td>
              <td className='p-3'>{item.status}</td>
              <td className='p-3 relative'>
                <HiDotsVertical
                  className='text-white cursor-pointer'
                  onClick={() => onSubmitHandler(item._id)}
                />
                {isDrop === item._id && (
                  <div className='absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10'>
                    <ul>
                      <li className='hover:bg-gray-700'>
                        <Link to={`/application/${item._id}/edit`} className='block px-4 py-2'>Edit</Link>
                      </li>
                      <li className='hover:bg-gray-700'>
                        <Link to={`/application-details/${item._id}`} className='block px-4 py-2'>View</Link>
                      </li>
                      <li className='hover:bg-gray-700'>
                        <button className='block w-full text-left px-4 py-2'>Soft Delete</button>
                      </li>
                      <li className='hover:bg-gray-700'>
                        <button className='block w-full text-left px-4 py-2'>Hard Delete</button>
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className='text-center py-4 font-semibold'>No applications available at the moment</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ApplicationsTable;
