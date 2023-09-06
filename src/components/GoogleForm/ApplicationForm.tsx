import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as icons from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

const ApplicationForm = () => {
  const handleSave = (selectedAppForm: string, selectedAppPost: string) => {
    console.log('Selected Application Form:', selectedAppForm);
    console.log('Selected Application Post:', selectedAppPost);
  };

  return (
    <div>
      <div className='flex '>
        <div className='flex px-5 py-2 w-fit'>
          <button
            onClick={() =>
              window.open('https://docs.google.com/forms/u/0/', '_blank')
            }
            className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer'>
            <icons.AiOutlinePlus className='mt-1 mr-1 font-bold' /> Create Google
            Form
          </button>
        </div>
        <div>
          <Link to={'/view-forms'}>
            <button className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer'>
              <icons.AiFillBook className='mt-1 mr-1 font-bold' /> View All
              Forms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
