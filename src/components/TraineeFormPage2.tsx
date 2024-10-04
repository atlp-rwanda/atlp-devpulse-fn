import InputField from './form/InputField';

const TraineeFormPage2 = ({ formData, setFormData, onSubmit, onBack }) => {
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevData => ({
        ...prevData,
        ...(name === 'applicationPost' && value !== 'Other' && { otherApplication: '' }),
        ...(name === 'andelaPrograms' && value !== 'Other' && { otherPrograms: '' }),
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    return (
      <div className='grid grid-cols-2 gap-10 pt-5 ml-20 pb-20'>
        <div className='space-y-8'>
          <div className='space-y-3 w-2/3'>
            <label htmlFor="isEmployed">Are you currently employed? <span className='text-red-700'>*</span></label>
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
          </div>
  
          <div className='space-y-5 w-2/3'>
        <label htmlFor="applicationPost">How did you find the post for this application?</label>
        {['Andela Twitter Handle', 'Got an email from Andela', 'Referred by a friend', 'Other'].map((option) => (
          <div key={option}>
            <input 
              type="radio" 
              name="applicationPost" 
              value={option}
              checked={formData.applicationPost === option}
              onChange={handleInputChange}
            /> {option}
          </div>
        ))}
        {formData.applicationPost === 'Other' && (
          <input
            name="otherApplication"
            placeholder="Let us know how!"
            type="text"
            value={formData.otherApplication}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
        )}
      </div>
  
          <div className='space-y-5 w-2/3'>
        <label htmlFor="andelaPrograms">Did you participate in (and complete) any of the Andela Rwanda affiliated programs below?</label>
        {['Web Development Crash Course', 'Andela Learning Community', 'Other'].map((option) => (
          <div key={option}>
            <input 
              type="radio" 
              name="andelaPrograms" 
              value={option}
              checked={formData.andelaPrograms === option}
              onChange={handleInputChange}
            /> {option}
          </div>
        ))}
        {formData.andelaPrograms === 'Other' && (
          <input
            name="otherPrograms"
            placeholder="Let us know which program!"
            type="text"
            value={formData.otherPrograms}
            onChange={handleInputChange}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
        )}
      </div>
        </div>
  
        <div className='space-y-8'>
          <div className='flex flex-col space-y-5 w-2/3'>
            <label htmlFor="understandTraining">Do you understand that the Andela Technical Leadership Program is an unpaid training Program?</label>
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
            <label htmlFor="haveLaptop">If selected, do you have a laptop that you can use in the program?</label>
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
          <div className="col-span-1 flex space-x-4 mt-8 w-2/3">
            <button onClick={onBack} className='w-52 md:w-1/3 rounded-md px-2 py-3 text-white text-sm my-2 bg-gray-500 hover:bg-gray-600 cursor-pointer'>
              Back
            </button>
            <button onClick={onSubmit} className='w-52 md:w-1/3 rounded-md px-2 py-3 text-white text-sm my-2 focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293] cursor-pointer'>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default TraineeFormPage2;