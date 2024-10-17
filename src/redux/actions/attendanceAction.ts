import axios from "axios";
import creator from "./creator";
import { GET_TRAINEE_ATTENDANCE } from "..";

export const getTraineeAttendance = (traineeId: any) => async (dispatch: any) => {
    try {
      const response = await axios.post(`${process.env.BACKEND_URL}`, {
        query: `
            query GetTraineeAttendance($traineeId: ID!) {
                getTraineeAttendance(traineeId: $traineeId) {
                    attendances {
                        id
                        date
                        status
                    }
                    attendanceRatio
                }
            }
        `,
        variables: { traineeId },
      });
      if (response.data.errors) {
        console.error('GraphQL Errors:', response.data.errors);
        return;
      }
      const attendanceData = response.data.data.getTraineeAttendance;
      dispatch(creator(GET_TRAINEE_ATTENDANCE, attendanceData));
    } catch (err: any) {
      console.error("Error fetching trainee attendance", err);
    }
}