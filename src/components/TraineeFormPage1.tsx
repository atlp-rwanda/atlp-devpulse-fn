import InputField from './form/InputField';
import { fetchCountries } from "./country/country";
import { useEffect, useState } from 'react';

interface Country {
  name: string;
  code: string;
  phone: string;
  suffix: string;
}

const TraineeFormPage1 = ({ formData, setFormData, onNext }) => {
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
  
    // Filter countries based on the input
    const filtered = fetchedCountries.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  
    // If a valid country is selected, update the country code and nationality
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
      <div className='grid grid-cols-2 gap-52 pt-5 pb-10'>
        <div className='space-y-8'>    
          <InputField
            name="address"
            placeholder="Address"
            label='Address'
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
          
          <InputField
            name="phone"
            placeholder="Phone"
            label='Phone'
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 px-2 py-2 rounded-md border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
          <div className='flex flex-col space-y-3'>
            <label htmlFor="isStudent">Are you currently Studying</label>
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
            <label htmlFor="education_level">What's your highest level of education?</label>
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
          className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
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
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
          <InputField
            name="district"
            placeholder="District"
            label='District'
            type="text"
            value={formData.district}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
          <InputField
            name="sector"
            placeholder="Sector"
            label='Sector'
            type="text"
            value={formData.sector}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
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
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
          <div className='flex flex-col w-52 space-y-3'>
            <label htmlFor="Gender">What's your current education level?</label>
            <select 
              name="currentEducationLevel" 
              value={formData.currentEducationLevel}
              onChange={handleInputChange}
              className='bg-[#56C870] rounded-md text-black py-2 px-2 w-full'
            >
              <option value="">Education level</option>
              <option value="highschool">Highschool</option>
              <option value="university">University</option>
              <option value="masters">Masters</option>
              <option value="phd">PhD candidate</option>
            </select>
          </div>
        
          <div className='space-y-3'>
            <label htmlFor="Gender">Gender</label>
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
            <label htmlFor="discipline">What's your discipline?(if applicable)</label>
            <textarea 
              name="discipline" 
              value={formData.discipline}
              onChange={handleInputChange}
              className='py-5 bg-dark-bg rounded-md'
            ></textarea>
          </div>
  
          <div>
            <button onClick={onNext} className='w-52 md:w-2/3 rounded-md px-2 py-3 text-white sm:text-[12px] my-20 focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293] cursor-pointer'>
              Save and Next
            </button>
          </div>
        </div>
      </div>
    );
  };

export default TraineeFormPage1; 