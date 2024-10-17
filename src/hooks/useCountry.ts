import { fetchCountries } from '../components/country/country';
import { formData, googleFormData } from '../components/validation/Register';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form'; 

export interface Country {
  name: string;
  code: string;
  phone: string;
  suffix: string;
}

interface UseCountryProps {
  setValue: UseFormSetValue<googleFormData>;
}

const useCountry = ({ setValue }: UseCountryProps) => {
  const [fetchedCountries, setFetchedCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    async function fetchCountriesData() {
      const countriesData = await fetchCountries();
      const sortedFiltered = countriesData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
      setFetchedCountries(sortedFiltered);
      setFilteredCountries(sortedFiltered);
    }
    fetchCountriesData();
  }, []);

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
      setValue("code", `${selectedCountryObj.phone}${selectedCountryObj.suffix}`);
    }
  };

  return {
    fetchedCountries,
    filteredCountries,
    selectedCountry,
    handleCountryChange,
  };
};

export default useCountry;