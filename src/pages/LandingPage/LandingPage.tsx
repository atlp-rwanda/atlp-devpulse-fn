import Hero from "../../components/home/Hero";
import Header from "../../components/home/Header";
import AboutUs from "../../components/home/AboutUs";
import Blogs from "../../components/home/Blogs";
import Footer from "../../components/home/Footer";

import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero/>
      <AboutUs/>
      <Blogs/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
