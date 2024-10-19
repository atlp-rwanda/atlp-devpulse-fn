import React from 'react';

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

interface EducationSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isDarkMode: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ formData, handleInputChange, isDarkMode }) => {
  return (
    <>
      <div className='space-y-3'>
        <label htmlFor="education_level" className={isDarkMode ? 'text-white' : 'text-gray-800'}>What's your highest level of education?</label>
        {['Secondary school', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'].map((level) => (
          <div key={level}>
            <input 
              type="radio" 
              name="education_level" 
              value={level.toLowerCase()}
              checked={formData.education_level === level.toLowerCase()}
              onChange={handleInputChange}
            /> {level}
          </div>
        ))}
      </div>

      <div className='flex flex-col w-52 space-y-3'>
        <label htmlFor="Gender" className={isDarkMode ? 'text-white' : 'text-gray-800'}>What's your current education level?</label>
        <select 
          name="currentEducationLevel" 
          value={formData.currentEducationLevel}
          onChange={handleInputChange}
          className={`rounded-md py-2 px-2 w-full ${
            isDarkMode ? ' bg-[#56C870] text-black':'bg-blue-500 text-white' 
          }`}
        >
          <option value="">Education level</option>
          <option value="highschool">Highschool</option>
          <option value="university">University</option>
          <option value="masters">Masters</option>
          <option value="phd">PhD candidate</option>
        </select>
      </div>
    </>
  );
};

export default EducationSection;