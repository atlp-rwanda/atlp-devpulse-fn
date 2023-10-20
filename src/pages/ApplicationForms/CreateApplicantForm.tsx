import React from 'react';
import ApplicationForm from '../../components/GoogleForm/ApplicationForm';
import NavBar from '../../components/sidebar/navHeader';
import SaveFormDetails from '../../components/GoogleForm/SaveForm';

const ApplicationFormPage = () => {
  return (
    <div>
      <NavBar />
      <div className='flex dark:bg-dark-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]'>
        <div className='min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0'>
          <ApplicationForm />
          <SaveFormDetails />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ApplicationFormPage;
