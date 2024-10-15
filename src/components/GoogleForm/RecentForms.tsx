import { useEffect, useState } from 'react';
import axios from '../../redux/actions/axiosconfig';
import * as icons from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  link: string;
  title: string;
  jobpost: string;
  description: string;
}

const RecentForms = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobposts, setjobposts] = useState<any>([]);
  const [error, setError] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchjobposts = async () => {
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
          setjobposts(response.data.data.getAllJobApplication);
        }
      } catch (error: any) {
        console.error('An error occurred:', error);
        setError(`Error fetching job posts: ${error}`);
      }
    };

    fetchjobposts();
  }, []);

  useEffect(() => {
    axios
      .post(`${process.env.BACKEND_URL}`, {
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
      })
      .then((response) => {
        const data = response.data?.data?.getAllApplications ?? [];
        setApplications(data);
        console.log(response);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
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

  const showDeleteConfirmation = (id: string) => {
    setApplicationToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteConfirmation = () => {
    setApplicationToDelete(null);
    setShowDeleteModal(false);
  };

  function findJobPostTitle(application: Application) {
    const jobpostObject = jobposts.find(
      (jobpost) => jobpost.id === application.jobpost
    );
    return jobpostObject ? jobpostObject.title : 'Loading...';
  }

  const reversedApplications = [...applications].reverse();

  return (
    <div>
      <div className='pl-4 md:pl-8'>
        <Link to={'/admin/create-form'}>
          <button className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer'>
            <icons.AiOutlinePlus className='mt-1 mr-1 font-bold' /> Create New
            Form
          </button>
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='container mx-auto max-w-5xl md:mx-auto py-6'>
          <h2 className='mb-4 py-4 text-3xl text-center font-semibold text-primary dark:text-secondary'>
            Saved Application Forms
          </h2>
          <div className='max-auto flex justify-center items-center content-center'>
            {!loading && (
              <ul className='mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 place-content-evenly'>
                {reversedApplications.map((application) => (
                  <li
                    key={application.link}
                    className='col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow'>
                    <div className='flex flex-1 flex-col p-8'>
                      <h3 className='mt-2 text-xl font-bold text-primary'>
                        {application.title}
                      </h3>
                      <dl className='mt-1 flex flex-grow flex-col justify-between'>
                        <dd className='text-sm text-gray-500'>
                          {application.description}
                        </dd>
                        <dd className='mt-3'>
                          <span className='rounded-full bg-green px-2 py-1 text-sm font-medium text-green-800'>
                            {findJobPostTitle(application)}
                          </span>
                        </dd>
                      </dl>
                    </div>
                    <div>
                      <div className='-mt-px flex divide-x divide-gray-200'>
                        <div className='-ml-px flex w-0 flex-1'>
                          <a
                            href={`${application.link}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-bold text-green hover:text-blue-800'>
                            <span className='ml-3'>View Form</span>
                          </a>
                        </div>
                        <div className='flex w-0 flex-1'>
                          <a
                            href={`/#/update-saved-form/${application.id}`}
                            className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500'>
                            <span className='ml-3'>Update</span>
                          </a>
                        </div>
                        <div className='-ml-px flex w-0 flex-1'>
                          <button
                            onClick={() =>
                              showDeleteConfirmation(application.id)
                            }
                            className='relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-bold text-red-600 hover:text-red-800'>
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
            <div>
              <div>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </div>
              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-start'>
                        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                          <icons.AiOutlineExclamation className='h-6 w-6 text-red-600' />
                        </div>
                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                          <div className='text-lg font-medium leading-6 text-gray-900'>
                            Delete the Form
                          </div>
                          <div className='mt-2'>
                            <p className='text-sm text-gray-500'>
                              Are you sure you want to delete this item? All of
                              the form data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button
                        type='button'
                        className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => handleDelete(applicationToDelete!)}>
                        Delete
                      </button>
                      <button
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={closeDeleteConfirmation}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentForms;
