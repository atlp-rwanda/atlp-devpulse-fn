import React, {useState } from 'react';
import { AiOutlineClose} from "react-icons/ai";
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
createTrainee
} from "../../../redux/actions/TraineeAction";
import { connect } from "react-redux";
function model(props: any) {

  const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);

  const removeModel = () => {
    location.reload()
    let newState = !addNewTraineeModel
    setAddNewTraineeModel(newState);
  };


// CREATE TRAINEE

const [firstName, setFirstname] = useState("");
const [lastName, setLastname] = useState("");
const [email, setEmail] = useState("");

const validation = () =>{
  if(firstName=== ""){
    toast.error("Enter your firstname")
  }
  if(lastName=== ""){
    toast.error("Enter your Lastname")
  }
  if(email=== ""){
    toast.error("Enter your Email")
  }
  else{
    createNewTrainee()
  }
}

function reload(){
  location.reload()
}

const createNewTrainee = () => {
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
   
  if(props.createTrainee(data)){
    setFirstname("");
    setLastname("");
    setEmail("");
  //   toast.success("succeed")
  setAddNewTraineeModel(false);
  setTimeout(reload, 3000)
  }
};



  return (
    <>
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
                  value={firstName}
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
                  value={lastName}
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
            <button   
               className="flex bg-primary rounded-md py-2 px-4 text-white font-medium cursor-pointer m-auto"
            onClick={ validation}>save</button>
            
            
          </section>
        </div>
      </div>
    </>
  )
}

// export default model
const mapState = ({ trainee }: any) => ({
    alltrainees: trainee,
  });
  
  export default connect(mapState, {
    createTrainee
  })(model);