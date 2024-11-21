import React from 'react';
import { Link } from "react-router-dom";
const logo: string = require("../../assets/logo.svg").default;
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
  <footer className='dark:bg-dark-bg bg-white text-primary dark:text-white pt-6'>
    <div className=" dark:bg-dark-bg bg-white text-primary dark:text-white flex flex-wrap justify-around items-center  border-t pt-6">
      <div className="flex flex-col mb-4 md:mb-0 md:w-auto ">
       <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <h1 className="text-lg font-bold font-lexend text-primary dark:text-green">
            PULSE
          </h1>
        </Link>
        <p className="text-sm text-primary dark:text-white mt-2 ">
          Your partner in tech growth and professional success.
        </p>
       
        <div className="flex space-x-4 text-primary dark:text-white mt-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green">
            <FaFacebookF size={30} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green">
            <FaTwitter size={30} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green">
            <FaLinkedinIn size={30} />
          </a>
        </div>
      </div>

      <ul className="flex flex-col  text-primary dark:text-white  ">
      <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
        <li><a href="#home" className="hover:text-green">→ Home</a></li>
        <li><a href="#about" className="hover:text-green ">→ About Us</a></li>
        <li><a href="#blogs" className="hover:text-green">→ Blogs</a></li>
      </ul>

      <ul className="flex flex-col  text-primary dark:text-white   ">
        <h3 className="font-semibold text-lg mb-2">Contact</h3>
        <li className="text-primary dark:text-white">Email: support@devpulse.com</li>
        <li className="text-primary dark:text-white">Phone: +250 789 0000</li>
        <li className="text-primary dark:text-white">Address: KGL Norresken </li>
        
      </ul>
    </div>
    <div className="w-full text-center  mt-4 bg-white dark:bg-dark-bg">
        <p className="text-primary dark:text-white text-sm">&copy; {new Date().getFullYear()} DevPulse. All rights reserved.</p>
      </div>
  </footer>
  );
};

export default Footer;
