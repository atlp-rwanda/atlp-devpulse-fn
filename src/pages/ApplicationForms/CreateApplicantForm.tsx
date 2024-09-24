import React from "react";
import ApplicationForm from "../../components/GoogleForm/ApplicationForm";
import NavBar from "../../components/sidebar/navHeader";
import SaveFormDetails from "../../components/GoogleForm/SaveForm";

const ApplicationFormPage = () => {
  return (
    <>
      <div className="dark:bg-dark-frame-bg w-full">
        <div className=" dark:text-white flex justify-center">
          <div className="min-h-[50vh] w-[80%] block md:w-[100%]">
            <ApplicationForm />
            <SaveFormDetails />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ApplicationFormPage;
