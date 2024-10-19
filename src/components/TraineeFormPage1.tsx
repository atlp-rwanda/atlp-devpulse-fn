import React, { useEffect, useState } from 'react';
import { fetchCountries } from "./country/country";
import PersonalInfoSection from './Personal';
import EducationSection from './Education';
import LocationSection from './Location';

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

export interface Country {
  name: string;
  code: string;
  phone: string;
  suffix: string;
}

interface TraineeFormPage1Props {
  formData: FormData;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          filteredCountries={filteredCountries}
          isDarkMode={isDarkMode}
        />
        <button onClick={onNext} className={`w-52 md:w-2/3 rounded-md px-2 py-3 text-white sm:text-[12px] my-20 ${
          isDarkMode
            ? 'focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293]'
            : 'bg-blue-500 hover:bg-blue-600'      
        } cursor-pointer`}>
          Save and Next
        </button>
      </div>
    </div>
  );
};

export default TraineeFormPage1;