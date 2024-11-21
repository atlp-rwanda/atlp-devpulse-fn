import React from 'react'
import { GrResources } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { GrDocumentPerformance } from "react-icons/gr";
const image: string = require("../../assets/Andela_Rwanda_Engineers_zr7awr.jpg").default;

const AboutUs = () => {
  return (
    <div className='p-10 bg-white text-black dark:bg-dark-bg'>
      <div className='max-w-2xl px-10 mb-10'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight dark:text-white'>
          <span className='text-primary dark:text-green'>DevPulse</span> is more than a platform <br />
          it's your partner in tech growth.
        </h1>
        <p className='text-lg mb-6 dark:text-white'>
          Our goal is to help you thrive at every stage—from application to professional success.
          Whether you're an applicant or a trainee, DevPulse provides you with tailored tools, 
          insights, and support to make the most of your journey.
        </p>
      </div>


      <div className="flex flex-col lg:flex-row items-center  mb-10 px-10 gap-7 space-x-7">
        <img src={image} alt="Andela Engineers" className="w-[500px] h-auto rounded-lg shadow-md mb-6 lg:mb-0" />
        
        <div className='max-w-2xl px-10'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight dark:text-white'>
            Thrive with <span className='text-primary dark:text-green'>DevPulse</span>
          </h1>
          <p className='text-lg mb-6 dark:text-white'>
          Explore personalized programs and resources designed to enhance your skills, expand your network, and support your professional journey. From application to skill-building, DevPulse connects you with a like-minded community and impactful learning experiences.
          </p>
        </div>
      </div>

    
      <div className="flex flex-wrap gap-6 items-center px-10 ">
  <div className="flex flex-col p-6 shadow-md w-[320px] m-2 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-lg transition duration-300">
    <GrResources size={40} className='dark:text-white'/>
    <h3 className='dark:text-green text-xl font-semibold mb-2 text-primary'>Guidance</h3>
    <p className='text-black-600 dark:text-white'>
      Get expert guidance every step of the way. From applying to tracking your progress, 
      our team is here to help you succeed and reach your full potential.
    </p>
  </div>
  <div className="flex flex-col p-6 shadow-md w-[320px] m-2 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-lg transition duration-300">
    <FaUsers size={40} className='dark:text-white' />
    <h3 className='dark:text-green text-xl font-semibold mb-2 text-primary'>Community</h3>
    <p className='text-black-600 dark:text-white'>
    Connect with a community of like-minded tech enthusiasts, where you can share insights, ask questions, and build valuable relationships with peers and mentors.
    </p>
  </div>
  <div className="flex flex-col p-6 shadow-md w-[320px] m-2 cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-lg transition duration-300">
    <GrDocumentPerformance size={35} className='dark:text-white ' />
    <h3 className='dark:text-green text-xl font-semibold mb-2 text-primary'>Tools and Resources</h3>
    <p className='text-black-600 dark:text-white'>
    Access real-time tracking tools and resources designed to support your learning and professional growth. Our commitment to cutting-edge technology means you stay on top </p>
  </div>
  
</div>

    </div>
  )
}

export default AboutUs;
