import creator from "./creator";
import axios from "axios";

export const getAllTraineess = () => async (dispatch: any) => {
    try {
      const datas = await axios({
        url: "http://localhost:5000/",
        method: "post",
        data: {
          query: `
          query GetAllTrainees {
            getAllTrainees {
              id
              email
              lastname
              firstname
            }
          }
        `,
        },
      });
      // console.log("result",datas);
      const trainee = await datas.data.data.getAllTrainees;
      console.log( trainee)
      
    } catch (error) {
      if (error) {
        return console.log(error);
      }
    }
  };