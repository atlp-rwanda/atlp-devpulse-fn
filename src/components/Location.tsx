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

interface LocationSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
}

const LocationSection: React.FC<LocationSectionProps> = ({ 
  formData, 
  handleInputChange,   
  isDarkMode 
}) => {
  const inputClassName = `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
    isDarkMode
      ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]'
      : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
  } sm:text-[12px] outline-none`;

  return (
    <>
      <InputField
        name="province"
        placeholder="Province"
        label='Province'
        type="text"
        value={formData.province}
        onChange={handleInputChange}
        className={inputClassName}
      />

      <InputField
        name="district"
        placeholder="District"
        label='District'
        type="text"
        value={formData.district}
        onChange={handleInputChange}
        className={inputClassName}
      />

      <InputField
        name="sector"
        placeholder="Sector"
        label='Sector'
        type="text"
        value={formData.sector}
        onChange={handleInputChange}
        className={inputClassName}
      />

      <InputField
        name="birth_date"
        placeholder="Date of birth"
        label='Choose date'
        type="date"
        value={formData.birth_date}
        onChange={handleInputChange}
        className={inputClassName}
      />

      <div className='space-y-3'>
        <label htmlFor="Gender" className={isDarkMode ? 'text-white' : 'text-gray-800'}>Gender</label>
        <div>
          <input 
            type="radio" 
            name="gender" 
            value="male"
            checked={formData.gender === "male"}
            onChange={handleInputChange}
          /> Male
        </div>
        <div>
          <input 
            type="radio" 
            name="gender" 
            value="female"
            checked={formData.gender === "female"}
            onChange={handleInputChange}
          /> Female
        </div>
      </div>
    </>
  );
};

export default LocationSection;