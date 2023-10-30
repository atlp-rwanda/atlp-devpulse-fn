import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/sidebar/navHeader";
import Candidate from "../../dummyData/Candidate.json";

const Application = (props: any) => {
  const [isDrop, setDrop] = useState<String | Number>("");

  const onSubmitHandler = (appId: any) => {
    if (!isDrop) setDrop(appId);
    if (isDrop) setDrop("");
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="flex flex-col  h-screen absolute w-[100%]">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg  min-h-screen overflow-y-hidden overflow-x-hidden lg:ml-[3rem]">
                <div className="px-3 md:px-8">
                  <div className="bg-white dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10 mt-10">
                    <div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll">
                          <div>
                            <table className="min-w-full leading-normal">
                              <thead className=" w-full px-32 sticky top-0">
                                <tr>
                                  <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    {"firstname"}
                                  </th>

                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                    {"lastname"}
                                  </th>

                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    {"email"}
                                  </th>
                                  {
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                      {"cycle"}
                                    </th>
                                  }
                                  <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    {"action"}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="overflow-y-auto">
                                {Candidate.map((item, index) => (
                                  <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex">
                                        <div className="">
                                          <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                            {item.firstname}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 text-center dark:text-white whitespace-no-wrap">
                                            {item.lastname}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                            {item.email}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                      <div className="flex items-center">
                                        <div className="">
                                          <p className="text-gray-900 items-center dark:text-white whitespace-no-wrap">
                                            {item.status}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td>
                                      <div>
                                        <HiDotsVertical
                                          onClick={(e) => {
                                            e.preventDefault();
                                            onSubmitHandler(item.id);
                                          }}
                                          className=" text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                        />

                                        <div
                                          className={`${
                                            isDrop === item.id
                                              ? "block"
                                              : "hidden"
                                          } absolute  bg-white dark:bg-dark-tertiary  dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                          id="dropdown"
                                        >
                                          <ul
                                            className="py-1"
                                            aria-labelledby="dropdown"
                                          >
                                            <li>
                                              <Link
                                                to={`/application-details/${item.id}/edit`}
                                                className="text-sm hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-500 dark:text-white  block px-4 py-2"
                                              >
                                                Edit
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                to={`/application-details/${item.id}`}
                                                className="text-sm hover:bg-gray-100 text-gray-700  dark:text-white   dark:hover:bg-gray-500 block px-4 py-2"
                                              >
                                                View
                                              </Link>
                                            </li>
                                            <li>
                                              <div className="text-sm hover:bg-gray-100 text-gray-700  dark:hover:bg-gray-500 dark:text-white  block px-4 py-2">
                                                Soft Delete
                                              </div>
                                            </li>
                                            <li>
                                              <div className="text-sm hover:bg-gray-100 text-gray-700   dark:hover:bg-gray-500 dark:text-white  block px-4 py-2">
                                                Hard Delete
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
