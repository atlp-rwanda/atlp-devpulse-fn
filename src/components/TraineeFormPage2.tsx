import InputField from './form/InputField';

interface ComponentProps {
  formData: any;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  isDarkMode: boolean;
}

const EmploymentSection: React.FC<ComponentProps> = ({ formData, handleInputChange, isDarkMode }) => {
 
  const inputClassName = `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
    isDarkMode
      ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]'
      : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
  } sm:text-[12px] outline-none`;

  return (
    <div className='space-y-3 w-2/3'>
      <label htmlFor="isEmployed" className={isDarkMode ? 'text-white' : 'text-gray-800'}>
        Are you currently employed? <span className='text-red-700'>*</span>
      </label>
      <div>
        <input 
          type="radio" 
          name="isEmployed" 
          value="yes"
          checked={formData.isEmployed === "yes"}
          onChange={handleInputChange}
        /> Yes
      </div>
      <div>
        <input 
          type="radio" 
          name="isEmployed" 
          value="no"
          checked={formData.isEmployed === "no"}
          onChange={handleInputChange}
        /> No
      </div>
       
      <div className='space-y-5 w-2/3 mt-10'>
      <label htmlFor="past_andela_program" className={isDarkMode ? 'text-white' : 'text-gray-800'}>
        Did you participate in (and complete) any of the Andela Rwanda affiliated programs?
      </label>
      <InputField
      name="past_andela_programs"
      placeholder="Let us know which program!"
      type="text"
      value={formData.past_andela_programs}
      onChange={handleInputChange}
      className={inputClassName}
      />

      </div> 

    </div>


)};

const ProgramInfoSection: React.FC<ComponentProps> = ({ formData, handleInputChange,inputClassName, isDarkMode }) => {

  return (
    <>
      <div className='flex flex-col space-y-5 w-2/3'>
        <label htmlFor="understandTraining" className={isDarkMode ? 'text-white' : 'text-gray-800'}>
          Do you understand that the Andela Technical Leadership Program is an unpaid training Program?
        </label>
        <div>
          <input 
            type="radio" 
            name="understandTraining" 
            value="yes"
            checked={formData.understandTraining === "yes"}
            onChange={handleInputChange}
          /> Yes
        </div>
        <div>
          <input 
            type="radio" 
            name="understandTraining" 
            value="no"
            checked={formData.understandTraining === "no"}
            onChange={handleInputChange}
          /> No
        </div>
      </div>

      <div className='flex flex-col space-y-5 w-2/3'>
        <label htmlFor="haveLaptop" className={isDarkMode ? 'text-white' : 'text-gray-800'}>
          If selected, do you have a laptop that you can use in the program?
        </label>
        <div>
          <input 
            type="radio" 
            name="haveLaptop" 
            value="yes"
            checked={formData.haveLaptop === "yes"}
            onChange={handleInputChange}
          /> Yes
        </div>
        <div>
          <input 
            type="radio" 
            name="haveLaptop" 
            value="no"
            checked={formData.haveLaptop === "no"}
            onChange={handleInputChange}
          /> No
        </div>
      </div>
    </>
  );
};

const TraineeFormPage2 = ({ formData, setFormData, onSubmit, onBack, isDarkMode }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const inputClassName = `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
    isDarkMode
      ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]'
      : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
  } sm:text-[12px] outline-none`;

  return (
    <div className='grid grid-cols-2 gap-1 pt-5 ml-20 pb-20'>
      <div className='space-y-8'>
        <EmploymentSection 
          formData={formData}
          handleInputChange={handleInputChange}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className='space-y-8'>
        <ProgramInfoSection 
          formData={formData}
          handleInputChange={handleInputChange}
          inputClassName={inputClassName}
          isDarkMode={isDarkMode}
        />
        
      </div>
      <div className="col-span-1 flex space-x-4 mt-8 w-2/3">
          <button onClick={onBack} className={`w-52 md:w-2/3 rounded-md px-2 py-3 text-white sm:text-[12px] my-20 ${
            isDarkMode
              ? ' focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293]'
              : 'bg-blue-500 hover:bg-blue-600'
          } cursor-pointer`}>
            Back
          </button>
          <button onClick={onSubmit} className={`w-52 md:w-2/3 inset-0 m-auto rounded-md px-2 py-3 text-white sm:text-[12px] my-20 ${
            isDarkMode
              ? ' focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293]'
              : 'bg-blue-500 hover:bg-blue-600'
          } cursor-pointer`}>
            Submit
          </button>
      </div>
    </div>
  );
};

export default TraineeFormPage2;