import React, { useEffect, useState } from 'react';
import { fetchCountries } from "./country/country";
import PersonalInfoSection from './Personal';
import EducationSection from './Education';
import LocationSection from './Location';

interface FormData {
  gender: string;
  birth_date: string;
  Address: string;
  phone: string;
  field_of_study: string;
  education_level: string;
  province: string;
  district: string;
  sector: string;
  isEmployed: string;
  haveLaptop: string;
  isStudent: string;
  past_andela_programs: string;
  understandTraining: string;
}

export interface Country {
  name: string;
  code: string;
  phone: string;
  suffix: string;
}

interface TraineeFormPage1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  isDarkMode: boolean;
}

const TraineeFormPage1: React.FC<TraineeFormPage1Props> = ({ formData, setFormData, onNext, isDarkMode }) => {


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className='grid grid-cols-2 gap-20 pt-5 ml-20 pb-20'>
      <div className='space-y-8'>
        <PersonalInfoSection 
          formData={formData}
          handleInputChange={handleInputChange}
          isDarkMode={isDarkMode}
        />
        <EducationSection 
          formData={formData}
          handleInputChange={handleInputChange}
          isDarkMode={isDarkMode}
        />
        
      </div>
      <div className='space-y-8'>
        <LocationSection 
          formData={formData}
          handleInputChange={handleInputChange}
          isDarkMode={isDarkMode}
        />
      </div>
      <button onClick={onNext} className={`w-52 md:w-2/3 rounded-md px-2 py-3 text-white sm:text-[12px] my-20 ${
          isDarkMode
            ? 'focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293]'
            : 'bg-blue-500 hover:bg-blue-600'      
        } cursor-pointer`}>
          Save and Next
        </button>
    </div>
  );
};

export default TraineeFormPage1;