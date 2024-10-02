import { useEffect, useState } from "react";
import axios from "../../redux/actions/axiosconfig";
import { showSuccessToast, showErrorToast } from "./../../utils/toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectField from "../ReusableComponents/Select";

const validationSchema = Yup.object().shape({
  link: Yup.string().required("Please enter a Google Form link"),
  title: Yup.string().required("Please enter a form title"),
  jobpost: Yup.string().required("Please select a job post"),
  description: Yup.string().required("Please enter a description"),
});

function SaveFormDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        const response = await axios.post("/", {
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
        console.error("An error occurred:", error);
        setError(`Error fetching job posts: ${error}`);
      }
    };

    fetchjobposts();
  }, []);

  const formik = useFormik({
    initialValues: {
      link: "",
      title: "",
      jobpost: "",
      description: "",
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
        const response = await axios.post("/", {
          query: graphqlQuery,
          variables,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        if (response.data.data && response.data.data.createApplication) {
          setSuccess(true);

          console.log("Application created successfully");
          formik.resetForm();
          showSuccessToast("Application created successfully!");
        } else {
          setError(
            `Error creating application: ${response.data.errors[0].message}`
          );
        }
        window.location.href = "/#/view-forms";
      } catch (error: any) {
        console.error("An error occurred:", error);
        if (error.response) {
          if (error.response.status === 403) {
            setError("You do not have permission to perform this action");
          } else if (error.response.status === 400) {
            setError("Invalid request");
          } else if (error.response.status === 500) {
            setError("Server error");
          } else {
            setError(`An error occurred while submitting the form. ${error}`);
          }
        } else {
          setError(`Error creating application: ${error}`);
        }
      } finally {
        setLoading(false);
        if (success) {
          showSuccessToast("Application created successfully!");
        } else if (error) {
          showErrorToast(error);
        }
      }
    },
  });

  return (
    <div className="overflow-hidden">
      <div className="relative mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-secondary sm:text-4xl">
            Save Application Form
          </h2>

          <p className="mt-4 text-lg leading-6 text-primary dark:text-secondary">
            Copy Google Form URL and paste it in the input field below.
          </p>
        </div>

        <div className="mt-12">
          <form
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            onSubmit={formik.handleSubmit}
          >
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-primary dark:text-secondary"
                htmlFor="title"
              >
                Form Title
              </label>

              <div className="mt-1">
                <input
                  autoComplete="title"
                  className={`block w-full text-primary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    formik.touched.title && formik.errors.title
                      ? "border-red-500"
                      : ""
                  }`}
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500">{formik.errors.title}</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                className="block pb-8 font-medium text-primary dark:text-secondary"
                htmlFor="jobpost"
              >
                Select Job Post
              </label>

              <div className="relative pb-4 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label className="sr-only" htmlFor="jobpost">
                    Job Post
                  </label>
                  <SelectField
                    className={`flex justify-center w-full text-primary rounded-md border-gray-300 py-3 px-4 pl-20 focus:border-indigo-500 focus:ring-indigo-500 ${
                      formik.touched.jobpost && formik.errors.jobpost
                        ? "border-red-500"
                        : ""
                    }`}
                    id="jobpost"
                    name="jobpost"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jobpost}
                    // options={jobposts.map((jobpost) => (
                    //   <option key={jobpost.id} value={jobpost.id}>
                    //     {jobpost.title}
                    //     {console.log(
                    //       "JOB POST =>>>>>>>>>>>>>>>>>>>>>>",
                    //       jobpost.title
                    //     )}
                    //   </option>
                    // ))}
                    options={[
                      { value: "", label: "Select a job post" },
                      ...jobposts.map((jobpost) => ({
                        value: jobpost.id,
                        label: jobpost.title,
                      })),
                    ]}
                  />
                </div>
                {formik.touched.jobpost && formik.errors.jobpost && (
                  <div className="text-red-500">{formik.errors.jobpost}</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 pt-4">
              <label
                className="block text-sm font-medium text-primary dark:text-secondary"
                htmlFor="link"
              >
                Google Form Link
              </label>

              <div className="mt-1">
                <input
                  autoComplete="link"
                  className={`block w-full text-primary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    formik.touched.link && formik.errors.link
                      ? "border-red-500"
                      : ""
                  }`}
                  id="link"
                  name="link"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  value={formik.values.link}
                />
                {formik.touched.link && formik.errors.link && (
                  <div className="text-red-500">{formik.errors.link}</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-primary dark:text-secondary"
                htmlFor="description"
              >
                Description
              </label>

              <div className="mt-1">
                <textarea
                  className={`block w-full text-primary rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    formik.touched.description && formik.errors.description
                      ? "border-red-500"
                      : ""
                  }`}
                  defaultValue=""
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={4}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary dark:bg-[#56C870] px-6 py-3 text-base font-medium text-secondary dark:text-primary shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={loading}
                type="submit"
              >
                {loading ? "Submitting..." : "Save the Form"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaveFormDetails;
