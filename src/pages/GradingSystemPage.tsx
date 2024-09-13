import React from 'react'
import NavBar from '../components/sidebar/navHeader';
import GradingBox from '../components/GradingBox';

const GradingSystemPage = () => {
  return (
    <>
      <NavBar />
      <div className='  dark:bg-dark-frame-bg overflow-y-scroll'>
        <div className=' dark:bg-dark-frame-bg lg:ml-[10%] px-3 lg:px-0 semi-md:ml-[10%] h-screen py-20' >
          <GradingBox />
        </div>
      </div>
    </>
  )
}

export default GradingSystemPage