import React, { useEffect, useState, useRef } from "react";
import {
  updateTraine,
  updateTraineeAttributes,
  getTraineeToUpdate,
} from "../../redux/actions/updateTrainee";
// import Select from 'react-select'
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { toast } from "react-hot-toast";
import NavBar from "../../components/sidebar/navHeader";
import { useParams } from "react-router";
import options from "./traineeInputs";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
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
  const [loader, setLoader] = useState(false);
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
    isStudent: false,
    hasLaptop: false,
    isEmployed: false,
    level_education: "",
    interview_decision: "",
    cycle: "",
    hackerrankScore: "",
    englishScore: "",
    gender: "",
  });
  const [errors, setErrors] = useState<any>({});

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
    async function handleGetTrainee() {
      await dispatch(getTraineeToUpdate(ID));
      props.getAllCycles();
    }
    handleGetTrainee();
    getProvinces();
  }, [dispatch, props.getAllCycles, ID]);

  useEffect(() => {
    let birthDate = "";
    const birthDateTimestamp = parseInt(traineeData.birth_date);

    if (!isNaN(birthDateTimestamp)) {
      birthDate = new Date(birthDateTimestamp).toISOString().split("T")[0];
    }

    setFormData({
      firstname: traineeData?.trainee_id?.firstName || "",
      lastname: traineeData?.trainee_id?.lastName || "",
      gender: traineeData?.gender || "",
      phone: traineeData?.phone || "",
      address: traineeData?.Address || "",
      birthDate: birthDate,
      province: traineeData?.province || "",
      district: traineeData?.district || "",
      sector: traineeData?.sector || "",
      field_of_study: traineeData?.field_of_study || "",
      past_programs: traineeData?.past_andela_programs || "",
      isStudent: traineeData?.isStudent || false,
      hasLaptop: traineeData?.haveLaptop || false,
      isEmployed: traineeData?.isEmployed || false,
      level_education: traineeData?.education_level || "",
      interview_decision: traineeData?.interview_decision || "",
      cycle: traineeData?.trainee_id?.cycle_id?.id || "",
      hackerrankScore: traineeData?.Hackerrank_score || "",
      englishScore: traineeData?.english_score || "",
    });
    setDistricts([traineeData.district]);
    setSectors([traineeData.sector]);
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
    setLoader(true);

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
        isStudent: formData.isStudent,
        haveLaptop: formData.hasLaptop,
        isEmployed: formData.isEmployed,
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
    } finally {
      setLoader(false);
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
                    value={formData.firstname}
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
                    value={formData.lastname}
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
                      value={formData.birthDate}
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
                      value={formData.province}
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
                      value={formData.district}
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
                      value={formData.sector}
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
                      value={formData.field_of_study}
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
                      value={formData.past_programs}
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
                          checked={formData.gender === "Male"}
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
                          checked={formData.gender === "Female"}
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
                              hasLaptop: true,
                            })
                          }
                          checked={formData.hasLaptop === true}
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
                              hasLaptop: false,
                            })
                          }
                          checked={formData.hasLaptop === false}
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
                      value={formData.phone}
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
                      value={formData.address}
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
                      value={formData.level_education}
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
                          value={formData.englishScore}
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
                          value={formData.hackerrankScore}
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
                      value={formData.interview_decision}
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
                      value={formData.cycle}
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
                              isEmployed: true,
                            })
                          }
                          checked={formData.isEmployed === true}
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
                              isEmployed: false,
                            })
                          }
                          checked={formData.isEmployed === false}
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
                              isStudent: true,
                            })
                          }
                          checked={formData.isStudent === true}
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
                              isStudent: false,
                            })
                          }
                          checked={formData.isStudent === false}
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
                <button
                  type="submit"
                  disabled={loader}
                  className={`dark:bg-[#56C870] flex bg-gray-600 mx-2 rounded-md py-2 px-4 text-white font-medium cursor-pointer ${
                    loader ? "opacity-50 cursor-not-allowed" : ""
                  } flex items-center`}
                >
                  {loader ? (
                    <ThreeDots height="20" width="20" color="#ffffff" />
                  ) : (
                    "Update"
                  )}
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