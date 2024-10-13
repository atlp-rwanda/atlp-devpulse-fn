import InputField from './form/InputField';
import { fetchCountries } from "./country/country";
import React, { useEffect, useState } from 'react';

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

interface Country {
  name: string;
  code: string;
  phone: string;
  suffix: string;
}

interface TraineeFormPage1Props {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
  isDarkMode: boolean;
}

const TraineeFormPage1: React.FC<TraineeFormPage1Props> = ({ formData, setFormData, onNext, isDarkMode }) => {
  const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    async function fetchCountriesData() {
      const countriesData = await fetchCountries();
      const sortedFiltered = countriesData.sort((a: Country, b: Country) =>
        a.name.localeCompare(b.name)
      );
      setFetchedCountries(sortedFiltered);
      setFilteredCountries(sortedFiltered);
    }
    fetchCountriesData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCountry(value);
  
    const filtered = fetchedCountries.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  
    const selectedCountryObj = fetchedCountries.find(
      (country) => country.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedCountryObj) {
      setFormData(prevData => ({
        ...prevData,
        nationality: selectedCountryObj.name,
        countryCode: `${selectedCountryObj.phone}${selectedCountryObj.suffix[0] || ''}`
      }));
    }
  };

  const inputClassName = `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
    isDarkMode
      ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]'
      : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
  } sm:text-[12px] outline-none`;

  return (
    <div className='grid grid-cols-2 gap-20 pt-5 ml-20 pb-20'>
      <div className='space-y-8'>    
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
      
        <div className='space-y-3'>
          <label htmlFor="education_level" className={isDarkMode ? 'text-white' : 'text-gray-800'}>What's your highest level of education?</label>
          <div>
            <input 
              type="radio" 
              name="education_level" 
              value="high school"
              checked={formData.education_level === "high school"}
              onChange={handleInputChange}
            /> Secondary school
          </div>
          <div>
            <input 
              type="radio" 
              name="education_level" 
              value="university"
              checked={formData.education_level === "university"}
              onChange={handleInputChange}
            /> Bachelor's Degree
          </div>
          <div>
            <input 
              type="radio" 
              name="education_level" 
              value="masters"
              checked={formData.education_level === "masters"}
              onChange={handleInputChange}
            /> Master's Degree
          </div>
          <div>
            <input 
              type="radio" 
              name="education_level" 
              value="phd"
              checked={formData.education_level === "phd"}
              onChange={handleInputChange}
            /> PhD
          </div>
        </div>

        <InputField
          name="nationality"
          placeholder="Nationality"
          label='Nationality'
          list="countries"
          value={selectedCountry}
          onChange={handleCountryChange}
          className={inputClassName}
        />
        <datalist id="countries">
          {filteredCountries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>

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
      </div>

      <div className='space-y-8'>
        <InputField
          name="birth_date"
          placeholder="Date of birth"
          label='Choose date'
          type="date"
          value={formData.birth_date}
          onChange={handleInputChange}
          className={inputClassName}
        />

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

        <div className='flex flex-col w-52 space-y-3'>
          <label htmlFor="discipline" className={isDarkMode ? 'text-white' : 'text-gray-800'}>What's your discipline?(if applicable)</label>
          <textarea 
            name="discipline" 
            value={formData.discipline}
            onChange={handleInputChange}
            className={`py-5 rounded-md ${isDarkMode ? 'bg-dark-bg text-white border border-white' : 'border border-gray-500 bg-white text-gray-900'}`}
          ></textarea>
        </div>

        <div>
          <button onClick={onNext} className={`w-52 md:w-2/3 rounded-md px-2 py-3 text-white sm:text-[12px] my-20 ${
             isDarkMode
             ? ' focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293]'
              :'bg-blue-500 hover:bg-blue-600'      
          } cursor-pointer`}>
            Save and Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraineeFormPage1;