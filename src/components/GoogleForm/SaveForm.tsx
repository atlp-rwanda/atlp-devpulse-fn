import { useEffect, useState } from 'react';
import axios from '../../redux/actions/axiosconfig';
import { showSuccessToast, showErrorToast } from './../../utils/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectField from "../ReusableComponents/Select"

const validationSchema = Yup.object().shape({
  link: Yup.string().required('Please enter a Google Form link'),
  title: Yup.string().required('Please enter a form title'),
  jobpost: Yup.string().required('Please select a job post'),
  description: Yup.string().required('Please enter a description'),
});

function SaveFormDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [jobposts, setjobposts] = useState<any>([]);

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
      } catch (err: any) {
        console.error('An error occurred:', err);
        setError(`Error fetching job posts: ${err.message}`);
      }
    };

    fetchjobposts();
  }, []);

  const formik = useFormik({
    initialValues: {
      link: '',
      title: '',
      jobpost: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const graphqlQuery = `
      mutation CreateApplication($link: String!, $title: String!, $jobpost: String!, $description: String!) {
        createApplication(link: $link, title: $title, jobpost: $jobpost, description: $description) {
          id
          link
          title
          jobpost
          description
        }
      }
      `;

      const variables = {
        link: values.link,
        title: values.title,
        jobpost: values.jobpost,
        description: values.description,
      };

      try {
        const response = await axios.post('/', {
          query: graphqlQuery,
          variables,
        });

        if (response.data.errors && response.data.errors.length > 0) {
          const errorMessage = response.data.errors[0].error;
          if (errorMessage.toLowerCase().includes("a record with link")) {
            showErrorToast('The link is already in use');
          } else {
            console.log(errorMessage);
          }
        } else if (response.data.data && response.data.data.createApplication) {
          setSuccess(true);
          showSuccessToast('Application created successfully!');
          formik.resetForm();
          window.location.href = '/#/admin/view-forms';
        } else {
          setError('An error occurred while submitting the form.');
        }
      } catch (err: any) {
        console.error('An error occurred:', err);
        setError('An error occurred while submitting the form.');
        showErrorToast(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='overflow-auto'>
      <div className='relative max-w-xl mx-auto'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold tracking-tight text-primary dark:text-secondary sm:text-4xl'>
            Save Application Form
          </h2>

          <p className='mt-4 text-lg leading-6 text-primary dark:text-secondary'>
            Copy Google Form URL and paste it in the input field below.
          </p>
        </div>

        <div className='mt-10'>
          <form
            className='grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8'
            onSubmit={formik.handleSubmit}>

            <div className='sm:col-span-1'>
              <label
                className='block text-sm font-medium text-primary dark:text-secondary'
                htmlFor='title'>
                Form Title
              </label>

              <div className='mt-1'>
                <input
                  autoComplete='title'
                  className={`block w-full dark:text-white dark:bg-dark-tertiary rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${formik.touched.title && formik.errors.title
                    ? 'border-red-500'
                    : ''
                    }`}
                  id='title'
                  name='title'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type='text'
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className='text-red-500'>{formik.errors.title}</div>
                )}
              </div>
            </div>

            <div className='sm:col-span-1'>
              <label
                className='block pb-1 text-sm font-medium text-primary dark:text-secondary'
                htmlFor='jobpost'>
                Select Job Post
              </label>

              <div className='relative rounded-md shadow-sm'>
                <SelectField
                  className={`${formik.touched.jobpost && formik.errors.jobpost ? 'border-red-500' : ''}`}
                  id='jobpost'
                  name='jobpost'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.jobpost}
                  options={[
                    { value: '', label: 'Select job title' },
                    ...jobposts.map((jobpost: any) => ({
                      value: jobpost.id,
                      label: jobpost.title,
                    })),
                  ]}
                />
                {formik.touched.jobpost && formik.errors.jobpost && (
                  <div className='relative text-red-500'>{formik.errors.jobpost}</div>
                )}
              </div>
            </div>

            <div className='pt-2 sm:col-span-2'>
              <label
                className='block text-sm font-medium text-primary dark:text-secondary'
                htmlFor='link'>
                Google Form Link
              </label>

              <div className='mt-1'>
                <input
                  autoComplete='link'
                  className={`block w-full dark:bg-dark-tertiary dark:text-white da rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${formik.touched.link && formik.errors.link
                    ? 'border-red-500'
                    : ''
                    }`}
                  id='link'
                  name='link'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type='text'
                  value={formik.values.link}
                />
                {formik.touched.link && formik.errors.link && (
                  <div className='text-red-500'>{formik.errors.link}</div>
                )}
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                className='block text-sm font-medium text-primary dark:text-secondary'
                htmlFor='description'>
                Description
              </label>

              <div className='mt-1'>
                <textarea
                  className={`block w-full text-primary dark:bg-dark-tertiary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${formik.touched.description && formik.errors.description
                    ? 'border-red-500'
                    : ''
                    }`}
                  id='description'
                  name='description'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={2}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='text-red-500'>
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>

            <div className='sm:col-span-2'>
              <button
                className='inline-flex dark:text-white w-full items-center justify-center rounded-md border border-transparent bg-primary dark:bg-[#56C870] px-6 py-3 text-base font-medium text-secondary shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                disabled={loading}
                type='submit'>
                {loading ? 'Submitting...' : 'Save the Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaveFormDetails;
