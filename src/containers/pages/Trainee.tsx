/* eslint-disable */
import React, {useState,useEffect } from 'react';
import grade from '../../dummyData/Trainee.json';
// import Button from "../../components/Button";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlinePlus,AiOutlineClose} from "react-icons/ai";
import Pagination from "../../components/Pagination";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
getAllTraineess,
createTrainee
} from "../../redux/actions/TraineeAction";
import { connect } from "react-redux";


const AddTrainee = (props: any) => {
  // const succeed = () => toast("SUCCEED");
  const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);
  // const dumData=grade;
  const removeModel = () => {
    let newState = !addNewTraineeModel
    setAddNewTraineeModel(newState);
  };
function open(){
  setAddNewTraineeModel(true);
}

// CREATE TRAINEE

const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [email, setEmail] = useState("");

const createNewTrainee = () => {
  const data = {
    firstname: firstname,
    lastname: lastname,
    email: email,
  };
   
  if(props.createTrainee(data)){
  // console.log("yolla",data)
  setAddNewTraineeModel(false);
  toast.success("succeed")
  }else{
  toast.error("error")
  }
};


// LIST ALL TRAINEE
  const { alltrainees } = props;
useEffect(() => {
  props.getAllTraineess();
}, []);
const trainees = alltrainees.data;
// const trainees = grade;
// console.log("hello",trainees)
  return (
    <>
      <ToastContainer />
      {/* =========================== Start:: addnewtraineeModel  =============================== */}
      <div className={`h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 ${
          addNewTraineeModel === true ? 'block' : 'hidden'
        }`}
  >
           
        <div className="bg-white dark:bg-dark-bg w-full sm:w-3/4  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
          
            <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
              <AiOutlineClose className="float-right text-3xl cursor-pointer" onClick={()=>removeModel()}/>
              
              
              {('New Trainee')}
             
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
             <section className=" py-3 px-8"
          >
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="gpa"
                    className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full pt-4"
                    placeholder={('FirstName')}
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="definition"
                    className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                    placeholder={('LastName')}
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="grade"
                    className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4"
                    placeholder={('Email')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                <select className="dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4">
                   <option className="text-white">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
                 
                </div>
              </div>

             

              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  {/* <input
                    type="text"
                    name="grade"
                    className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full"
                    placeholder={('Cohort')}
                  /> */}
                   <select className="dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full pt-4 ">
                   <option className="text-white">Select  cycle</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        
                </div>
        
               
              </div>

              <button   
                 className="flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer m-auto"
              onClick={ createNewTrainee}>save</button>
              
              
            </section>
          </div>
        </div>
      </div>
      {/* =========================== End:: addnewtraineeModel =============================== */}
      <div className="flex flex-col h-screen">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden">
                <div className="flex items-left px-7 lg:px-64 pt-24">
                  <div className="flex px-5 py-2 pb-8 w-fit">
                     <button 
                    onClick={open} 
                    className="flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                    <AiOutlinePlus className="mt-1 mr-1 font-bold"/>  Trainee
                    </button>
                    <div>
      
      </div>
                      {/* <Button>
<AiOutlinePlus className="mt-1 mr-1 font-bold"/>  Trainee


                    </Button> */}
                  </div>
                </div>
                <div className="px-3 md:px-8">
                  <div className="bg-white dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10">
                    <div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block w-full lg:min-w-full shadow rounded-lg overflow-hidden">
                          <table className="min-w-full leading-normal">
                            <thead className=" w-full px-32">
                              <tr>
                                <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {('firstname')}
                                </th>

                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                  {('lastname')}
                                </th>

                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {('gender')}
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {('email')}
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {('cycle')}
                                </th>
                                <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                  {('action')}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                            {trainees?.map((values: any, i: number) => {
                                return (
                                  <tr 
                                  >
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex">
                                        <div className="">
                                          <p className="text-gray-900 float-left dark:text-white whitespace-no-wrap">
                                            {values.firstname}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                            {values.lastname}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                            {values.gender}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 dark:text-white whitespace-no-wrap">
                                            {values.email}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex  items-center">
                                        <div className="">
                                          <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                            {values.cohort}
                                           
                                          </p>
                                        
                                        </div>
        
                                      </div>
                                    </td>
                                    <td className="border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex">
                                        <HiDotsVertical  className=" text-black text-3xl ml-6 font-size-6 cursor-pointer"/>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pagination/>
                </div>
               
              </div>
              
            </div>
           
          </div>
        </div>
      
      </div>
    </>
  );
};

// export default AddTrainee;

const mapState = ({ trainee }: any) => ({
  alltrainees: trainee,
});

export default connect(mapState, {
  getAllTraineess,
  createTrainee
})(AddTrainee);
