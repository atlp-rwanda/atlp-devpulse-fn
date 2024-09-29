import { useEffect, useState } from 'react';
import axios from '../../redux/actions/axiosconfig';
import * as icons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomModal from './customModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ViewApplicationModal from './ViewApplicationModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export interface Application {
  id: string;
  link: string;
  title: string;
  jobpost: string;
  description: string;
}

const RecentForms = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false)
  const [jobposts, setJobPosts] = useState<any>([]);
  const [error, setError] = useState('');
  const [viewApplicationModalIsOpen, setViewApplicationModalIsOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [viewedApplication, setViewedApplication] = useState<Application | null>(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      const graphqlQuery = `
        query GetAllJobApplication($input: pagination) {
          getAllJobApplication(input: $input) {
            id
            title
          }
        }
      `;

      try {
        const response = await axios.post('/', {
          query: graphqlQuery,
          variables: {
            input: {
              All: true,
              page: 1,
            },
          },
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        if (response.data.data && response.data.data.getAllJobApplication) {
          setJobPosts(response.data.data.getAllJobApplication);
        }
      } catch (error: any) {
        console.error('An error occurred:', error);
        setError(`Error fetching job posts: ${error}`);
      }
    };

    fetchJobPosts();
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.post(`${process.env.BACKEND_URL}`, {
          query: `
            query {
              getAllApplications {
                id
                link
                title
                jobpost
                description
              }
            }
          `,
        });
        const data = response.data?.data?.getAllApplications ?? [];
        setApplications(data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);


  const handleDelete= async (id: string) : Promise<void> => {
    try {
      await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
          mutation {
            deleteApplication(id: "${id}") {
              id
            }
          }
        `,
      });

      setApplications((prevApplications) =>
        prevApplications.filter((application) => application.id !== id)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const openViewApplicationModal = async (id: string) => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
          query GetApplication($id: ID!) {
            getApplication(id: $id) {
              id
              link
              title
              jobpost
              description
            }
          }
        `,
        variables: { id },
      });

      const applicationData = response.data?.data?.getApplication;
      setViewedApplication(applicationData);
      setViewApplicationModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching application:', error);
    }
  };

  const closeViewApplicationModal = () => {
    setViewedApplication(null);
    setViewApplicationModalIsOpen(false);
  };

  const showDeleteConfirmation = (id: string) => {
    setApplicationToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteConfirmation = () => {
    setApplicationToDelete(null);
    setShowDeleteModal(false);
  };

  function findJobPostTitle(application: Application) {
    const jobpostObject = jobposts.find((jobpost) => jobpost.id === application.jobpost);
    return jobpostObject ? jobpostObject.title : 'Loading...';
  }

  const reversedApplications = [...applications].reverse();

  return (
    <div>
      <div className='pl-4 md:pl-8'>
        <Link to={'/admin/create-form'}>
          <button className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer'>
            <icons.AiOutlinePlus className='mt-1 mr-1 font-bold' /> Create New Form
          </button>
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='container max-w-5xl py-6 mx-auto md:mx-auto'>
          <h2 className='py-4 mb-4 text-3xl font-semibold text-center text-primary dark:text-secondary'>
            Saved Application Forms
          </h2>
          <div className='flex items-center content-center justify-center max-auto'>
            {!loading && (
              <ul className='grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 place-content-evenly'>
                {reversedApplications.map((application) => (
                  <li
                    key={application.link}
                    className='flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow'>
                    <div className='flex flex-col flex-1 p-8'>
                      <h3 className='mt-2 text-xl font-bold text-primary'>
                        {application.title}
                      </h3>
                      <dl className='flex flex-col justify-between flex-grow mt-1'>
                        <dd className='text-sm text-gray-500'>
                          {application.description.length > 155
                            ? `${application.description.substring(0, 155)}...`
                            : application.description}
                        </dd>
                        <dd className='mt-3'>
                          <span className='px-2 py-1 text-sm font-medium text-green-800 rounded-full bg-green'>
                            {findJobPostTitle(application)}
                          </span>
                        </dd>
                      </dl>
                    </div>
                    <div>
                      <div className='flex -mt-px divide-x divide-gray-200'>
                        <div className='flex flex-1 w-0 -ml-px'>
                          <button
                            onClick={() => openViewApplicationModal(application.id)}
                            rel='noopener noreferrer'
                            className='relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-bold border border-transparent rounded-br-lg text-green hover:text-blue-800'>
                            <p className='ml-3'>View</p>
                          </button>
                        </div>
                        <div className='flex flex-1 w-0'>
                          <a
                            href={`/#/admin/update-saved-form/${application.id}`}
                            className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500'>
                            <span className='ml-3'>Update</span>
                          </a>
                        </div>
                        <div className='flex flex-1 w-0'>
                          <button
                            onClick={() =>
                              showDeleteConfirmation(application.id)
                            }
                            className='relative justify-center flex-1 w-0 py-4 text-sm font-bold text-red-600 border border-transparent rounded-br-lg inline-flexitems-center hover:text-red-800'>
                            <span className='ml-3'>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {showDeleteModal && (
            <DeleteConfirmationModal
              isOpen={showDeleteModal}
              onClose={closeDeleteConfirmation}
              onDelete={() => handleDelete(applicationToDelete!)}
            />
          )}
        </div>
      </div>
      <ViewApplicationModal
        isOpen={viewApplicationModalIsOpen}
        onClose={closeViewApplicationModal}
        application={viewedApplication}
        jobPostTitle={viewedApplication ? findJobPostTitle(viewedApplication) : ''}
      />
    </div>
  );
};

export default RecentForms;