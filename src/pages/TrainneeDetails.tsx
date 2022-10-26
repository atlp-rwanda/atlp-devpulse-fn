import React, {useState, useEffect} from "react";
import { BsEnvelope } from "react-icons/bs";
import { TiExportOutline } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting, AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Sidebar from "../components/sidebar/sidebar";


const TrainneeDetails = () => {
    

  const [open, setOpen] = useState<boolean>(false);
  const handleDropDown = (state : boolean)=>{
    setOpen(!state)
  }
  console.log(open)


  const getTraine = ()=>{
    fetch('http://localhost:4000',{
      method:'POST',
      headers: {"Content-type": "application/json"},
      body:JSON.stringify({
       
        query:`
        query GetAllTrainees {
          getAllTrainees {
            id
            email
            lastname
            firstname
          }
        }
        `,
      
      })
    }).then(res => res.json())
       .then(data =>{
         console.log(data.data.getAllTrainees)
       })
  }

  
  return (
    <>
    <Sidebar />
      <div className="h-screen m-0 mt-[-50%] z-10">
        <div className="block lg:ml-[30%]  ">
          <div className="max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex ">
            <div className="md:flex ">
              

              <h2 className="font-bold m-5 md:m-3 ">
              <BsFillPersonLinesFill className="float-left m-1" />
                Applicant Information</h2>
              
              <div className=" m-5 md:shrink-0 lg:mt-20 lg:ml-[-45%]">
                <h3>FirstName</h3>
                <p className="text-gray-500 text-sm">John</p>
                <h3>Country</h3>
                <p className="text-gray-500 text-sm">Rwanda</p>
                <h3>Address</h3>
                <p className="text-gray-500 text-sm">Bugesera , Nyamata</p>
                <h3>Phone Number</h3>
                <p className="text-gray-500 text-sm">+250781664001</p>
              </div>
            </div>
            <div className="m-5 md:ml-2 lg:mt-20">
              <h3>LastName</h3>
              <p className="text-gray-500 text-sm">John</p>
              <h3>City</h3>
              <p className="text-gray-500 text-sm">Huye</p>
              <h3>Email Address</h3>
              <p className="text-gray-500 text-sm">john@gmail.com</p>
              <h3>Date of Bith</h3>
              <p className="text-gray-500 text-sm">07/07/1990</p>
            </div>
          </div>
          <div className=" max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex">
            <div>
              <h2 className="top-5 m-5  font-medium">
                <BsFillPersonLinesFill className="float-left m-1" />
                Application Information
              </h2>
              <div className="ml-12 lg:my-14">
                <h3>Application Phase</h3>
                <p className="text-gray-500 text-sm">Initial Phase</p>
                <h3 className="mt-5">Program</h3>
                <p className="text-gray-500 text-sm"> Andela Technical Leadership Program</p>
              </div>
            </div>
            <div>
            <div className="mt-8 ml-12 lg:mt-24">
              <h3>Application Date</h3>
                <p className="text-gray-500 text-sm">Initial Phase</p>
                <h3 className="mt-5">Expected program start date</h3>
                <p className="text-gray-500 text-sm"> 08/01/2022</p>
              </div>
            </div>
          </div>
          <div className=" max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:h-[30%]">
            <h2 className="font-bold top-5 ml-5 mt-5 ">
              <AiFillSetting className="float-left m-1 " />
              Actions
            </h2>
            <div className="grid sm:grid-rows-4 gap-3 w-[50%] ml-4 lg:grid-cols-4 lg:w-[100%]">
              <button onClick={getTraine} className="bg-[#10292C] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded ">
                <FcApproval className="float-left m-1" />
                Approve
              </button>
              
              {/* <div className=""> */}
              <button onClick={e=>handleDropDown(open)} className="bg-[#10292C] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded">
                <TiExportOutline className="float-left m-1" />
                Export
                <AiFillCaretDown className="float-right m-1" />
              
                {open &&
                  (
                    <ul className="bg-white font-light text-sm text-black m-1">
                      <li className="border-solid border-black border-b-2 ">Export to PDF</li>
                      <li>Export to CSV</li>
                    </ul>
                  )
                }
                </button>
                {/* </div> */}
          
              <button className=" bg-[#10292C] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded  ">
                <BsEnvelope className="float-left m-1" />
                Email
              </button>
              <button className="bg-[#DC5454] hover:text-red-500 hover:bg-[#1f544cef] text-white font-bold py-2 px-2 rounded lg:px-0 ">
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
 export default TrainneeDetails