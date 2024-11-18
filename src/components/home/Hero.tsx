import React from 'react';
const heroImage: string = require("../../assets/Andela_Rwanda_Engineers_zr7awr.jpg").default;

const Hero = () => {
  return (
    <div
      className="flex flex-col justify-center h-screen bg-cover bg-center p-4 md:p-6 lg:p-10 relative bg-fixed"
      style={{ backgroundImage: `url(${heroImage})` }}
    >

      <div className="absolute inset-0 bg-black opacity-50"></div>


      <div className="relative z-10 text-white p-6 md:p-10 max-w-lg sm:max-w-xl lg:max-w-2xl ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Empower Your Journey in Tech <br /> with <span className="text-primary dark:text-green">DevPulse</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed">
          Apply, track, and grow. DevPulse is here to support your path from application to excellence.
        </p>
        <button className="px-6 sm:px-8 py-2 sm:py-3 dark:bg-green bg-primary  hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
