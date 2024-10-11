import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/sidebar/navHeader';
import { fetchApplications } from '../../redux/actions/adminListApplications';
import { Pagination } from 'flowbite-react';
import { ApplicationsSkeleton } from '../../skeletons/applicationsSkeleton';
import ApplicationsTable from './ApplicationsTable';
const ListApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isDrop, setDrop] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchApplications();
        if (data?.data?.applications) {
          const slicedData = data?.data?.applications.slice(
            (activePage - 1) * itemsCountPerPage,
            activePage * itemsCountPerPage
          );
          setApplications(slicedData);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error('Error fetching applications', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    }
  }, [activePage, itemsCountPerPage]);

  const handlePageChange = (pageNumber) => setActivePage(pageNumber);

  const handleItemsCountPerPageChange = (event) => {
    setItemsCountPerPage(Number(event.target.value));
  };
  const onSubmitHandler = (appId) => setDrop(isDrop === appId ? "" : appId);

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='px-8'>
        {loading ? (
          <ApplicationsSkeleton />
        ) : (
          <div className='bg-light-bg dark:bg-dark-frame-bg min-h-screen overflow-y-hidden overflow-x-hidden'>
            <ApplicationsTable
              applications={applications}
              onSubmitHandler={onSubmitHandler}
              isDrop={isDrop}
            />
            <div className='flex items-center justify-between my-4'>
              <div className='flex items-center space-x-2'>
                <label className='text-gray-700 dark:text-white'>Items per page:</label>
                <select
                  className='border rounded px-2 py-1 dark:bg-dark-tertiary'
                  value={itemsCountPerPage}
                  onChange={handleItemsCountPerPageChange}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <Pagination
                layout='navigation'
                currentPage={activePage}
                totalPages={Math.ceil(applications?.length / itemsCountPerPage) || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
        </div>
      </div>
  );
};
export default ListApplications;

