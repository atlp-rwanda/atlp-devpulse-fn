import React, {useState, useEffect} from "react";
import { BsEnvelope } from "react-icons/bs";
import { TiExportOutline } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { AiFillSetting, AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Sidebar from "../components/sidebar/sidebar";
import { getOneTraineeAllDetails } from "../redux/actions/trainnee";
import { connect } from "react-redux";
import Navbar from './../components/sidebar/navHeader'





const TrainneeDetails = (props: any) => {

  const {oneTraineeDetails} = props;

  const [ID, setId] = useState("636b68e8ae3dfddbac7dc32f");

  const [open, setOpen] = useState<boolean>(false);
  const handleDropDown = (state : boolean)=>{
    setOpen(!state)
  }

  let input = {
    id: ID,
  };

  useEffect(() => {
    props.getOneTraineeAllDetails(input);
  }, []);

  const traineeDetails = oneTraineeDetails.data;
  console.log('traineeDetails', traineeDetails)



  

  
  return (
    <>
    <Navbar  />
      <div className="h-screen m-0 mt-20  ">
        <div className="block lg:ml-[30%]   ">
        {   traineeDetails &&   
          <div className="max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex lg:max-w-2xl ">
            <div className="md:flex  ">
              

              <h2 className="top-5 m-5  font-medium  md:m-3 ">
              <BsFillPersonLinesFill className="float-left m-1" />
                Applicant Information</h2>
          {/* {
             traineeDetails.data.map(post=>{
               return(
                 <div key={post.id}>
                   <h3>{post.gender}</h3>
                   {
                    post.trainee_id && post.trainee_id.map(data=>(
                       <div key={post.id}>
                       <h3>{data.firstName}</h3>
                       </div>
                     ))
                   }

                 </div>
               )
             })
             
              
          } */}
        <div className=" m-5 sm:mt-20 sm:ml-[-13rem] md:shrink-0  lg:ml-10 lg:mt-10  ">
             
               {traineeDetails.trainee_id && <> <h3>FirstName</h3>
                <p className="text-gray-500 text-sm">{traineeDetails.trainee_id.firstName}</p></>}
                <h3>Gender</h3>
                <p className="text-gray-500 text-sm">{traineeDetails.gender}</p>
                <h3>Address</h3> 
                <p className="text-gray-500 text-sm">{traineeDetails.Address}</p>
                <h3>Phone Number</h3>
                <p className="text-gray-500 text-sm">{traineeDetails.phone}</p>
                <h3>Field of Study</h3>
                <p className="text-gray-500 text-sm">{traineeDetails.field_of_study}</p>
                <h3>Education Level</h3>
                <p className="text-gray-500 text-sm">{traineeDetails.education_level}</p>
                <h3>Cohort</h3>
                <p className="text-gray-500 text-sm">{traineeDetails.cohort}</p>
                <h3>Is Employed</h3>
                <p className="text-gray-500 text-sm">{String(traineeDetails.isEmployed)}</p>
                {traineeDetails.trainee_id && <>
                <h3>Email </h3>
                <p className="text-gray-500 text-sm">{traineeDetails.trainee_id.email}</p>
                
                </>}
               
              </div>
            </div>
            <div className="m-5 sm:ml-[25rem] md:ml-2 lg:mt-20 lg:ml-[5rem]">
              {traineeDetails.trainee_id && <>
              
              <h3>LastName</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.trainee_id.lastName}</p>
              </>}
              <h3>Province</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.province}</p>
              <h3>District</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.district}</p>
              <h3>Sector</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.sector}</p>
              <h3>Is Student</h3>
              <p className="text-gray-500 text-sm">{String(traineeDetails.isStudent)}</p>
              <h3>Hackerrank Score</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.Hackerrank_score}</p>
              <h3>English Score</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.english_score}</p>
              <h3>Date of Bith</h3>
              <p className="text-gray-500 text-sm">{traineeDetails.birth_date}</p>
             
            </div>
          </div>}
          <div className=" max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl mb-6 lg:flex lg:max-w-2xl">
            <div>
              <h2 className="top-5 m-5  font-medium">
                <BsFillPersonLinesFill className="float-left m-1" />
                Application Information
              </h2>
              <div className="m-5 lg:my-14">
                <h3>Application Phase</h3>
                <p className="text-gray-500 text-sm">Initial Phase</p>
                <h3 className="mt-5">Program</h3>
                <p className="text-gray-500 text-sm"> Andela Technical Leadership Program</p>
              </div>
            </div>
            <div>
            <div className="mt-8 m-5 lg:mt-24">
              <h3>Application Date</h3>
                <p className="text-gray-500 text-sm">Initial Phase</p>
                <h3 className="mt-5">Expected program start date</h3>
                <p className="text-gray-500 text-sm"> 08/01/2022</p>
              </div>
            </div>
          </div>
          <div className=" max-w-md mx-5 bg-slate-50 rounded-xl shadow-md overflow-hidden md:max-w-xl  lg:max-w-2xl  ">
            <h2 className="font-bold top-5 ml-5 mt-5 ">
              <AiFillSetting className="float-left m-1 " />
              Actions
            </h2>
            <div className=" btn ml-5 mt-[-10%] mb-3   ">
              <button  className="btn-Aprov  bg-[#10292C] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mt-20 mr-1">
                <FcApproval className="float-left m-1" />
                Approve
              </button>
              
              {/* <div className=""> */}
              <button onClick={e=>handleDropDown(open)} className="btn-Aprov bg-[#10292C] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-8">
                <TiExportOutline className="float-left m-1" />
                Export
                <AiFillCaretDown className="float-right m-1" />
              
                {open &&
                  (
                    <ul className="bg-[#1F2A37] font-light text-sm text-white m-1">
                      <li className="border-solid border-black border-b-2 ">Export to PDF</li>
                      <li>Export to CSV</li>
                    </ul>
                  )
                }
                </button>
                {/* </div> */}
          
              <button className="btn-Aprov2 bg-[#10292C] hover:bg-[#1f544cef] text-white font-bold py-2 px-4 rounded mr-8 ">
                <BsEnvelope className="float-left m-1" />
                Email
              </button>
              <button className="btn-Aprov3 bg-[#DC5454] hover:text-red-500 hover:bg-[#1f544cef] text-white font-bold py-2 px-2 rounded ">
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
//  export default TrainneeDetails
const mapState = ({ traineeAllDetails }: any) => ({
  oneTraineeDetails: traineeAllDetails
})

export default connect(mapState, {
  getOneTraineeAllDetails,
})(TrainneeDetails)