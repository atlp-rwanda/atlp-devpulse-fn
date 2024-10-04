import React from 'react'
import Button from '../components/form/Button'

interface traineSuccess{
    onClick: ()=>void;
}

const TraineeSuccess: React.FC<traineSuccess>=({onClick})=> {
  return (
    <div className='w-full max-w-[500px] min-h-screen text-white'>
      <div className='border border-primary rounded-xl mt-40 text-center bg-slate-800 p-10'>
      <div className='mb-5 mt-10'>
        <h1 className='text-2xl'>Conglatulation</h1>
      </div>
      <div className='mb-5'>
         <p>Thank you for applying as a trainee! We would like you to provide more information about you</p>
      </div>
      <div className='mb-5'>
         <Button
          children='Continue'
          onClick={onClick}
         />
      </div>
      </div>
      
    </div>
  )
}

export default TraineeSuccess
