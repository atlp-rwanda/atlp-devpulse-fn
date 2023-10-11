import { fetchAssessment } from '../actiontypes/assessmentType';
import axios from "./axiosconfig";

export const getAllAssessment =
	() =>
	async (dispatch: any) => {
		const query = `
        query GetAllScoreTypes($title: String, $description: String, $programId: String, $modeOfEngagement: String) {
            getAllScoreTypes(title: $title, description: $description, programId: $programId, modeOfEngagement: $modeOfEngagement) {
              id
              title
              description
              modeOfEngagement
              duration
              startDate
              endDate
              program {
                _id
                title
              }
              grading {
                _id
                title
              }
            }
          }
  `;

		try {
			const response = await axios.post("/", {
				query,
				
			});

			const assessmentsData = await response.data.data.getAllScoreTypes;
			dispatch({
                type: fetchAssessment.fetchAssessments,
                data: assessmentsData,
              });
		} catch (error) {
			console.error(error);
		}
	};

