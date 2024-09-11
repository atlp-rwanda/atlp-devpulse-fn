import { useState, useEffect } from 'react';
import * as icons from "react-icons/ai";
import { createGradingSystem } from '../redux/actions/gradeSystem';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllAssessment } from '../redux/actions/getAssessments';
import { useAppDispatch } from "../hooks/hooks";

interface Grade {
  attribute: string;
  scale: {
    lowerValue: {
      desc: string | null;
      value: number | string | null;
    },
    name: string | null;
    upperValue: {
      desc: string | null;
      value: number | string | null;
    }
  }
}


function GradingBox(props: any) {

  const [pending, setPending] = useState(false);
  const [newAttribute, setNewAttribute] = useState<number[]>([]);
  const [newAssessment, setNewAssessment] = useState<number[]>([]);
  const [rateType, setRateType] = useState<any>([])
  const [minRate, setMinRate] = useState<any>(0);
  const [maxRate, setMaxRate] = useState<any>(2);
  const [minRateA, setMinRateA] = useState<any>("A");
  const [maxRateA, setMaxRateA] = useState<any>("F");
  const [attb, setAttb] = useState("");
  const [scl, setScl] = useState("")
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [assessment, setAssessment] = useState<string[]>([]);
  const [assessmentM, setAssessmentM] = useState<string>("");
  const [grade, setGrade] = useState<Grade[]>([]);

  const dispatch = useAppDispatch();
  const { allAssessments } =
    props;

  useEffect(() => {
    dispatch(getAllAssessment());
  }, [])

  const addAttribute = () => {
    const newElement = newAttribute.length;
    setNewAttribute((current) => [...current, newElement])
  }

  const addAssessment = () => {
    const newElement = newAssessment.length;
    setNewAssessment((current) => [...current, newElement])
  }

  const removeAttribute = (elment, index) => {
    grade.splice(index, 1);
    setGrade(grade)
    const lastElement = elment - 1;
    if (newAttribute.length < lastElement) {

    }
    setNewAttribute((current) => current.filter((element) => element !== lastElement));
  }

  const removeAssessment = (elment, index) => {
    assessment.splice(index, 1);
    setNewAssessment((current) => current.filter((element) => element !== elment));
  }

  const changeAssess = (id, nAssessment) => {
    const exist = id < (assessment.length);

    if (exist) {

      const newAssess = assessment.map((element, index) => {
        if (index === id) {
          return nAssessment;
        } else {
          return element;
        }
      });
      setAssessment(newAssess);
    } else {
      setAssessment((current) => [nAssessment, ...current])
    }
  }

  const handleGrade = (id, field, value: string) => {

    const exist = id < (grade.length);

    if (exist) {

      const newGrade = grade.map((element, index) => {
        if (index === id) {
          if (field === "attribute") {
            const grde = { attribute: value, scale: element?.scale }
            return grde;

          } else if (field === "scale") {
            const grdeScl = {
              name: value,
              upperValue: element.scale.upperValue,
              lowerValue: element.scale.lowerValue
            };
            const grde = { attribute: element?.attribute, scale: grdeScl }
            return grde;

          } else if (field === "lowerV") {

            const grdeScl = {
              name: element.scale.name,
              lowerValue: {
                value,
                desc: element.scale.lowerValue.desc
              },
              upperValue: element.scale.upperValue
            };
            const grde = { attribute: element?.attribute, scale: grdeScl }

            return grde;

          } else if (field === "descrL") {

            const grdeScl = {
              name: element.scale.name,
              lowerValue: {
                value: element.scale.lowerValue.value,
                desc: value
              },
              upperValue: element.scale.upperValue
            };
            const grde = { attribute: element?.attribute, scale: grdeScl }

            return grde;


          } else if (field === "upperV") {

            const grdeScl = {
              name: element.scale.name,
              upperValue: {
                value,
                desc: element.scale.upperValue.desc
              },
              lowerValue: element.scale.lowerValue
            };
            const grde = { attribute: element?.attribute, scale: grdeScl }

            return grde;

          } else if (field === "descrU") {

            const grdeScl = {
              name: element.scale.name,
              upperValue: {
                value: element.scale.upperValue.value,
                desc: value
              },
              lowerValue: element.scale.lowerValue
            };
            const grde = { attribute: element?.attribute, scale: grdeScl }

            return grde;

          }

        } else {
          return element;
        }
      });
      setGrade(newGrade as Grade[]);
    } else {
      setGrade((current) => [...current, {
        attribute: value,
        scale: {
          lowerValue: {
            desc: null,
            value: null,
          },
          name: null,
          upperValue: {
            desc: null,
            value: null,
          }
        }
      },])
    }
  }

  const createSystem = async () => {
    setPending(true);
    if (title === "" || title === undefined || assessment.length === 0 || description === "" || description === undefined) {
      setPending(false);
      (title === "" || title === undefined) ?
        toast.error("Title field must not be empty!!") :
        (assessment.length === 0) ?
          toast.error("Assessment field must not be empty!!") :
          toast.error("Description field must not be empty!!");
      return;
    }
    const response = await createGradingSystem(title, assessment, description, grade);

    if (response?.data?.createGrading !== null && response?.data?.createGrading !== undefined && response?.data !== null) {
      setNewAssessment([]);
      setNewAttribute([]);
      setAssessmentM("");
      setTitle("");
      setDescription("");
      setAttb("");
      setScl("");
      setPending(false);
      toast.success("grade system created successfully")
    } else {
      (response?.errors !== undefined) ?
        toast.error(response?.errors[0].message) :
        toast.error("Something went wrong");

      setPending(false)
    }
  }

  return (
    <div>
      <div
        className={` flex  justify-center static left-0`}
      >
        <div className="bg-white dark:bg-dark-bg w-full lg:w-[50%] xl:w-5/12 rounded-lg p-1 xl:p-4 lg:p-4 pb-8 mb-20">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <div className="font-bold text-lg text-primary dark:text-white text-center w-11/12 ">
              Assessment Grading System Form
            </div>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <section className=" py-2 px-8">
              <div className="input my-2 mb-5 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name=""
                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-sm py-2 w-full pt-4"
                    placeholder={"Title"}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="input mt-4 mb-4 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <select
                    name=""
                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-sm py-2 w-full pt-4"
                    defaultValue=""
                    value={assessmentM}
                    onChange={(e) => {
                      setAssessmentM(e.target.value)
                      changeAssess(0, e.target.value)
                    }}
                  >
                    <option disabled hidden value="">{"---Choose Assessment---"}</option>
                    {
                      allAssessments?.data &&
                      (allAssessments?.data.map((element) => {
                        return (
                          <option value={element.id}>{element.title}</option>)
                      })
                      )}
                  </select>
                  {assessmentM &&
                    <div className='h-full w-[10%] pl-2 py-1 items-center'>
                      <input
                        type="button"
                        name=""
                        className={" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none text-center font-sans text-[10px] w-[100%]  h-[100%] cursor-pointer py-1 "}
                        value={"+"}
                        onClick={() => {
                          addAssessment();
                        }}
                      />
                    </div>}
                </div>
              </div>
              {
                (newAssessment.length > 0) &&
                newAssessment.map((element, index) => {
                  return (
                    <div className="input mt-4 mb-4 h-9 ">
                      <div className="grouped-input flex items-center h-full w-full rounded-md">
                        <select
                          name=""
                          className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-sm py-2 w-full pt-4"
                          defaultValue=""
                          onChange={(e) => {
                            changeAssess(element + 1, e.target.value)
                          }}
                        >
                          <option disabled hidden value="">{"---Choose Assessment---"}</option>
                          {
                            allAssessments?.data &&
                            (allAssessments?.data.map((element) => {
                              return (
                                <option value={element.id}>{element.title}</option>)
                            })
                            )}
                        </select>
                        <div className='h-full w-[10%] pl-2 py-1 items-center'>
                          <div
                            className=' flex justify-center dark:text-white  dark:bg-dark-tertiary border border-primary rounded outline-none items-center font-sans text-[10px]  w-[100%] py-2 cursor-pointer dark:hover:text-red-500 hover:text-red-500'
                            onClick={() => {
                              removeAssessment(element, index + 1);
                            }}>
                            <icons.AiOutlineDelete />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="input my-2 mb-4  ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <textarea
                    name=""
                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-sm py-2 w-full pt-4 h-24"
                    placeholder={"Description"}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="input mt-4 mb-5 ">
                <div className="grouped-input flex h-full w-full space-x-1 rounded-md">
                  <div className='grid grid-cols-2 gap-1 w-[90%]'>
                    <input
                      type="text"
                      name=""
                      className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-sm py-1"
                      placeholder={"Attribute"}
                      value={attb}
                      onChange={(e) => {
                        setAttb(e.target.value);
                        handleGrade(0, "attribute", e.target.value);
                      }}
                    />
                    <select
                      name=""
                      className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-2 font-sans text-sm text-center py-2  "
                      defaultValue=""
                      value={scl}
                      onChange={(e) => {
                        setScl(e.target.value)
                        const index = (rateType.find((element) => element.attribute === "main")) ?
                          (setRateType((current) => current.filter((element) => element.attribute !== "main"))) : null;

                        setRateType((current) => [...current, { type: e.target.value, attribute: "main" }]);
                        handleGrade(0, "scale", e.target.value)
                      }}
                    >
                      <option disabled hidden value="">{"--Choose scale--"}</option>
                      <option value="Linear Scale">Linear Scale</option>
                      <option value="Percentages">Percentages</option>
                      <option value="Letter Grades">Letter Grades</option>
                      <option value="Pass/Fail">Pass/Fail</option>
                    </select>
                    {rateType.map((element) => {
                      return (element.attribute === "main" &&
                        ((element.type === "Linear Scale" || element.type === "Letter Grades") ?

                          (element.type === "Linear Scale") ?
                            <div className=''>
                              <div className=' flex w-full space-x-2 mt-2'>
                                <input
                                  type="number"
                                  name=""
                                  className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm w-1/4"
                                  placeholder={"0"}
                                  min="0"
                                  max={maxRate ? `${maxRate - 1}` : "9"}
                                  onChange={(e) => {
                                    setMinRate(e.target.value)
                                    handleGrade(0, "lowerV", e.target.value)
                                  }}
                                />
                                <p className=' dark:text-white'>to</p>
                                <input
                                  type="number"
                                  name=""
                                  className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm  w-1/4"
                                  placeholder={"2"}
                                  min={`${minRate}`}
                                  max="10"
                                  onChange={(e) => {
                                    setMaxRate(e.target.value)
                                    handleGrade(0, "upperV", e.target.value)
                                  }}
                                />
                              </div>
                              <div className='py-5 dark:text-white'>
                                <div className='flex mb-2 space-x-3'>
                                  <p className=''>{minRate}</p>
                                  <input
                                    type="text"
                                    placeholder='description'
                                    className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full "
                                    onChange={(e) => {
                                      handleGrade(0, "descrL", e.target.value)
                                    }}
                                  />
                                </div>
                                <div className='flex mb-2 space-x-3'>
                                  <p className=''>{maxRate}</p>
                                  <input
                                    type="text"
                                    placeholder='description'
                                    className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full"
                                    onChange={(e) => {
                                      handleGrade(0, "descrU", e.target.value)
                                    }}
                                  />
                                </div>
                              </div>

                            </div>

                            : (element.type === "Letter Grades") ?

                              <div>
                                <div className=' flex w-full space-x-1 mt-2'>
                                  <input
                                    type="text"
                                    name=""
                                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm w-1/4"
                                    placeholder={"A"}
                                    onChange={(e) => {
                                      setMinRateA(e.target.value)
                                      handleGrade(0, "lowerV", e.target.value)
                                    }}
                                  />
                                  <p className=' dark:text-white'>to</p>
                                  <input
                                    type="text"
                                    name=""
                                    className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm  w-1/4"
                                    placeholder={"F"}
                                    onChange={(e) => {
                                      setMaxRateA(e.target.value)
                                      handleGrade(0, "upperV", e.target.value)
                                    }}
                                  />
                                </div>

                                <div className='py-5 dark:text-white'>
                                  <div className='flex mb-2 space-x-3'>
                                    <p className=''>{minRateA}</p>
                                    <input
                                      type="text"
                                      placeholder='description'
                                      className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full "
                                      onChange={(e) => {
                                        handleGrade(0, "descrL", e.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className='flex mb-2 space-x-3'>
                                    <p className=''>{maxRateA}</p>
                                    <input
                                      type="text"
                                      placeholder='description'
                                      className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full"
                                      onChange={(e) => {
                                        handleGrade(0, "descrU", e.target.value)
                                      }}
                                    />
                                  </div>
                                </div>

                              </div> : "" : ""))
                    })
                    }
                  </div>
                  {attb &&
                    <div className='h-full w-[10%] pl-2 py-2 items-center'>
                      <input
                        type="button"
                        name=""
                        className={" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none text-center font-sans text-[10px] w-[100%]  h-[100%] cursor-pointer py-1 "}
                        value={"+"}
                        onClick={() => {
                          addAttribute();
                        }}
                      />
                    </div>}
                </div>
              </div>
              {
                (newAttribute.length > 0) &&
                newAttribute.map((element, index) => {
                  return (
                    <div className="input mt-4 mb-5 " key={element}>
                      <div className="grouped-input flex h-full w-full space-x-1 rounded-md">
                        <div className='grid grid-cols-2 gap-1 w-[90%]'>
                          <input
                            type="text"
                            name=""
                            className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-5 font-sans text-sm py-1"
                            placeholder={"Attribute"}

                            onChange={(e) => {
                              handleGrade(element + 1, "attribute", e.target.value)
                            }}
                          />
                          <select
                            name=""
                            className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none px-2 font-sans text-sm text-center py-2 "
                            defaultValue="1"
                            onChange={(e) => {
                              const index = (rateType.find((data) => data.attribute === element)) ?
                                setRateType((current) => current.filter((data) => data.attribute !== element)) : null;
                              setRateType((current) => [...current, { type: e.target.value, attribute: element }])
                              handleGrade(element + 1, "scale", e.target.value)
                            }}
                          >
                            <option disabled hidden value="1">{"--Choose scale--"}</option>
                            <option value="Linear Scale">Linear Scale</option>
                            <option value="Percentages">Percentages</option>
                            <option value="Letter Grades">Letter Grades</option>
                            <option value="Pass/Fail">Pass/Fail</option>
                          </select>
                          {rateType.map((item) => {
                            return (item.attribute === element &&
                              (
                                (item.type === "Linear Scale" || item.type === "Letter Grades") ?
                                  (item.type === "Linear Scale") ?
                                    <div>
                                      <div className=' flex w-full space-x-2 mt-2'>
                                        <input
                                          type="number"
                                          name=""
                                          className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm w-1/4"
                                          placeholder={"0"}
                                          min="0"
                                          max={maxRate ? `${maxRate - 1}` : "9"}
                                          onChange={(e) => {
                                            setMinRate(e.target.value)
                                            handleGrade(element + 1, "lowerV", e.target.value)
                                          }}
                                        />
                                        <p className=' dark:text-white'>to</p>
                                        <input
                                          type="number"
                                          name=""
                                          className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm  w-1/4"
                                          placeholder={"2"}
                                          min={`${(minRate)}`}
                                          max="10"
                                          onChange={(e) => {
                                            setMaxRate(e.target.value)
                                            handleGrade(element + 1, "upperV", e.target.value)
                                          }}
                                        />
                                      </div>

                                      <div className='py-5 dark:text-white'>
                                        <div className='flex mb-2 space-x-3'>
                                          <p className=''>{minRate}</p>
                                          <input
                                            type="text"
                                            placeholder='description'
                                            className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full "
                                            onChange={(e) => {
                                              handleGrade(element + 1, "descrL", e.target.value)
                                            }
                                            }
                                          />
                                        </div>
                                        <div className='flex mb-2 space-x-3'>
                                          <p className=''>{maxRate}</p>
                                          <input
                                            type="text"
                                            placeholder='description'
                                            className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full"
                                            onChange={(e) => {
                                              handleGrade(element + 1, "descrU", e.target.value)
                                            }
                                            }
                                          />
                                        </div>
                                      </div>

                                    </div> : (item.type === "Letter Grades") ?

                                      <div>
                                        <div className=' flex w-full space-x-2 mt-2'>
                                          <input
                                            type="text"
                                            name=""
                                            className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm w-1/4"
                                            placeholder={"A"}
                                            onChange={(e) => {
                                              setMinRateA(e.target.value)
                                              handleGrade(element + 1, "lowerV", e.target.value)
                                            }}
                                          />
                                          <p className=' dark:text-white'>to</p>
                                          <input
                                            type="text"
                                            name=""
                                            className=" dark:text-white dark:bg-dark-tertiary border border-primary rounded outline-none pl-2 font-sans text-sm  w-1/4"
                                            placeholder={"F"}
                                            onChange={(e) => {
                                              setMaxRateA(e.target.value)
                                              handleGrade(element + 1, "upperV", e.target.value)
                                            }}
                                          />
                                        </div>

                                        <div className='py-5 dark:text-white'>
                                          <div className='flex mb-2 space-x-3'>
                                            <p className=''>{minRateA}</p>
                                            <input
                                              type="text"
                                              placeholder='description'
                                              className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full "
                                              onChange={(e) => {
                                                handleGrade(element + 1, "descrL", e.target.value)
                                              }
                                              }
                                            />
                                          </div>
                                          <div className='flex mb-2 space-x-3'>
                                            <p className=''>{maxRateA}</p>
                                            <input
                                              type="text"
                                              placeholder='description'
                                              className=" dark:text-white dark:bg-dark-bg border-b border-primary outline-none px-2 font-sans text-sm  w-full"
                                              onChange={(e) => {
                                                handleGrade(element + 1, "descrU", e.target.value)
                                              }
                                              }
                                            />
                                          </div>
                                        </div>

                                      </div> : "" : ""))
                          })
                          }
                        </div>
                        <div className='h-full w-[10%] pl-2 py-2 items-center'>
                          <div
                            className=' flex justify-center dark:text-white  dark:bg-dark-tertiary border border-primary rounded outline-none items-center font-sans text-[10px]  w-[100%] py-2 cursor-pointer dark:hover:text-red-500 hover:text-red-500'
                            onClick={() => {
                              removeAttribute(element + 1, index + 1);
                            }}>
                            <icons.AiOutlineDelete />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })

              }
              <div>

              </div>
              {pending ?
                <button
                  className=" bg-primary text-sm dark:bg-[#56C870] rounded-md py-2 text-white font-medium cursor-pointer m-auto w-full text-center"
                  disabled
                >
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#56C870"
                    />
                  </svg>
                </button>
                : <button
                  className=" bg-primary text-sm dark:bg-[#56C870] rounded-md py-2 text-white font-medium cursor-pointer m-auto w-full text-center"
                  onClick={() => createSystem()}
                >
                  Save
                </button>}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default GradingBox

const mapState = (state: any) => ({
  allAssessments: state.assessments
});

export default connect(mapState, {
  getAllAssessment
})(GradingBox)