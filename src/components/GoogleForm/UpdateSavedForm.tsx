import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../redux/actions/axiosconfig';
import { showSuccessToast, showErrorToast } from './../../utils/toast';
import SelectField from '../ReusableComponents/Select';

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
  const [jobposts, setJobPosts] = useState<any>([]);
  const [selectedJobPost, setSelectedJobPost] = useState('');

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
    axios
      .post('/', {
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
      })
      .then((response) => {
        const data = response.data?.data?.getApplication;
        setFormData(data);
        setSelectedJobPost(data.jobpost);
      })
      .catch((error) => {
        console.error('Error fetching application:', error);
      });
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

  const handleJobPostChange = (e) => {
    setSelectedJobPost(e.target.value);
    handleChange(e);
  };

  return (
    <div>
      <div className='pl-4 md:pl-8'>
        <Link to={'/view-forms'}>
          <button className='flex bg-primary dark:bg-[#56C870] rounded-md py-2 mt-2 px-4 text-white font-medium cursor-pointer'>
            All Forms
          </button>
        </Link>
      </div>
      <div className='relative mx-auto max-w-xl'>
        <h2 className='text-3xl font-semibold'>Update Application Form</h2>
        <div className='mt-12'>
          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
            <div className='sm:col-span-2'>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-primary dark:text-secondary'>
                Form Title
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  autoComplete='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='block w-full text-primary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                className='block pb-8 font-medium text-primary dark:text-secondary'
                htmlFor='jobpost'>
                Select Job Post
              </label>
              <div className='relative mt-1 rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 flex items-center'>
                  <SelectField 
                  id="jobpost"
                  name='jobpost'
                  value={selectedJobPost}
                  onChange={handleJobPostChange}
                  className='block w-full text-primary rounded-md border-gray-300 py-3 px-4 pl-20 focus:border-indigo-500 focus:ring-indigo-500'
                  options={jobposts.map((jobpost)=> ({
                    value: jobpost.id,
                    label: jobpost.title
                  }))}
                  />
                </div>
              </div>
            </div>
            <div className='sm:col-span-2 pt-4'>
              <label
                htmlFor='link'
                className='block text-sm font-medium text-primary dark:text-secondary'>
                Google Form Link
              </label>
              <div className='mt-1'>
                <input
                  id='link'
                  name='link'
                  type='text'
                  autoComplete='link'
                  value={formData.link}
                  onChange={handleChange}
                  className='block w-full text-primary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-primary dark:text-secondary'>
                Description
              </label>
              <div className='mt-1'>
                <textarea
                  id='description'
                  name='description'
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className='block w-full text-primary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                />
              </div>
            </div>
            <div className='sm:col-span-2'>
              <button
                type='submit'
                className='inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary dark:bg-[#56C870] px-6 py-3 text-base font-medium text-secondary dark:text-primary shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                disabled={loading}>
                {loading ? 'Updating...' : 'Update Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSavedForm;
