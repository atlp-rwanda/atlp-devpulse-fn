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
import SelectField from '../../components/ReusableComponents/Select'

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
  const phoneRef = useRef<any>();
  const districtRef = useRef<any>();
  const provinceRef = useRef<any>();
  const sectorRef = useRef<any>();
  const cycleRef = useRef<any>();
  const eScoreRef = useRef<any>();
  const hScoreRef = useRef<any>();

  const getProvinces = () => {
    Object.keys(locations).forEach((province) => {
      provinces.push(province);
    });
  };

  const getDistricts = (provinceName: any) => {
    try {
      const data = locations[provinceName];
      districts.length = 0;
      Object.keys(data).forEach((district) => {
        districts.push(district);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSectors = (provinceName: any, districtName: any) => {
    try {
      const data = locations[provinceName][districtName];
      sectors.length = 0;
      Object.keys(data).forEach((sector) => {
        sectors.push(sector);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function handleGetTrainee() {
      await dispatch(getTraineeToUpdate(ID));
    }
    props.getAllCycles();
    handleGetTrainee();
    getProvinces();
  }, []);

  const initialValues =
    Object.keys(traineeData).length !== 0
      ? {
          firstname: traineeData && traineeData?.trainee_id?.firstName,
          lastname: traineeData && traineeData?.trainee_id?.lastName,
          gender: traineeData && traineeData?.gender,
          phone: traineeData && traineeData?.phone,
          address: traineeData && traineeData?.Address,
          birthDate: traineeData && traineeData?.birth_date,
          province: traineeData && traineeData?.province,
          district: traineeData && traineeData?.district,
          sector: traineeData && traineeData?.sector,
          field_of_study: traineeData && traineeData?.field_of_study,
          past_programs: traineeData && traineeData?.past_andela_programs,
          isStudent: traineeData && traineeData?.isStudent,
          hasLaptop: traineeData && traineeData?.haveLaptop,
          isEmployed: traineeData && traineeData?.isEmployed,
          level_education: traineeData && traineeData?.education_level,
          interview_decision: traineeData && traineeData?.interview_decision,
          cycle: traineeData && traineeData?.trainee_id?.cycle_id?.id,
          hackerrankScore: traineeData && traineeData?.Hackerrank_score,
          englishScore: traineeData && traineeData?.english_score,
        }
      : {};

  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const reg = new RegExp("^((072|078|073))[0-9]{7}$", "i");

    const province = provinceRef?.current.value;
    const district = districtRef?.current.value;
    const sector = sectorRef?.current.value;
    const cycle = cycleRef.current.value;
    const eScore = eScoreRef.current.value;
    const hScore = hScoreRef.current.value;
    await getDistricts(province);
    await getSectors(province, district);
    const districtExists = Object.values(districts).includes(district);
    const sectorExists = Object.values(sectors).includes(sector);

    console.log(districtRef);
    if (formData.firstname === "") {
      toast.error("Firstname is required");
    } else if (formData.lastname === "") {
      toast.error("Lastname is required");
    } else if (formData.phone === "") {
      toast.error("Phone number is required ");
    } else if (cycle === "") {
      toast.error("Please Select Cycle");
    } else if (formData.sector === "") {
      toast.error("Sector is required");
    } else if (formData.province === "") {
      toast.error("Province is required");
    } else if (formData.district === "") {
      toast.error("District is required ");
    } else if (formData.field_of_study === "") {
      toast.error("Field of study is required");
    } else if (formData.birthDate === "") {
      toast.error("Date of birth is required");
    } else if (!reg.test(phoneRef?.current?.value)) {
      toast.error("Invalid phone number");
    } else if (formData.address === "") {
      toast.error("Address is required");
    } else if (!districtExists) {
      toast.error(`Province ${province} have no district named ${district}`);
    } else if (!sectorExists) {
      toast.error(`District ${district} have no sector named ${sector}`);
    } else if (eScore > 100 || hScore > 100 || eScore < 0 || hScore < 0) {
      toast.error("Score must be between 0-100");
    } else {
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
    }
  };
  return (
    <>
      <NavBar />
      <div className="block bg-white dark:bg-dark-tertiary relative mt-10 w-[100%] py-3 min-h-[100vh]">
        <div className="block text-center text-sm font-bold text-gray-600 relative lg:left-[8rem] dark:text-white text-base lg:max-w-3xl sm:w-[100%] p-4 lg:px-4 m-4 mx-auto text-[24px]">
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
                    required
                  />
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
                    required
                  />
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
                      defaultValue={new Intl.DateTimeFormat("en-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(traineeData.birth_date)}
                      type="date"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          birthDate: e.target.value,
                        })
                      }
                      name="birthDate"
                      placeholder="enter date of birth"
                      required
                    />
                  </div>

                  <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Province</label>
                <SelectField
                  id="province"
                  name="province"
                  ref={provinceRef}
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
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">District</label>
                <SelectField
                  id="district"
                  name="district"
                  ref={districtRef}
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
              </div>


                  <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Sector</label>
                <SelectField
                  id="sector"
                  name="sector"
                  ref={sectorRef}
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
                      required
                    />
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
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
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
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
                          }
                          defaultChecked={traineeData.gender === "Male"}
                          required
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          Male
                        </label>
                      </div>
                      <div className="ml-2">
                        <input
                          id="gender"
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
                          required
                        />
                        <label className="peer-checked/published:text-sky-500 px-2">
                          Female
                        </label>
                      </div>
                    </div>
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
                      ref={phoneRef}
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
                      required
                    />
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
                      required
                    />
                  </div>

                   <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Education Level</label>
                <SelectField
                  name="level_education"
                  defaultValue={traineeData.education_level}
                  options={options?.educationOptions?.map((option: any) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level_education: e.target.value,
                    })
                  }
                />
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
                          ref={eScoreRef}
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
                      </div>
                      <div className="mr-2">
                        <label className="block text-sm font-bold mb-2">
                          Hackerranck score
                        </label>
                        <input
                          className="dark:bg-dark-tertiary shadow appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          ref={hScoreRef}
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
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Interview decision</label>
                <SelectField
                  defaultValue={traineeData.interview_decision}
                  options={options?.interviewOptions?.map((option: any) => ({
                    value: option,
                    label: option,
                  }))}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interview_decision: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Application cycle</label>
                <SelectField
                  ref={cycleRef}
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
