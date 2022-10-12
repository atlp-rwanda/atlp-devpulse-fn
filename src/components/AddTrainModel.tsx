// import React, {useState } from 'react';
// import { AiOutlinePlus,AiOutlineClose} from "react-icons/ai";

// interface AddTraineeProps {
//     children: any,
//     onClick?: ()=>void;
// }
// const AddTrainModel = ({children}:AddTraineeProps) {
//     const [addNewTraineeModel, setAddNewTraineeModel] = useState(false);
  
//   const removeModel = () => {
//     let newState = !addNewTraineeModel
//     setAddNewTraineeModel(newState);
//   };
// function open(){
//   setAddNewTraineeModel(true);
// }
//     return ( 
//        <>
//         <div className={`h-screen w-screen z-20 bg-black bg-opacity-30 backdrop-blur-sm absolute flex items-center justify-center  px-4 ${
//           addNewTraineeModel === true ? 'block' : 'hidden'
//         }`}
//   >
           
//         <div className="bg-white dark:bg-dark-bg w-full sm:w-3/4  xl:w-4/12 rounded-lg p-4 pb-8">
//           <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
          
//             <h3 className="font-bold text-sm dark:text-white text-center w-11/12 ">
//               <AiOutlineClose className="float-right text-3xl cursor-pointer" onClick={()=>removeModel()}/>
              
              
//               {('New Trainee')}
             
//             </h3>
//             <hr className=" bg-primary border-b my-3 w-full" />
//           </div>
//           <div className="card-body">
//             <form className=" py-3 px-8">
//               <div className="input my-3 h-9 ">
//                 <div className="grouped-input flex items-center h-full w-full rounded-md">
//                   <input
//                     type="text"
//                     name="gpa"
//                     className=" dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-xs py-2 w-full"
//                     placeholder={('FirstName')}
//                   />
//                 </div>
//               </div>
//               <div className="input my-3 h-9 ">
//                 <div className="grouped-input flex items-center h-full w-full rounded-md">
//                   <input
//                     type="text"
//                     name="definition"
//                     className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full"
//                     placeholder={('LastName')}
//                   />
//                 </div>
//               </div>
//               <div className="input my-3 h-9 ">
//                 <div className="grouped-input flex items-center h-full w-full rounded-md">
//                   <input
//                     type="text"
//                     name="grade"
//                     className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full"
//                     placeholder={('Email')}
//                   />
//                 </div>
//               </div>
//               <div className="input my-3 h-9 ">
//                 <div className="grouped-input flex items-center h-full w-full rounded-md">
//                 <select className="dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full">
//                    <option className="text-white">Select gender</option>
//           <option>Male</option>
//           <option>Female</option>
//           <option>Other</option>
//         </select>
                 
//                 </div>
//               </div>

             

//               <div className="input my-3 h-9 ">
//                 <div className="grouped-input flex items-center h-full w-full rounded-md">
//                   {/* <input
//                     type="text"
//                     name="grade"
//                     className=" dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full"
//                     placeholder={('Cohort')}
//                   /> */}
//                    <select className="dark:bg-dark-tertiary border border-primary py-2 rounded outline-none px-5 font-sans text-xs w-full">
//                    <option className="text-white">Select  cycle</option>
//           <option>1</option>
//           <option>2</option>
//           <option>3</option>
//         </select>
//                 </div>
//               </div>

//               <div className="w-full flex justify-between">
//                 <button
              
//                   onClick={() => removeModel()}
//                 >
//                   {('Cancel')}
//                 </button>
//                 <button
        
//                 >
//                   {('Save')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
      
//        </>
//      );
// }
 
// export default  AddTrainModel;