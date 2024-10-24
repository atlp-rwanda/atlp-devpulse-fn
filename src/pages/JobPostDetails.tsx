import React, { useState, useEffect } from "react";
import { BsEnvelope } from "react-icons/bs";
import { TiExportOutline } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting, AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { getOnejobPostAllDetails } from "../redux/actions/jobs";
import { connect } from "react-redux";
import NavSidbar from "./../components/sidebar/navHeader";

const JobsDetails = (props: any) => {
  const { oneJobDetails } = props;

  const [ID, setId] = useState("634d18e1d82ebebbc0491eae");

  const [open, setOpen] = useState<boolean>(false);
  const handleDropDown = (state: boolean) => {
    setOpen(!state);
  };

  let input = {
    id: ID,
  };

  useEffect(() => {
    props.getOnejobPostAllDetails(input);
  }, []);

  const jobDetails = oneJobDetails.data;

  return (
    <>
      <NavSidbar />
      <div className="h-screen mt-[-6%] bg-[#374151]">
        <div className="block ml-[20%]  mt-20">
          <div className=" box-border bg-[rgb(31,42,55)] h-80 w-[70%] flex mb-3 mt-[6%] rounded  drop-shadow-lg">
            <div className="float-left ml-10 text-white">
              <h2 className="font-bold mt-5">Job Post Details</h2>
              <div className="mt-10 ml-7">
                <h3>Job Titleee</h3>
                <p className="text-gray-500 text-sm">ATLP</p>
                <h3>Program</h3>
                <p className="text-gray-500 text-sm">Andela Program</p>
                <h3>Cycle</h3>
                <p className="text-gray-500 text-sm">Cycle 1</p>
                <h3>Cohort</h3>
                <p className="text-gray-500 text-sm">+Cohort 27</p>
              </div>
            </div>
            {/* <div className="mt-20 float-right  ml-36 text-white">
              <h3>LastName</h3>
              <p className="text-gray-500 text-sm">John</p>
              <h3>City</h3>
              <p className="text-gray-500 text-sm">Huye</p>
              <h3>Email Address</h3>
              <p className="text-gray-500 text-sm">john@gmail.com</p>
              <h3>Date of Bith</h3>
              <p className="text-gray-500 text-sm"></p>
            </div> */}
          </div>
          <div className=" box-border bg-[#1F2A37] h-60 w-[70%] flex text-white  mb-3 rounded drop-shadow-lg">
            <div>
              <h2 className="top-5 m-5  font-medium">
                <BsFillPersonLinesFill className="float-left m-1" />
                Job Post Details
              </h2>
              <div className="ml-16">
                <h3>Application Phase</h3>
                <p className="text-gray-500 text-sm">Initial Phase</p>
                <h3 className="mt-5">Program</h3>
                <p className="text-gray-500 text-sm">
                  {" "}
                  Andela Technical Leadership Program
                </p>
              </div>
            </div>
            <div>
              <div className="mt-16 ml-12">
                <h3>Application Date</h3>
                <p className="text-gray-500 text-sm">Initial Phase</p>
                <h3 className="mt-5">Expected program start date</h3>
                <p className="text-gray-500 text-sm"> 08/01/2022</p>
              </div>
            </div>
          </div>
          <div className=" box-borde bg-[#1F2A37] h-40 w-[70%] flex mb-3 text-white rounded drop-shadow-lg">
            <h2 className="font-bold top-5 ml-5 mt-5 ">
              <AiFillSetting className="float-left m-1 " />
              Actions
            </h2>
            <div className="">
              <button className="bg-[#56C870] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-20 mr-5">
                <FcApproval className="float-left m-1" />
                Approve
              </button>

              {/* <div className=""> */}
              <button
                onClick={(e) => handleDropDown(open)}
                className="bg-[#56C870] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-16"
              >
                <TiExportOutline className="float-left m-1" />
                Export
                <AiFillCaretDown className="float-right m-1" />
                {open && (
                  <ul className="bg-[#1F2A37] font-light text-sm text-white m-1">
                    <li className="border-solid border-black border-b-2 ">
                      Export to PDF
                    </li>
                    <li>Export to CSV</li>
                  </ul>
                )}
              </button>
              {/* </div> */}

              <button className=" bg-[#56C870] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-8 ">
                <BsEnvelope className="float-left m-1" />
                Email
              </button>
              <button className="bg-[#DC5454] hover:text-red-500 hover:bg-[#1f544cef] text-white font-bold py-2 px-2 rounded ">
                <MdOutlineCancel className="float-left m-1" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default JobsDetails

const mapState = ({ traineeAllDetails }: any) => ({
  oneJobDetails: traineeAllDetails,
});

export default connect(mapState, {
  getOnejobPostAllDetails,
})(JobsDetails);
