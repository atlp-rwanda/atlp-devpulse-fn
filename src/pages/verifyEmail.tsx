import { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { verifyEmailAction } from "../redux/actions/verifyEmailAction";
import { Spin } from "antd";
import Button from "../components/form/Button";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function verify() {
      try {
        const response = await verifyEmailAction(); 
        

        if (!response?.data?.data?.verifyUser?.isVerified) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    }

    verify(); 
  }, [navigate]); 


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }


  return <>
  <div className="flex items-center  justify-center mx-auto bg-[#374151] h-screen">
      <div className="bg-[#1F2A37] w-[30vw]  flex h-[70vh] flex-col items-center justify-center rounded-sm sm:w-5/6 lg:w-[45vw]">
          <div
              className={`rounded-full flex items-center justify-center p-4 mx-auto mb-4`}
          >
              <AiOutlineCheck className="text-white text-4xl" />
          </div>
          <div className="text-[#afb1b4] text-lg mb-4 font-inter">
              <p>Your account has been succefully verified !</p>
          </div>
          <Link to="/login" ><Button label="Continue" className="w-[80px]" /></Link>
      </div>
  </div>
</>
};

export default VerifyEmail;
