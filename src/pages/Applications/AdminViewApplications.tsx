import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/sidebar/navHeader';
import { fetchApplications } from '../../redux/actions/adminListApplications';
import { HiDotsVertical } from 'react-icons/hi';
import { Pagination } from 'flowbite-react';
import Select from "react-select";
import { useTheme } from "../../hooks/darkmode";
import * as icons from "react-icons/ai";
const ListApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications]: any = useState();
  const { theme, setTheme } = useTheme();

  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);

  const [isDrop, setDrop] = useState<String | Number>("");

  const onSubmitHandler = (appId: any) => {
    if (!isDrop) setDrop(appId);
    if (isDrop) setDrop("");
  };

  useEffect(() => {
    const applicationsData = async () => {
      const { data, error } = await fetchApplications();
      console.log(error);
      // if(error){
      //   setTimeout(() => {
      //     navigate('/login');
      //   }, 5000);
      //   return;
      // }
      const slicedData = data?.data?.applications.slice(
        (activePage - 1) * itemsCountPerPage,
        activePage * itemsCountPerPage
      );
      setApplications(slicedData);
    };
    applicationsData();
  }, [activePage, itemsCountPerPage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleItemsCountPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsCountPerPage(Number(event.target.value));
  };
  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        text: "light-gray",
        primary25: "#E5E7EB",
        primary: "#d6dfdf",
        neutral0: "white",
      },
    };
  };

  const darkTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        primary25: "#404657",
        primary: "#d6dfdf",
        neutral0: "#293647",
      },
    };
  };
  const totalApplications = applications?.length;

  return (
    <>
      <div className='flex flex-col h-screen w-full'>
        <div className='flex flex-row'>
          <div className='w-full'>
            <div>
              <div className='bg-light-bg dark:bg-dark-frame-bg min-h-screen overflow-y-hidden overflow-x-hidden'>
              <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Select
                      className="sm:text-sm w-full sm:w-40 rounded-bt-rd dark:text-ltb"
                      options={[
                        { value: "", label: "Select by" },
                      ]}
                      defaultValue={{ value: "", label: "Select by" }}
                      theme={theme ? customTheme : darkTheme}
                    />
                    <div className="w-full sm:w-auto flex-grow">
                      <div className="relative">
                        <input
                          className="w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#56C870] text-sm"
                          placeholder="Search"
                          type="text"
                          name="search"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-8'>
                  <div className='bg-white dark:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-full'>
                    <div>
                      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block w-full h-[55vh] lg:min-w-full shadow rounded-lg overflow-y-scroll'>
                          <div>
                            <table className='min-w-full leading-normal'>
                              <thead className='w-full px-32 sticky top-0'>
                                <tr>
                                  <th className='p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
                                    First Name
                                  </th>
                                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
                                    Last Name
                                  </th>
                                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
                                    Email
                                  </th>

                                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
                                    Gender
                                  </th>

                                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
                                    Status
                                  </th>

                                  <th className='px-5 py-3 border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider'>
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className='overflow-y-auto'>
                                {applications &&
                                  applications.map((item) => (
                                    <tr
                                      key={item._id}
                                      className='hover:bg-slate-300 transition-colors dark:hover:bg-slate-700'>
                                      <td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary  text-sm'>
                                        <div className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                          {item.firstName}
                                        </div>
                                      </td>
                                      <td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
                                        <div className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                          {item.lastName}
                                        </div>
                                      </td>
                                      <td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
                                        <div className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                          {item.email}
                                        </div>
                                      </td>

                                      <td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
                                        <div className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                          {item.gender}
                                        </div>
                                      </td>

                                      <td className='px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm'>
                                        <div className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                          {item.status}
                                        </div>
                                      </td>

                                      <td>
                                        <div>
                                          <HiDotsVertical
                                            className='text-black dark:text-white text-3xl ml-6 font-size-6 cursor-pointer'
                                            onClick={(e: any) => {
                                              e.preventDefault();
                                              onSubmitHandler(item._id);
                                            }}
                                          />
                                          <div
                                            className={`${
                                             isDrop === item._id
                                                ? 'block'
                                                : 'hidden'
                                            } absolute bg-white dark:bg-dark-tertiary dark:text-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4`}
                                            id='dropdown'>
                                            <ul
                                              className='py-1'
                                              aria-labelledby='dropdown'>
                                              <li>
                                                <Link
                                                  to={`/application/${item._id}/edit`}
                                                  className='text-sm hover:bg-gray-100 text-gray-700 dark:hover-bg-gray-500 dark:text-white block px-4 py-2'>
                                                  Edit
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  to={`/application-details/${item._id}`}
                                                  className='text-sm hover-bg-gray-100 text-gray-700 dark:text-white dark:hover-bg-gray-500 block px-4 py-2'>
                                                  View
                                                </Link>
                                              </li>
                                              <li>
                                                <div className='text-sm hover-bg-gray-100 text-gray-700 dark:text-white block px-4 py-2'>
                                                  Soft Delete
                                                </div>
                                              </li>
                                              <li>
                                                <div className='text-sm hover-bg-gray-100 text-gray-700 dark:text-white block px-4 py-2'>
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
                    <div className='flex items-center justify-between my-4'>
                      <div className='flex items-center space-x-2'>
                        <label className='dark:text-zinc-100 flex'>
                          Items per page:
                        </label>
                        <select
                          className='border border-gray-300 rounded-md p-1'
                          value={itemsCountPerPage}
                          onChange={handleItemsCountPerPageChange}>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                      <span className='dark:text-zinc-100 '>
                        <div className='flex justify-center items-center flex-row flex-wrap'>
                          <Pagination
                            layout='navigation'
                            currentPage={activePage}
                            totalPages={totalApplications}
                            onPageChange={handlePageChange}
                            previousLabel='Prev'
                            nextLabel='Next'
                            showIcons
                          />
                        </div>
                      </span>
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

export default ListApplications;
