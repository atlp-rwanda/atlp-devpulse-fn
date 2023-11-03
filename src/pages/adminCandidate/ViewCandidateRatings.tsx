import { useParams } from 'react-router';
import NavBar from '../../components/sidebar/navHeader';
import * as icons from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';


const ViewCandidateRatings = (props: any) => {
  const params = useParams();
  const [id, setId] = useState(params.id)

  return (
    <>
     <NavBar />
      <div className="h-screen flex justify-center items-center dark:bg-dark-frame-bg px-10 lg:ml-[230px] semi-md:ml-[230px]">
        <div className="flex flex-col justify-center mt-24  p-5 w-[95%] lg:w-1/2 md_:mx-auto overflow-hidden dark:bg-dark-bg px-20">
          <h2 className="text-white font-bold text-lg my-5 mx-auto">
          <icons.AiOutlineSolution  className="float-left m-1" />
            Candidate Assessment Information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8">
            
              <>
                <div className="flex flex-col mt-3">
                  <h3 className="text-white font-semibold">Candidate Names:</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                    {id}
                  </p>
                </div>
                <div className="flex flex-col mt-3">
                  <h3 className="text-white font-semibold">Assessment:</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                    {"Hackrank"}
                  </p>
                </div>
                <div className="flex flex-col mt-3">
                  <h3 className="text-white font-semibold">Grading system used:</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                    {"General grading"}
                  </p>
                </div>
                <div className="flex space-x-3 mt-3">
                  <h3 className="text-white font-semibold">Quantity:</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                    {"2"}
                  </p>
                </div>
                <div className="flex space-x-3 mt-3">
                  <h3 className="text-white font-semibold">Quality:</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                    {"1"}
                  </p>
                </div>
                <button
                  className="flex  rounded w-15 px-5 py-2 mt-10 bg-green   dark:text-white transition-colors hover:border hover:border-green mx-auto"
                >
                  Edit Rating
                </button>
              </>
          </div>
        </div>
      </div>
     
    </>
  );
};


export default ViewCandidateRatings;
