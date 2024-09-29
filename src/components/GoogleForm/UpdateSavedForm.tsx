import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../redux/actions/axiosconfig';
import { showSuccessToast, showErrorToast } from './../../utils/toast';

const UpdateSavedForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    link: '',
    title: '',
    jobpost: '',
    description: '',
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jobposts, setJobPosts] = useState([]);

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
      } catch (error) {
        console.error('An error occurred:', error);
        setError(`Error fetching job posts: ${error}`);
      }
    };

    fetchJobPosts();
  }, []);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.post('/', {
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

        const data = response.data?.data?.getApplication;
        if (data) {
          setFormData(data);
        } else {
          setError('Application not found.');
        }
      } catch (error) {
        console.error('Error fetching application:', error);
        setError('Error fetching application.');
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const mutation = `
      mutation updateApplication($id: String!, $link: String!, $title: String!, $jobpost: String!, $description: String!) {
        updateApplication(id: $id, link: $link, title: $title, jobpost: $jobpost, description: $description) {
          id
          link
          title
          jobpost
          description
        }
      }
    `;

    try {
      const response = await axios.post('/', {
        query: mutation,
        variables: {
          id: String(formData.id),
          link: formData.link,
          title: formData.title,
          jobpost: formData.jobpost,
          description: formData.description,
        },
      });

      if (response.status === 200) {
        showSuccessToast('Application updated successfully!');
      } else {
        showErrorToast('Error updating application!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      showErrorToast('Error updating application!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg dark:bg-dark-tertiary w-[500px] mx-auto">
      <h2 className="mb-4 text-2xl font-semibold text-white">Update Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor='title' className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id='title'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleChange}
            className={`block w-full p-2 mt-1 border dark:text-white dark:bg-dark-tertiary ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor='description' className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className={`block w-full p-2 dark:text-white dark:bg-dark-tertiary mt-1 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor='link' className="block text-sm font-medium text-gray-700">Link</label>
          <input
            id='link'
            name='link'
            type='text'
            value={formData.link}
            onChange={handleChange}
            className={`block w-full dark:text-white dark:bg-dark-tertiary p-2 mt-1 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor='jobpost' className="block text-sm font-medium text-gray-700">Job Post</label>
          <select
            id='jobpost'
            name='jobpost'
            value={formData.jobpost}
            onChange={handleChange}
            className={`block w-full dark:text-white dark:bg-dark-tertiary p-2 mt-1 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          >
            <option value="">Select a job post</option>
            {jobposts.map((jobpost:any) => (
              <option key={jobpost.id} value={jobpost.id}>
                {jobpost.title}
              </option>
            ))}
          </select>
          {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
        <div className="flex justify-end">
          <Link to={'/view-forms'}>
            <button type='button' className='px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'>
              Cancel
            </button>
          </Link>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-[#56C870] rounded-md hover:bg-[#358247]'
            disabled={loading}
          >
            {loading ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSavedForm;
