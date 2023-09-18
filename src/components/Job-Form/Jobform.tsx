import React from 'react';
import * as icons from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

const CreateForm = () => {
  return (
    <div>
      <div className='flex '>
        <div className='flex px-5 py-2 pb-8 w-fit'>
          {/* onClick Button open this link: https://docs.google.com/forms/u/0/ in new tab */}
          <button
            onClick={() =>
              window.open('https://docs.google.com/forms/u/0/', '_blank')
            }
            className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer'>
            <icons.AiOutlinePlus className='mt-1 mr-1 font-bold' /> Create Job post
          </button>
          <div></div>
        </div>
        <div>
          <button className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer'>
            <icons.AiOutlineSearch className='mt-1 mr-1 font-bold' /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;