import { useEffect, useState } from 'react';
import axios from '../../redux/actions/axiosconfig';
import * as icons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomModal from './customModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
  const [updateLoading, setUpdateLoading] = useState(false)
  const [jobposts, setJobPosts] = useState<any>([]);
  const [error, setError] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

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
    const jobpostObject = jobposts.find((jobpost) => jobpost.id === application.jobpost);
    return jobpostObject ? jobpostObject.title : 'Loading...';
  }

  const reversedApplications = [...applications].reverse();

  const openModal = (application: Application) => {
    setSelectedApplication(application);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsOpen(false);
  };

  const handleUpdate = async (values: Application) => {
    try {
      setUpdateLoading(true);
      await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
          mutation {
            updateApplication(id: "${selectedApplication?.id}", link: "${values.link}", title: "${values.title}", jobpost: "${values.jobpost}", description: "${values.description}") {
              _id
            }
          }
        `,
      });

      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === selectedApplication?.id ? { ...app, ...values } : app
        )
      );

      closeModal();
      setUpdateLoading(false);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: selectedApplication ? selectedApplication.id : '',
      title: selectedApplication ? selectedApplication.title : '',
      jobpost: selectedApplication ? selectedApplication.jobpost : '',
      link: selectedApplication ? selectedApplication.link : '',
      description: selectedApplication ? selectedApplication.description : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      link: Yup.string().url('Must be a valid URL').required('Link is required'),
      jobpost: Yup.string().required('Job post is required'),
    }),
    onSubmit: handleUpdate,
  });

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
                          {application.description}
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
                            onClick={() => openModal(application)}
                            rel='noopener noreferrer'
                            className='relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-bold border border-transparent rounded-br-lg text-green hover:text-blue-800'>
                            <p className='ml-3'>View Form</p>
                          </button>
                        </div>
                        <div className='flex flex-1 w-0'>
                          <button
                            onClick={() => openModal(application)}
                            className='relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500'>
                            <span className='ml-3'>Update</span>
                          </button>
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
            <div>
              <div>
                <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
              </div>
              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
                  <div className='relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
                    <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-start'>
                        <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                          <icons.AiOutlineExclamation className='w-6 h-6 text-red-600' />
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
                    <div className='px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6'>
                      <button
                        type='button'
                        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => handleDelete(applicationToDelete!)}>
                        Delete
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
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
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Application Modal"
        className="fixed inset-0 z-50 flex items-center justify-center "
      >
        <div className="p-6 rounded-lg dark:bg-dark-tertiary w-[500px]">
          <h2 className="mb-4 text-2xl font-semibold text-white">Update Application Form</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor='title' className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id='title'
                name='title'
                type='text'
                value={formik.values.title}
                onChange={formik.handleChange}
                className={`block w-full p-2 mt-1 border dark:text-white dark:bg-dark-tertiary ${formik.errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              />
              {formik.errors.title && <div className="text-sm text-red-500">{formik.errors.title}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor='description' className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id='description'
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                className={`block w-full p-2 dark:text-white dark:bg-dark-tertiary mt-1 border ${formik.errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              />
              {formik.errors.description && <div className="text-sm text-red-500">{formik.errors.description}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor='link' className="block text-sm font-medium text-gray-700">Link</label>
              <input
                id='link'
                name='link'
                type='text'
                value={formik.values.link}
                onChange={formik.handleChange}
                className={`block w-full dark:text-white dark:bg-dark-tertiary p-2 mt-1 border ${formik.errors.link ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              />
              {formik.errors.link && <div className="text-sm text-red-500">{formik.errors.link}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor='jobpost' className="block text-sm font-medium text-gray-700">Job Post</label>
              <select
                id='jobpost'
                name='jobpost'
                value={formik.values.jobpost}
                onChange={formik.handleChange}
                className={`block w-full dark:text-white dark:bg-dark-tertiary p-2 mt-1 border ${formik.errors.jobpost ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              >
                {jobposts.map((jobpost: any) => (
                  <option key={jobpost.id} value={jobpost.id}>
                    {jobpost.title}
                  </option>
                ))}
              </select>
              {formik.errors.jobpost && <div className="text-sm text-red-500">{formik.errors.jobpost}</div>}
            </div>
            <div className="flex justify-end">
              <button
                type='button'
                onClick={closeModal}
                className='px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 text-white bg-[#56C870] rounded-md hover:bg-[#358247]'
              >
                {updateLoading ? "Submitting..." :"Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default RecentForms;
