import creator from "./creator";
import axios from "axios";
import { FETCH_TRAINEE } from "..";

export  const getAllTraineess = ({ page,itemsPerPage,  All }:any) => async (dispatch: any) => {
   await fetch('http://localhost:4000',{
      method:'POST',
      headers: {"Content-type": "application/json"},
      body:JSON.stringify({
        query: `
        query AllTraineesDetails($input: pagination) {
          allTraineesDetails(input: $input) {
            gender
            cohort
            trainee_id {
              lastName
              firstName
              email
            }
          }
        }
      `,  variables: {
        input: {
          page,
          itemsPerPage,
          All,
        },
      },
      })
  
}).then(res => res.json())
.then(data =>{
  const trainee = data.data.allTraineesDetails;
  console.log(trainee)
  dispatch(creator(FETCH_TRAINEE, trainee));
})
}




// try {
//   const datas = await axios({
//     url: "http://localhost:5000/",
//     method: "post",
//     data: {
//       query: `
//       query GetAllTrainees {
//         getAllTrainees {
//           id
//           email
//           lastname
//           firstname
//         }
//       }
//     `,
//     },
//   });
//   // console.log("result",datas);
//   const trainee = await datas.data.data.getAllTrainees;
//   console.log( trainee)
  
// } catch (error) {
//   if (error) {
//     return console.log(error);
//   }
// }