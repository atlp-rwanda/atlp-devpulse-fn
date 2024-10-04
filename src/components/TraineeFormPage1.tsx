import InputField from './form/InputField';

const TraineeFormPage1 = ({ formData, setFormData, onNext }) => {
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    return (
      <div className='grid grid-cols-2 gap-52 pt-5 pb-10'>
        <div className='space-y-8'>    
          <InputField
            name="firstName"
            placeholder="First name"
            label='First name'
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
          <InputField
            name="email"
            placeholder="Email"
            label='Email'
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 px-2 py-2 rounded-md border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
          <div className='flex flex-col space-y-3'>
            <label htmlFor="Studying">Are you currently Studying</label>
            <div>
              <input 
                type="radio" 
                name="studying" 
                value="yes"
                checked={formData.studying === "yes"}
                onChange={handleInputChange}
              /> Yes
            </div>
            <div>
              <input 
                type="radio" 
                name="studying" 
                value="no"
                checked={formData.studying === "no"}
                onChange={handleInputChange}
              /> No
            </div>
          </div>
        
          <div className='space-y-3'>
            <label htmlFor="Studying">What's your highest level of education?</label>
            <div>
              <input 
                type="radio" 
                name="educationLevel" 
                value="high school"
                checked={formData.educationLevel === "high school"}
                onChange={handleInputChange}
              /> Secondary school
            </div>
            <div>
              <input 
                type="radio" 
                name="educationLevel" 
                value="bachelors"
                checked={formData.educationLevel === "university"}
                onChange={handleInputChange}
              /> Bachelor's Degree
            </div>
            <div>
              <input 
                type="radio" 
                name="educationLevel" 
                value="masters"
                checked={formData.educationLevel === "masters"}
                onChange={handleInputChange}
              /> Master's Degree
            </div>
            <div>
              <input 
                type="radio" 
                name="educationLevel" 
                value="phd"
                checked={formData.educationLevel === "phd"}
                onChange={handleInputChange}
              /> PhD
            </div>
            
          </div>
  
          <InputField
            name="nationality"
            placeholder="Nationality"
            label='Nationality'
            type="text"
            value={formData.nationality}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
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
            name="lastName"
            placeholder="Last name"
            label='Last name'
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
  
          <InputField
            name="dateOfBirth"
            placeholder="Date of birth"
            label='Choose date'
            type="date"
            value={formData.dateOfBirth}
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
              <option value="tvt">PhD candidate</option>
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