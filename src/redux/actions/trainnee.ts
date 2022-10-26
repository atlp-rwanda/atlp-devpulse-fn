import creator from "./creator";
import axios from "axios";
import { FETCH_TRAINEE } from "..";

export  const getAllTraineess = ({ page,itemsPerPage,  All }:any) => async (dispatch: any) => {
  try {
    const datas = await axios({
      url: "http://localhost:5000/",
      method: "post",
      data: {
        query: `
        query AllTrainees($input: pagination) {
          allTrainees(input: $input) {
            lastName
            firstName
            _id
            email
          }
        }
      `,  variables: {
        input: {
          page,
          itemsPerPage,
          All,
        },
      },

      },
    });
    console.log("result",datas);
    const trainee = await datas.data.data.allTrainees;
    console.log( trainee)
    dispatch(creator(FETCH_TRAINEE, trainee));
  } catch (error) {
    if (error) {
      return console.log(error);
    }
  }

};