import React from 'react';
import InputField from './form/InputField';

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

interface EducationSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isDarkMode: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ formData, handleInputChange, isDarkMode }) => {
  const inputClassName = `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
    isDarkMode
      ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]'
      : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
  } sm:text-[12px] outline-none`;
  return (
    <>
      <div className='space-y-3'>
          <div>
          <label htmlFor="education_level" className={isDarkMode ? 'text-white' : 'text-gray-800'}>
          What is your highest level of education?
        </label>
            <InputField 
              name="education_level" 
              placeholder="Education level"
              type="text"
              value={formData.education_level}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
          <div>
          <label htmlFor="field_of_study" className={isDarkMode ? 'text-white' : 'text-gray-800'}>
          What is your field of education?
          </label>
            <InputField 
              name="field_of_study" 
              placeholder="field of study"
              type="text"
              value={formData.field_of_study}
              onChange={handleInputChange}
              className={inputClassName}
            />
          </div>
      </div>
    </>
  );
};

export default EducationSection;