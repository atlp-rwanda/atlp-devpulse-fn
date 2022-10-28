import React from 'react'
import DataTable from "../components/TableData";
import traineeData from "../dummyData/Trainee.json";
import { HiDotsVertical } from "react-icons/hi";

function Table() {

    const columns = [
        {Header:"FIRST NAME",accessor:"firstname"},
        {Header:"LAST NAME",accessor:"lastname"},
        {Header:"Email",accessor:"email"},
        {Header:"Gender",accessor:"gender"},
        {Header:"cycle",accessor:"cycle"},
        {
          Header: 'Action',
          accessor: '',
          Cell: ({ row }: any) => (
            <div
              className={
                ' items-center' + (traineeData?.length > 0 ? ' flex' : ' hidden')
              }
            >
             
              <HiDotsVertical  className=" text-black text-3xl ml-6 font-size-6 cursor-pointer"/>
              </div>
              )}
      ];
      console.log(traineeData,"hey")
      const data =[];
      let datum: any = [];
      if (traineeData && traineeData.length > 0) {
        traineeData?.map((data: any, index: number) => {
          datum[index] = {};
          datum[index].firstname = data.firstname;
          datum[index].lastname = data.lastname;
          datum[index].email = data.email;
          datum[index].gender = data.gender;
          datum[index].cycle = data.cycle;
          
        });
      }

  return (
    <>
    

    <DataTable 
    data={traineeData?.length > 0 ? datum : [{}]
   
  }
 
  columns={columns}
    title="Trainee applicants"/>


   
  </>
  )
}

export default Table