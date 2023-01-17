import { useEffect, useState } from 'react';
import axios from '../../redux/actions/axiosconfig';
import { showSuccessToast, showErrorToast } from './../../utils/toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import SelectField from './SelectField';

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
  const [jobposts, setJobposts] = useState<any>([]);

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
          variables: { input: { All: true, page: 1 } },
        });
        if (response.data.data) {
          setJobposts(response.data.data.getAllJobApplication);
        } else {
          throw new Error(response.data.errors[0].message);
        }
      } catch (err: any) {
        console.error('Error fetching job posts:', err);
        setError(err.message);
      }
    };
    fetchJobPosts();
  }, []);

  const formik = useFormik({
    initialValues: { link: '', title: '', jobpost: '', description: '' },
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
      }`;

      try {
        const response = await axios.post('/', {
          query: graphqlQuery,
          variables: values,
        });
        if (response.data.errors) {
          const errorMessage = response.data.errors[0].error;
          if (errorMessage.toLowerCase().includes("a record with link"))
            showErrorToast('The link is already in use');
        } else {
          setSuccess(true);
          showSuccessToast('Application created successfully!');
          formik.resetForm();
          window.location.href = '/#/admin/view-forms';
        }
      } catch (err: any) {
        console.error('Error submitting form:', err);
        showErrorToast('An error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='overflow-auto'>
      <div className='relative max-w-xl mx-auto'>
        <h2 className='text-2xl font-bold text-center text-primary dark:text-secondary sm:text-4xl'>
          Save Application Form
        </h2>
        <p className='mt-4 text-lg leading-6 text-center text-primary dark:text-secondary'>
          Copy Google Form URL and paste it in the input field below.
        </p>

        <form className='grid grid-cols-1 mt-10 gap-y-3 sm:grid-cols-2 sm:gap-x-8' onSubmit={formik.handleSubmit}>
          <InputField
            id='title'
            name='title'
            label='Form Title'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.title}
            error={formik.errors.title}
          />
          <SelectField
            id='jobpost'
            name='jobpost'
            label='Select Job Post'
            value={formik.values.jobpost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={[{ value: '', label: 'Select job title' }, ...jobposts.map((job: any) => ({ value: job.id, label: job.title }))]}
            touched={formik.touched.jobpost}
            error={formik.errors.jobpost}
          />
          <InputField
            id='link'
            name='link'
            label='Google Form Link'
            value={formik.values.link}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.link}
            error={formik.errors.link}
            classname='w-[212%]'
          />
          <div className='sm:col-span-2'>
            <label className='block text-sm font-medium text-primary dark:text-secondary'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className={`block w-full dark:bg-dark-tertiary rounded-md py-3 px-4 ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''
                }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              value={formik.values.description}
              placeholder='Enter description...'
            />
            {formik.touched.description && formik.errors.description && (
              <div className='text-red-500'>{formik.errors.description}</div>
            )}
          </div>

          <button
            type='submit'
            className='w-full inline-flex items-center justify-center rounded-md bg-primary dark:bg-[#56C870] px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Save the Form'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SaveFormDetails;
