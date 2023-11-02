import axios from './axiosconfig';
import { toast } from 'react-toastify';

export const fetchApplications = async () => {
  const response = await axios({
    url: process.env.BACKEND_URL,
    method: 'post',
    data: {
      query: `
          query AdminViewApplications {
            adminViewApplications {
              applications {
                _id
                firstName
                lastName
                email
                telephone
                availability_for_interview
                gender
                resume
                comments
                address
                status
                formUrl
                dateOfSubmission
                associatedFormData {
                  _id
                  title
                  description
                  link
                  jobpost {
                    _id
                    title
                    cycle {
                      id
                      name
                      startDate
                      endDate
                    }
                    program {
                      _id
                      title
                      description
                      mainObjective
                      requirements
                      modeOfExecution
                      duration
                    }
                    cohort {
                      id
                      title
                      start
                      end
                    }
                    link
                    description
                    label
                  }
                }
              }
            }
          }
          `,
    },
  });

  if (response.data.errors) {
    toast.error('Error fetching applications');
    return;
  }

  return response.data.data.adminViewApplications;
};
