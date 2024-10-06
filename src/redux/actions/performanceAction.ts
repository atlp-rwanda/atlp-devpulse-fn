import axios from "axios";
import { GET_TRAINEE_PERFORMANCE } from "..";
import creator from "./creator";

export const getTraineePerformance = (traineeId: any) => async (dispatch: any) => {
    try{
        const response = await axios.post(`${process.env.BACKEND_URL}`, {
            query: `
                query GetTraineePerformance($traineeId: ID!) {
                    getTraineePerformance(traineeId: $traineeId) {
                        performances {
                            id
                            score
                            date
                        }
                        averageScore
                    
                    }
                
                }
            
            `,
            variables: { traineeId }
        })
        
        const performanceData = response.data.data.getTraineePerformance;
        dispatch(creator(GET_TRAINEE_PERFORMANCE, performanceData));

    } catch (error) {
        console.error('Error fetching trainee performance:', error);
    }
}