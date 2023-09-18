// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const ResponseList = () => {
//   const [responses, setResponses] = useState([]);
//   const GOOGLE_APPS_SCRIPT_URL =
//     'https://script.google.com/macros/s/AKfycbxtXDv1viDZPOOp7h7BI1-Lo8xghOfWOq-a5Z03xvjmgWlADJTLxCEB38Hiihs4fY86/exec';
//   useEffect(() => {
//     // if (GOOGLE_APPS_SCRIPT_URL) {
//     //   fetch(GOOGLE_APPS_SCRIPT_URL)
//     //     .then((response) => {
//     //       if (!response.ok) {
//     //         throw new Error('Network response was not ok');
//     //       }
//     //       return response.json();
//     //     })
//     //     .then((data) => {
//     //       setResponses(data);
//     //     })
//     //     .catch((error) => {
//     //       console.error('Error fetching responses:', error);
//     //     });
//     // }
//     console.log('heree');
//     axios.get(GOOGLE_APPS_SCRIPT_URL).then((res) => {
//       console.log(res);
//     });
//   }, [GOOGLE_APPS_SCRIPT_URL]);

//   return (
//     <div>
//       <h2>Form Responses</h2>
//       <ul>
//         {responses.length > 0 ? (
//           responses.map((response, index) => (
//             <li key={index}>
//               {/* <strong>Timestamp:</strong> {response.Timestamp}<br /> */}
//               <strong>Full Name:</strong> {response['1. Full Name:\n']}
//               <br />
//               <strong>Years of DevOps Experience:</strong>{' '}
//               {response['2. Years of DevOps Experience:\n']}
//               <br />
//               <strong>Experience with DevOps tools and technologies:</strong>{' '}
//               {
//                 response[
//                   '3. Describe your experience with DevOps tools and technologies (e.g., Docker, Kubernetes, Jenkins, Ansible, Terraform).\n'
//                 ]
//               }
//               <br />
//               <strong>Resume/CV Upload:</strong>{' '}
//               <a
//                 href={response['4. Resume/CV Upload:\n']}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Link
//               </a>
//             </li>
//           ))
//         ) : (
//           <li>No responses available.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ResponseList;
