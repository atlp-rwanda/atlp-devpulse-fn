import { toast } from "react-toastify";
import axios from "./axiosconfig";

export const createGradingSystem = async (title, assessments, description, grade) => {

  try {
    const data = await axios.post("/",
      {
        query: `
            mutation CreateGrading($gradingInput: GradingInput!) {
                createGrading(gradingInput: $gradingInput) {
                  _id
                  assessment
                  description
                  grades {
                    scale {
                      lowerValue {
                        desc
                        value
                      }
                      name
                      upperValue {
                        desc
                        value
                      }
                    }
                  }
                  title
                }
              }
             `
        ,
        variables: {
          gradingInput: {
            assessment: assessments,
            description: description,
            grades: grade,
            title: title
          }
        }
      }
    );
    
    return data.data;

  } catch (err) {

    return err;

  }
}