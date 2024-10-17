import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/sidebar/navHeader';
import UpdateSavedForm from '../../components/GoogleForm/UpdateSavedForm';

const UpdateSavedFormPage = () => {
  return (
    <div>
      

      <div className='flex dark:bg-dark-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]'>
        <div className='min-h-[50vh] w-[100%] m-20'>
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
