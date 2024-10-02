import axios from "axios";
import creator from "./creator";
import { GET_TRAINEE_ATTENDANCE } from "redux";

export const getTraineeAttendance = (traineeId: any) => async (dispatch: any) => {
    try {
      const response = await axios.post("/", {
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

      const attendanceData = response.data.data.getTraineeAttendance;
      dispatch(creator(GET_TRAINEE_ATTENDANCE, attendanceData));
    } catch (err) {
      console.error("Error fetching trainee attendance", err);
    }
}