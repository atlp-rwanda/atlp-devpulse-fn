import React from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../../components/Job-Form/Jobform';
import NavSidbar from '../../components/sidebar/navHeader';
import NavBar from '../../components/sidebar/navHeader';
import ResponseForm from '../../components/Job-Form/Responseform'
// import ResponseList from '../../components/Job-Form/ResponseList';

const CreateFormPage = () => {
  return (
    <div>
      {/* <NavSidbar /> */}
      <NavBar />

      <div className='flex dark:bg-dark-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]'>
        <div className='min-h-[50vh] w-[100%] block mt-10 md:w-[100%] md:mt-0 pl-[16rem]  pt-[80px] md:pl-0'>
          <CreateForm />
          <ResponseForm />
          {/* <ResponseList /> */}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CreateFormPage;