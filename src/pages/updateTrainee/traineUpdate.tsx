import React, { useEffect, useState,useRef } from "react";
import { updateTraine,updateTraineeAttributes,getTraineeToUpdate } from "../../redux/actions/updateTrainee";
import Select from 'react-select'
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { toast } from "react-toastify";
import NavBar from "../../components/sidebar/navHeader";
import { useParams } from "react-router";
import options from './traineeInputs';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import { locations } from "./locations";


const TraineeUpdate = (props:any) =>{
  const params = useParams();
  const [ID, setId] = useState(params.traineeId); 
  const dispatch = useAppDispatch()
  const traineeData = useAppSelector((state:any)=> state.getOneTraineeReducer?.data);
  const cycles = props?.cycles?.cycles?.data;
  const [provinces,setProvinces] = useState<any[]>([]);
  const [districts,setDistricts] = useState<any[]>([]);
  const [sectors,setSectors] = useState<any[]>([]);
  const phoneRef = useRef<any>();

  const getProvinces =()=>{
    Object.keys(locations).forEach(province => {
      provinces.push(province);
    });
  }

  const getDistrict=(provinceName:any)=>{
    const data = locations[provinceName];
    districts.length = 0;
    Object.keys(data).forEach(district =>{
      districts.push(district)
    })
  }

  const getSectors = (province:any,district:any)=>{
    const data = locations[province][district];
    sectors.length=0;
    Object.keys(data).forEach(sector =>sectors.push(sector))
  }

  useEffect(()=>{
    async function handleGetTrainee(){
      await dispatch(getTraineeToUpdate(ID));
    }
    props.getAllCycles()
    handleGetTrainee();
    getProvinces();
  },[]);

  const initialValues =Object.keys(traineeData).length !== 0?({
    firstname:traineeData && traineeData?.trainee_id?.firstName,
    lastname:traineeData && traineeData?.trainee_id?.lastName,
    gender:traineeData && traineeData?.gender,
    phone:traineeData && traineeData?.phone,
    address:traineeData && traineeData?.Address,
    birthDate:traineeData && traineeData?.birth_date,
    province:traineeData && traineeData?.province,
    district:traineeData && traineeData?.district,
    sector:traineeData && traineeData?.sector,
    field_of_study:traineeData && traineeData?.field_of_study,
    past_programs:traineeData && traineeData?.past_andela_programs,
    isStudent:traineeData && traineeData?.isStudent,
    hasLaptop:traineeData && traineeData?.haveLaptop,
    isEmployed:traineeData && traineeData?.isEmployed,
    level_education:traineeData && traineeData?.education_level,
    interview_decision:traineeData && traineeData?.interview_decision,
    cycle:traineeData && traineeData?.trainee_id?.cycle_id?.id,
    hackerrankScore:traineeData && traineeData?.Hackerrank_score,
    englishScore:traineeData && traineeData?.english_score,
  }):({});

  const [formData, setFormData] = useState(initialValues);

  const handleSubmit=async (event:any)=>{
    event.preventDefault();
    const reg = new RegExp('^((072|078|073))[0-9]{7}$', 'i');

    if(formData.firstname === ""){
      toast.error("Firstname is required")
    }
    else if(formData.lastname=== ""){
      toast.error("Lastname is required")
    }else if(formData.phone=== ""){
      toast.error("Phone number is required ")
    }else if(!reg.test(phoneRef?.current?.value)){
      toast.error("Invalid phone number")
    }else if(formData.address=== ""){
      toast.error("Address is required")
    }else if(formData.cycle=== undefined){
      toast.error("Please Select Cycle")
    }else if(formData.sector=== ""){
      toast.error("Sector is required")
    }else if(formData.province=== ""){
      toast.error("Province is required")
    }else if(formData.district=== ""){
      toast.error("District is required ")
    }else if(formData.field_of_study=== ""){
      toast.error("Field of study is required")
    }else if(formData.birthDate=== ""){
      toast.error("Date of birth is required")
    }else{
      try{
        const inputTrainee = {
          id:ID,
          firstName:formData.firstname,
          lastName:formData.lastname,
          cycle_id:formData.cycle
        };

        const inputAttributes={
          id:ID,
          past_andela_programs:formData.past_programs,
          interview_decision:formData.interview_decision,
          english_score:formData.englishScore,
          Hackerrank_score:formData.hackerrankScore,
          isStudent:formData.isStudent==='true'?true:false,
          haveLaptop:formData.hasLaptop==='true'?true:false,
          isEmployed:formData.isEmployed==='true'?true:false,
          sector:formData.sector,
          district:formData.district,
          province:formData.province,
          education_level:formData.level_education,
          field_of_study:formData.field_of_study,
          phone:formData.phone,
          Address:formData.address,
          birth_date:formData.birthDate,
          gender:formData.gender
        };

        await dispatch(updateTraine(inputTrainee));
        await dispatch(updateTraineeAttributes(inputAttributes))
        toast.success("Trainee updated successfully")
      } catch(err){
        console.log(err)
        toast.error("Updating trainee failed");
      }

    }
    
  }

  return (
    <>
      <NavBar />
      <div className="block bg-white relative lg:max-w-3xl mt-10 lg:left-[8rem] mx-auto sm:w-[100%]">
        <div className="text-center ext-sm font-bold text-gray-600 text-base pb-4 pt-16 py-4 text-[24px]">
          <h1>Update Trainee</h1>
        </div>
        <form className="block bg-white lg:px-4 mb-4 shadow border rounded mx-auto" onSubmit={handleSubmit}>
          {Object.keys(traineeData).length === 0 ? (<p className="text-center p-20">Loading data please wait.....</p>) : (
            <>
              <div className="flex">
                <div className="block lg:w-96 sm:w-[100%] px-2 pt-3 pb-4 mr-2 ml-2">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    First name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    defaultValue={traineeData.trainee_id.firstName}
                    onChange={(e) => setFormData({
                      ...formData,
                      firstname: e.target.value,
                    })}
                    placeholder="enter firstname"
                    required />
                </div>
                <div className="block lg:w-96 sm:w-[100%] px-2 pt-3 pb-4 mr-2 ml-2">
                  <label className="block text-gray-600 text-sm font-bold mb-2">
                    Last name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    defaultValue={traineeData.trainee_id.lastName}
                    onChange={(e) => setFormData({
                      ...formData,
                      lastname: e.target.value,
                    })}
                    placeholder="enter lastname"
                    required />
                </div>
              </div>
              <div className="flex">
                <div className="block w-96 px-2 pt-3 pb-4 mr-2 ml-2">
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Date of Birth
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="birthDate"
                      defaultValue={ new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(traineeData.birth_date)}
                      type="date"
                      onChange={(e) => setFormData({
                        ...formData,
                        birthDate: e.target.value,
                      })}
                      name="birthDate"
                      placeholder="enter date of birth"
                      required />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Province
                    </label>
                    <Select
                      className="shadow appearance-none border rounded w-full text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="province"
                      name="province"
                      options={
                        provinces?.map((province: any) => (
                          {value:`${province}`, label:`${province}`}
                        ))
                      }
                      defaultValue={{value:`${traineeData.province}`,label: `${traineeData.province}` }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          province: e?.value,
                        });
                        getDistrict(e?.value)
                      }}
                      placeholder="Select province"/>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      District
                    </label>
                    <Select
                      className="shadow appearance-none border rounded w-full text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="district"
                      name="district"
                      options={
                        districts?.map((district: any) => (
                          {value:`${district}`, label:`${district}`}
                        ))
                      }
                      defaultValue={{value:`${traineeData.district}`,label: `${traineeData.district}`}}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          district: e?.value,
                        })
                        getSectors(formData.province,e?.value)
                      }}
                      placeholder="Select district" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Sector
                    </label>
                    <Select
                      className="shadow appearance-none border rounded w-full text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="sector"
                      options={
                        sectors?.map((sector: any) => (
                          {value:`${sector}`, label:`${sector}`}
                        ))
                      }
                      defaultValue={{value:`${traineeData.sector}`,label: `${traineeData.sector}`}}
                      onChange={(e) => setFormData({
                        ...formData,
                        sector: e?.value,
                      })}
                      name="sector"
                      placeholder="Select sector" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Field of Study
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="field_of_study"
                      type="text"
                      defaultValue={traineeData.field_of_study}
                      onChange={(e) => setFormData({
                        ...formData,
                        field_of_study: e.target.value,
                      })}
                      name="field_of_study"
                      placeholder="enter sector"
                      required />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Past Andela Program
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="past_programs"
                      type="text"
                      defaultValue={traineeData.past_andela_programs}
                      onChange={(e) => setFormData({
                        ...formData,
                        past_programs: e.target.value,
                      })}
                      name="past_programs"
                      placeholder="Past Andela programs"
                      required />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Gender
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input
                          id="gender"
                          className="peer/published"
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={(e) => setFormData({
                            ...formData,
                            gender: e.target.value,
                          })}
                          defaultChecked={traineeData.gender === 'Male'}
                          required />
                        <label className="peer-checked/published:text-sky-500 px-2">Male</label>
                      </div>
                      <div className="ml-2">
                        <input
                          id="gender"
                          className="peer/published px-2"
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={(e) => setFormData({
                            ...formData,
                            gender: e.target.value,
                          })}
                          defaultChecked={traineeData.gender === 'Female'}
                          required />
                        <label className="peer-checked/published:text-sky-500 px-2">Female</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      have a laptop?
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input
                          id="hasLaptop"
                          className="peer/published"
                          type="radio"
                          name="hasLaptop"
                          value="true"
                          onChange={(e) => setFormData({
                            ...formData,
                            hasLaptop: e.target.value,
                          })}
                          defaultChecked={traineeData.haveLaptop === true}
                          required />
                        <label className="peer-checked/published:text-sky-500 px-2">Yes</label>
                      </div>
                      <div className="mr-2">
                        <input
                          id="hasLaptop"
                          className="peer/published"
                          type="radio"
                          name="hasLaptop"
                          value="false"
                          onChange={(e) => setFormData({
                            ...formData,
                            hasLaptop: e.target.value,
                          })}
                          defaultChecked={traineeData.haveLaptop === false}
                          required />
                        <label className="peer-checked/published:text-sky-500 px-2">No</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block w-96 px-2 pt-3 pb-4 mr-2 ml-2">
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Phone number
                    </label>
                    <input
                      className="shadow we appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      ref={phoneRef}
                      id="phone"
                      type="number"
                      name="phone"
                      defaultValue={traineeData.phone}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }}
                      placeholder="enter telephone number"
                      required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Address
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      type="text"
                      defaultValue={traineeData.Address}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: e.target.value,
                      })}
                      placeholder="enter address"
                      required />
                  </div>
                 
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Education Level
                    </label>
                    <Select
                      name="level_education"
                      className="shadow appearance-none border rounded w-full  text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      options={options.educationOptions}
                      defaultValue={options.educationOptions.find(({ value }) => value === traineeData.education_level)}
                      onChange={(e) => setFormData({
                        ...formData,
                        level_education: e?.value,
                      })}
                      placeholder="Please select level" />

                  </div>

                  <div className="mb-4">
                    <div className="lg:flex sm:block">
                      <div className="mr-2">
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                          English score(0-5)
                        </label>
                        <Select
                          className="shadow appearance-none border rounded w-full  text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                          options={options.scoreOptions}
                          defaultValue={options.scoreOptions.find(({ value }) => value === traineeData.english_score)}
                          onChange={(e) => setFormData({
                            ...formData,
                            englishScore: e?.value,
                          })}
                          placeholder="Score" />
                      </div>
                      <div className="mr-2">
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                          Hackerranck score(0-5)
                        </label>
                        <Select
                          className="shadow appearance-none border rounded w-full  text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                          options={options.scoreOptions}
                          defaultValue={options.scoreOptions.find(({ value }) => value === traineeData.Hackerrank_score)}
                          onChange={(e) => setFormData({
                            ...formData,
                            hackerrankScore: e?.value,
                          })}
                          placeholder="Score" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Interview decision
                    </label>
                    <Select
                      className="shadow appearance-none border rounded w-full  text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      options={options.interviewOptions}
                      placeholder="Interview decisison"
                      defaultValue={options.interviewOptions.find(({ value }) => value === traineeData.interview_decision)}
                      onChange={(e) => setFormData({
                        ...formData,
                        interview_decision: e?.value,
                      })} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Application cycle
                    </label>
                    <Select
                      className="shadow appearance-none border rounded w-full  text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      options={
                        cycles?.map((cycle: any) => (
                          {value:`${cycle.id}`, label:`${cycle.name}`}
                        ))
                      }
                      placeholder="Please select cycle"
                      defaultValue={{value:`${traineeData?.trainee_id?.cycle_id?.id}`,label: `${traineeData?.trainee_id?.cycle_id?.name}` }}
                      onChange={(e) => setFormData({
                        ...formData,
                        cycle: e?.value,
                      })} />
                      
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Is employed?
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input id="isEmployed"
                          className="peer/published"
                          type="radio"
                          name="isEmployed"
                          value="true"
                          onChange={(e) => setFormData({
                            ...formData,
                            isEmployed: e.target.value,
                          })}
                          defaultChecked={traineeData.isEmployed === true} />
                        <label className="peer-checked/published:text-sky-500 px-2">Yes</label>
                      </div>
                      <div className="mr-2">
                        <input id="isEmployed"
                          className="peer/published"
                          type="radio"
                          name="isEmployed"
                          value="false"
                          onChange={(e) => setFormData({
                            ...formData,
                            isEmployed: e.target.value,
                          })}
                          defaultChecked={traineeData.isEmployed === false} />
                        <label className="peer-checked/published:text-sky-500 px-2">No</label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-bold mb-2">
                      Is student?
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input id="student"
                          className="peer/published"
                          type="radio"
                          name="isStudent"
                          value="true"
                          onChange={(e) => setFormData({
                            ...formData,
                            isStudent: e.target.value,
                          })}
                          defaultChecked={traineeData.isStudent === true} />
                        <label className="peer-checked/published:text-sky-500 px-2">Yes</label>
                      </div>
                      <div className="mr-2">
                        <input id="student"
                          className="peer/published"
                          type="radio"
                          name="isStudent"
                          value="false"
                          onChange={(e) => setFormData({
                            ...formData,
                            isStudent: e.target.value,
                          })}
                          defaultChecked={traineeData.isStudent === false} />
                        <label className="peer-checked/published:text-sky-500 px-2">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex px-5 py-2 pb-8 w-fit">
                <button className="flex bg-gray-600 mx-2 rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                  Update
                </button>
                <Link to="/Trainee" className="flex bg-gray-600 rounded-md py-2 mx-2 px-4 text-white font-medium cursor-pointer">
                 Cancel
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

const mapState = (allCycles:any) => ({
  cycles: allCycles,
});

export default connect(mapState, {
  getAllCycles,
})(TraineeUpdate);
