import axios from "axios";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3/all");
    const countriesData = response.data;
    
    const countries = countriesData.map((country: any) => ({
      name: country.name.common,
      code: country.cca2 || "",
      phone: country.idd.root,
      suffix: country.idd.suffixes,
      flag: country.flag
    }));
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
