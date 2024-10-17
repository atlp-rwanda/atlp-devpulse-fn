import React from 'react';
import InputField from './form/InputField';

interface FormData {
    gender: string;
    birth_date: string;
    address: string;
    phone: string;
    study: string;
    education_level: string;
    currentEducationLevel: string;
    nationality: string;
    province: string;
    district: string;
    sector: string;
    discipline: string;
    isEmployed: string;
    haveLaptop: string;
    isStudent: string;
    applicationPost: string;
    andelaPrograms: string;
    understandTraining: string;
    otherApplication: string;
    otherPrograms: string;
  }

interface PersonalInfoSectionProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDarkMode: boolean;
  }
  
  const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ formData, handleInputChange, isDarkMode }) => {
    const inputClassName = `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
      isDarkMode
        ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]'
        : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
    } sm:text-[12px] outline-none`;
  
    return (
      <>
        <InputField
          name="address"
          placeholder="Address"
          label='Address'
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          className={inputClassName}
        />
        
        <InputField
          name="phone"
          placeholder="Phone"
          label='Phone'
          type="text"
          value={formData.phone}
          onChange={handleInputChange}
          className={inputClassName}
        />
  
        <div className='flex flex-col space-y-3'>
          <label htmlFor="isStudent" className={isDarkMode ? 'text-white' : 'text-gray-800'}>Are you currently Studying</label>
          <div>
            <input 
              type="radio" 
              name="isStudent" 
              value="yes"
              checked={formData.isStudent === "yes"}
              onChange={handleInputChange}
            /> Yes
          </div>
          <div>
            <input 
              type="radio" 
              name="study" 
              value="no"
              checked={formData.study === "no"}
              onChange={handleInputChange}
            /> No
          </div>
        </div>
      </>
    );
  };
  
  export default PersonalInfoSection;