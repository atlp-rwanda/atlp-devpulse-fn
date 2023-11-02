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

type Status = {
  status: string;
  id: string;
}

export const updateApplicationStatus = async(status:string, id:any) => {

  const response = await axios({
    url: process.env.BACKEND_URL,
    method: 'post',
    data: {
      query: `
      mutation AdminUpdateApplicationStatus($applicationId: ID!, $newStatus: String!) {
        adminUpdateApplicationStatus(applicationId: $applicationId, newStatus: $newStatus) {
          _id
          status
        }
      }
      `,
      variables: {
        newStatus: status,
        applicationId:id
      }
    }
  })
  console.log("response", response.data)
  if (response.data.errors) {
    toast.error('Error fetching an application',response.data.errors);
    return;
  }
  return response.data.data.adminUpdateApplicationStatus


}
 
export const ViewSingleApplication = async(urlId:any) => {
  const response = await axios({
    url: process.env.BACKEND_URL,
    method: 'post',
    data: {
      query: `
      query AdminViewSingleApplication($applicationId: ID!) {
        adminViewSingleApplication(applicationId: $applicationId) {
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
      `,
      variables: {
        applicationId: urlId,
      },
    },
  });

  if (response.data.errors) {
    toast.error('Error fetching an application');
    return;
  }
  return response.data.data.adminViewSingleApplication;
}
