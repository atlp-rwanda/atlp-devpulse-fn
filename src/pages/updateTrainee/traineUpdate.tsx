import React, { useEffect, useState, useRef } from "react";
import {
  updateTraine,
  updateTraineeAttributes,
  getTraineeToUpdate,
} from "../../redux/actions/updateTrainee";
// import Select from 'react-select'
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { toast } from "react-toastify";
import NavBar from "../../components/sidebar/navHeader";
import { useParams } from "react-router";
import options from "./traineeInputs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCycles } from "../../redux/actions/cyclesActions";
import { locations } from "./locations";
import SelectField from "../../components/ReusableComponents/Select";

const TraineeUpdate = (props: any) => {
  const params = useParams();
  const [ID, setId] = useState(params.traineeId);
  const dispatch = useAppDispatch();
  const traineeData = useAppSelector(
    (state: any) => state.getOneTraineeReducer?.data
  );
  const cycles = props?.cycles?.cycles?.data;
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    birthDate: "",
    province: "",
    district: "",
    sector: "",
    field_of_study: "",
    past_programs: "",
    isStudent: "",
    hasLaptop: "",
    isEmployed: "",
    level_education: "",
    interview_decision: "",
    cycle: "",
    hackerrankScore: "",
    englishScore: "",
    gender: "",
  });
  const [errors, setErrors] = useState<any>({});
  console.log(errors);

  const getProvinces = () => {
    const provinceList = Object.keys(locations);
    setProvinces(provinceList);
  };

  const getDistricts = (provinceName: any) => {
    try {
      const data = locations[provinceName];
      const districtList = Object.keys(data);
      setDistricts(districtList);
    } catch (error) {
      console.log(error);
    }
  };

  const getSectors = (provinceName: any, districtName: any) => {
    try {
      const data = locations[provinceName][districtName];
      const sectorList = Object.keys(data);
      setSectors(sectorList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("ID:", ID);
    // console.log("props.getAllCycles:", props.getAllCycles);
    // console.log("dispatch:", dispatch);

    async function handleGetTrainee() {
      await dispatch(getTraineeToUpdate(ID));
    }
    props.getAllCycles();
    handleGetTrainee();
    getProvinces();
  }, [dispatch, props.getAllCycles, ID]);

  useEffect(() => {
    if (traineeData) {
      console.log(traineeData);
      console.log(traineeData.sector);

      setFormData({
        firstname: traineeData?.trainee_id?.firstName || "",
        lastname: traineeData?.trainee_id?.lastName || "",
        gender: traineeData?.gender || "",
        phone: traineeData?.phone || "",
        address: traineeData?.Address || "",
        birthDate: traineeData?.birth_date || "",
        province: traineeData?.province || "",
        district: traineeData?.district || "",
        sector: traineeData?.sector || "",
        field_of_study: traineeData?.field_of_study || "",
        past_programs: traineeData?.past_andela_programs || "",
        isStudent: traineeData?.isStudent || "",
        hasLaptop: traineeData?.haveLaptop || "",
        isEmployed: traineeData?.isEmployed || "",
        level_education: traineeData?.education_level || "",
        interview_decision: traineeData?.interview_decision || "",
        cycle: traineeData?.trainee_id?.cycle_id?.id || "",
        hackerrankScore: traineeData?.Hackerrank_score || "",
        englishScore: traineeData?.english_score || "",
      });
      setDistricts([traineeData.district]);
      setSectors([traineeData.sector]);
    }
  }, [traineeData]);

  const validateForm = () => {
    const reg = new RegExp("^((072|078|073))[0-9]{7}$", "i");
    const newErrors: any = {};

    const englishScore = parseFloat(formData.englishScore);
    const hackerrankScore = parseFloat(formData.hackerrankScore);

    if (!formData.firstname) newErrors.firstname = "Firstname is required";
    if (!formData.lastname) newErrors.lastname = "Lastname is required";
    if (!formData.phone || formData.phone === "-") {
      newErrors.phone = "Phone number is required";
    } else if (!reg.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.cycle) newErrors.cycle = "Please Select Cycle";
    if (!formData.sector || formData.sector == "-")
      newErrors.sector = "Please choose a sector";
    if (!formData.province || formData.province == "-")
      newErrors.province = "Province is required";
    if (!formData.district || formData.district == "-")
      newErrors.district = "Please choose a district";
    if (!formData.gender || formData.gender == "-")
      newErrors.gender = "Gender is required";
    if (!formData.level_education || formData.level_education == "-")
      newErrors.level_education = "can't be blank";
    if (!formData.interview_decision || formData.interview_decision == "-")
      newErrors.interview_decision = "can't be blank";
    if (!formData.field_of_study || formData.field_of_study == "-")
      newErrors.field_of_study = "Field of study is required";
    if (!formData.birthDate || formData.birthDate == "946677600000")
      newErrors.birthDate = "select date";
    if (!formData.address || formData.address == "-")
      newErrors.address = "Address is required";
    if (!formData.englishScore || formData.englishScore == "-")
      newErrors.Escores = "score is required";
    if (!formData.hackerrankScore || formData.hackerrankScore == "-")
      newErrors.Hscores = "score is required";
    if (englishScore > 100 || englishScore < 0)
      newErrors.Escores = "Score must be between 0-100";
    setErrors(newErrors);
    if (hackerrankScore > 100 || hackerrankScore < 0)
      newErrors.Hscores = "Score must be between 0-100";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const inputTrainee = {
        id: ID,
        firstName: formData.firstname,
        lastName: formData.lastname,
        cycle_id: formData.cycle,
      };

      const inputAttributes = {
        id: ID,
        past_andela_programs: formData.past_programs,
        interview_decision: formData.interview_decision,
        english_score: formData.englishScore,
        Hackerrank_score: formData.hackerrankScore,
        isStudent: formData.isStudent === "true" ? true : false,
        haveLaptop: formData.hasLaptop === "true" ? true : false,
        isEmployed: formData.isEmployed === "true" ? true : false,
        sector: formData.sector,
        district: formData.district,
        province: formData.province,
        education_level: formData.level_education,
        field_of_study: formData.field_of_study,
        phone: formData.phone,
        Address: formData.address,
        birth_date: formData.birthDate,
        gender: formData.gender,
      };

      await dispatch(updateTraine(inputTrainee));
      await dispatch(updateTraineeAttributes(inputAttributes));
      toast.success("Trainee updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Updating trainee failed");
    }
  };
  return (
    <>
      
      <div className="block bg-white dark:bg-dark-tertiary relative mt-10 w-[100%] py-3 min-h-[100vh]">
        <div className="block text-center font-bold text-gray-600 relative lg:left-[8rem] dark:text-white text-base lg:max-w-3xl sm:w-[100%] p-4 lg:px-4 m-4 mx-auto text-[24px]">
          <h1 className="p-2">Update Trainee-applicant</h1>
        </div>
        <form
          className="block bg-white dark:bg-dark-frame-bg lg:max-w-3xl sm:w-[100%] min-h-[100vh] relative lg:left-[8rem] dark:text-white lg:px-4 mb-4 text-gray-600  shadow rounded mx-auto"
          onSubmit={handleSubmit}
        >
          {Object.keys(traineeData).length === 0 ? (
            <p className="text-center p-20">Loading data please wait.....</p>
          ) : (
            <>
              <div className="flex">
                <div className="block lg:w-96 sm:w-[100%] px-2 pt-3 pb-4 mr-2 ml-2">
                  <label className="block text-sm font-bold mb-2">
                    First name
                  </label>
                  <input
                    className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    defaultValue={traineeData.trainee_id.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstname: e.target.value,
                      })
                    }
                    placeholder="enter firstname"
                  />
                  {errors.firstname && (
                    <div className="text-red-500 text-md mt-1 mb-1 font-bold">
                      {errors.firstname}
                    </div>
                  )}
                </div>
                <div className="block lg:w-96 sm:w-[100%] px-2 pt-3 pb-4 mr-2 ml-2">
                  <label className="block text-sm font-bold mb-2">
                    Last name
                  </label>
                  <input
                    className=" dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    defaultValue={traineeData.trainee_id.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastname: e.target.value,
                      })
                    }
                    placeholder="enter lastname"
                  />
                  {errors.lastname && (
                    <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                      {errors.lastname}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="block w-96 px-2 pt-3 pb-4 mr-2 ml-2">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Date of Birth
                    </label>
                    <input
                      className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="birthDate"
                      type="date"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          birthDate: e.target.value,
                        })
                      }
                      name="birthDate"
                      placeholder="mm/dd/yyyy"
                    />
                    {errors.birthDate && (
                      <div className="text-red-500 text-md mt-1 mb-1 font-bold">
                        {errors.birthDate}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Province
                    </label>
                    <SelectField
                      id="province"
                      name="province"
                      defaultValue={traineeData.province}
                      options={provinces.map((province: any) => ({
                        value: province,
                        label: province,
                      }))}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          province: e.target.value,
                        });
                        getDistricts(e.target.value);
                      }}
                    />
                    {errors.province && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.province}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      District
                    </label>
                    <SelectField
                      id="district"
                      name="district"
                      defaultValue={traineeData.district}
                      options={districts.map((district: any) => ({
                        value: district,
                        label: district,
                      }))}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          district: e.target.value,
                        });
                        getSectors(formData.province, e.target.value);
                      }}
                    />
                    {errors.district && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.district}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Sector
                    </label>
                    <SelectField
                      id="sector"
                      name="sector"
                      defaultValue={traineeData.sector}
                      options={sectors.map((sector: any) => ({
                        value: sector,
                        label: sector,
                      }))}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sector: e.target.value,
                        })
                      }
                    />
                    {errors.sector && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.sector}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Field of Study
                    </label>
                    <input
                      className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="field_of_study"
                      type="text"
                      defaultValue={traineeData.field_of_study}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          field_of_study: e.target.value,
                        })
                      }
                      name="field_of_study"
                      placeholder="Enter field of study"
                    />
                    {errors.field_of_study && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.field_of_study}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Past Andela Program
                    </label>
                    <input
                      className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="past_programs"
                      type="text"
                      defaultValue={traineeData.past_andela_programs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          past_programs: e.target.value,
                        })
                      }
                      name="past_programs"
                      placeholder="Past Andela programs"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Gender
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input
                          id="gender-male"
                          className="peer/published"
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.gender === "Male"}
                        />
                        <label
                          htmlFor="gender-male"
                          className="peer-checked/published:text-sky-500 px-2"
                        >
                          Male
                        </label>
                      </div>
                      <div className="ml-2">
                        <input
                          id="gender-female"
                          className="peer/published px-2"
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.gender === "Female"}
                        />
                        <label
                          htmlFor="gender-female"
                          className="peer-checked/published:text-sky-500 px-2"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.gender}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
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
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasLaptop: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.haveLaptop === true}
                          required
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          Yes
                        </label>
                      </div>
                      <div className="mr-2">
                        <input
                          id="hasLaptop"
                          className="peer/published"
                          type="radio"
                          name="hasLaptop"
                          value="false"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasLaptop: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.haveLaptop === false}
                          required
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block w-96 px-2 pt-3 pb-4 mr-2 ml-2">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Phone number
                    </label>
                    <input
                      className="dark:bg-dark-tertiary shadow we appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="number"
                      name="phone"
                      defaultValue={traineeData.phone}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        });
                      }}
                      placeholder="enter telephone number"
                    />
                    {errors.phone && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Address
                    </label>
                    <input
                      className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      type="text"
                      defaultValue={traineeData.Address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                      placeholder="enter address"
                    />
                    {errors.address && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.address}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Education Level
                    </label>
                    <SelectField
                      name="level_education"
                      defaultValue={traineeData.education_level}
                      options={options?.educationOptions?.map(
                        (option: any) => ({
                          value: option,
                          label: option,
                        })
                      )}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level_education: e.target.value,
                        })
                      }
                    />
                    {errors.level_education && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.level_education}
                      </div>
                    )}
                  </div>


                  <div className="mb-4">
                    <div className="lg:flex sm:block">
                      <div className="mr-2">
                        <label className="block text-sm font-bold mb-2">
                          English score
                        </label>
                        <input
                          className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          name="englishScore"
                          id="englishScore"
                          defaultValue={traineeData.english_score}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              englishScore: e.target.value,
                            })
                          }
                          placeholder="English score"
                        />
                        {errors.Escores && (
                          <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                            {errors.Escores}
                          </div>
                        )}
                      </div>
                      <div className="mr-2">
                        <label className="block text-sm font-bold mb-2">
                          Hackerranck score
                        </label>
                        <input
                          className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          name="hackerrankScore"
                          id="hackerrankScore"
                          defaultValue={traineeData.Hackerrank_score}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hackerrankScore: e.target.value,
                            })
                          }
                          placeholder="Score"
                        />
                        {errors.Hscores && (
                          <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                            {errors.Hscores}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Interview decision
                    </label>
                    <SelectField
                      defaultValue={traineeData.interview_decision}
                      options={options?.interviewOptions?.map(
                        (option: any) => ({
                          value: option,
                          label: option,
                        })
                      )}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          interview_decision: e.target.value,
                        })
                      }
                    />
                    {errors.interview_decision && (
                      <div className="text-red-500 text-sm mt-1 mb-1 font-bold">
                        {errors.interview_decision}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Application cycle
                    </label>
                    <SelectField
                      defaultValue={traineeData?.trainee_id?.cycle_id?.id}
                      options={cycles?.map((cycle: any) => ({
                        value: cycle.id,
                        label: cycle.name,
                      }))}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cycle: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Is employed?
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input
                          id="isEmployed"
                          className="peer/published"
                          type="radio"
                          name="isEmployed"
                          value="true"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isEmployed: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.isEmployed === true}
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          Yes
                        </label>
                      </div>
                      <div className="mr-2">
                        <input
                          id="isEmployed"
                          className="peer/published"
                          type="radio"
                          name="isEmployed"
                          value="false"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isEmployed: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.isEmployed === false}
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                      Is student?
                    </label>
                    <div className="flex">
                      <div className="mr-2">
                        <input
                          id="student"
                          className="peer/published"
                          type="radio"
                          name="isStudent"
                          value="true"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isStudent: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.isStudent === true}
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          Yes
                        </label>
                      </div>
                      <div className="mr-2">
                        <input
                          id="student"
                          className="peer/published"
                          type="radio"
                          name="isStudent"
                          value="false"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isStudent: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.isStudent === false}
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex px-2 py-1 pb-3 w-fit">
                <button className="dark:bg-[#56C870] flex bg-gray-600 mx-2 rounded-md py-2 px-4 text-white font-medium cursor-pointer">
                  Update
                </button>
                <Link
                  to="/Trainee-applicants"
                  className="dark:bg-[#56C870] flex bg-gray-600 rounded-md py-2 mx-2 px-4 text-white font-medium cursor-pointer"
                >
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

const mapState = (allCycles: any) => ({
  cycles: allCycles,
});

export default connect(mapState, {
  getAllCycles,
})(TraineeUpdate);