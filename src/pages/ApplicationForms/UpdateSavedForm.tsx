import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/sidebar/navHeader';
import UpdateSavedForm from '../../components/GoogleForm/UpdateSavedForm';

const UpdateSavedFormPage = () => {
  return (
    <div>
      <NavBar />

      <div className='flex dark:bg-dark-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]'>
        <div className='min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0'>
          <div>
            <UpdateSavedForm />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UpdateSavedFormPage;
