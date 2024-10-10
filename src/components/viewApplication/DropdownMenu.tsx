import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface DropdownMenuProps {
  itemId: string;
  setmoredrop: (value: string) => void;
  moredrop: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ itemId, setmoredrop, moredrop }) => (
  <div>
    <HiDotsVertical
      className='text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer'
      onClick={() => setmoredrop(itemId)}
    />
    <div
      className={`${
        moredrop === itemId ? 'block' : 'hidden'
      } absolute bg-white dark:bg-dark-tertiary dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
      id='dropdown'>
      <ul className='py-1' aria-labelledby='dropdown'>
        <li>
          <Link
            to={`/application/${itemId}/edit`}
            className='text-sm hover:bg-gray-100 text-gray-700 dark:hover-bg-gray-500 dark:text-white block px-4 py-2'>
            Edit
          </Link>
        </li>
        <li>
          <Link
            to={`/application-details/${itemId}`}
            className='text-sm hover-bg-gray-100 text-gray-700 dark:text-white dark:hover-bg-gray-500 block px-4 py-2'>
            View
          </Link>
        </li>
        <li>
          <div className='text-sm hover-bg-gray-100 text-gray-700 dark:text-white block px-4 py-2'>
            Soft Delete
          </div>
        </li>
        <li>
          <div className='text-sm hover-bg-gray-100 text-gray-700 dark:text-white block px-4 py-2'>
            Hard Delete
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default DropdownMenu;
