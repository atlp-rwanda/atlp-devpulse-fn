import React, { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "../../components/sidebar/navHeader";
import { fetchApplications } from "../../redux/actions/adminListApplications";
import {
    DOTS,
    useCustomPagination,
  } from "../../components/Pagination/useCustomPagination";

const ListApplications = (props) => {
  const [moredrop, setmoredrop] = useState("");

  useEffect(() => {
    // Dispatch the action to fetch applications when the component mounts
    props.fetchApplications();
  }, []); 

  return (
    <>
      <div className="flex flex-col h-screen absolute w-full">
        <div className="flex flex-row">
          <div className="w-full">
            <div>
              <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen overflow-y-hidden overflow-x-hidden lg:ml-[3rem]">
                <div className="flex items-left px-7 lg:px-64 pt-24">
                  <div className="flex px-5 py-2 pb-8 w-fit">
                    <Link to="/filter-applications">
                      <button className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer">
                        Search
                      </button>
                    </Link>
                    <div></div>
                  </div>
                </div>
                <div className="px-3 md:px-8">
                  <div className="bg-white dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-full mx-auto lg:w-[80%] lg:ml-60 mb-10">
                    <div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll">
                          <div>
                            <table className="min-w-full leading-normal">
                              <thead className="w-full px-32 sticky top-0">
                                <tr>
                                  <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    First Name
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Last Name
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Email
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Telephone
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Availability for Interview
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Gender
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Resume
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Comments
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Address
                                  </th>
                                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-5 py-3 border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Submission Date
                                  </th>
                                  <th className="px-5 py-3 border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="overflow-y-auto">
                                {props.applications && props.applications.map((item) => (
                                  item?.delete_at === false ? (
                                    <tr key={item._id}>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.firstName}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.lastName}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.email}
                                           </div>
                                           </td>

                                     
                                        <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.telephone}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.availability_for_interview}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.gender}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.resume}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.comments}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.address}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.status}
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                        <div className="text-gray-900 dark:text-white whitespace-no-wrap">
                                          {item.submissionDate}
                                        </div>
                                      </td>
                                      <td>
                                        <div>
                                          <HiDotsVertical
                                            className="text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer"
                                            onClick={() => setmoredrop(item._id)}
                                          />
                                          <div
                                            className={`${
                                              moredrop === item._id ? "block" : "hidden"
                                            } absolute bg-white dark:bg-dark-tertiary dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                            id="dropdown"
                                          >
                                            <ul className="py-1" aria-labelledby="dropdown">
                                              <li>
                                                <Link
                                                  to={`/application/${item._id}/edit`}
                                                  className="text-sm hover:bg-gray-100 text-gray-700 dark:hover-bg-gray-500 dark:text-white block px-4 py-2"
                                                >
                                                  Edit
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to={`/application-details/${item._id}`}
                                                  className="text-sm hover-bg-gray-100 text-gray-700 dark:text-white dark:hover-bg-gray-500 block px-4 py-2"
                                                >
                                                  View
                                                </Link>
                                              </li>
                                              <li>
                                                <div
                                                  className="text-sm hover-bg-gray-100 text-gray-700 dark:text-white block px-4 py-2"
                                                >
                                                  Soft Delete
                                                </div>
                                              </li>
                                              <li>
                                                <div
                                                  className="text-sm hover-bg-gray-100 text-gray-700 dark:text-white block px-4 py-2"
                                                >
                                                  Hard Delete
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : null
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
      <NavBar />
    </>
  );
};

// Map the Redux state to the component's props
const mapStateToProps = (state) => ({
  applications: state.applications,
});

// Map the fetchApplications action to the component's props
const mapDispatchToProps = {
  fetchApplications,
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ListApplications);
