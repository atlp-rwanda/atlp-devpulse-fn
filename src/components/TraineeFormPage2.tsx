import InputField from './form/InputField';

const TraineeFormPage2 = ({ formData, setFormData, onSubmit, onBack }) => {
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    return (
      <div className='grid grid-cols-2 gap-10 pt-5 ml-20 pb-20'>
        <div className='space-y-8'>
          <div className='space-y-3 w-2/3'>
            <label htmlFor="employed">Are you currently employed? <span className='text-red-700'>*</span></label>
            <div>
              <input 
                type="radio" 
                name="employed" 
                value="yes"
                checked={formData.employed === "yes"}
                onChange={handleInputChange}
              /> Yes
            </div>
            <div>
              <input 
                type="radio" 
                name="employed" 
                value="no"
                checked={formData.employed === "no"}
                onChange={handleInputChange}
              /> No
            </div>
          </div>
  
          <div className='space-y-5 w-2/3'>
            <label htmlFor="applicationPost">How did you find the post for this application?</label>
            <div>
              <input 
                type="radio" 
                name="applicationPost" 
                value="Andela Twitter Handle"
                checked={formData.applicationPost === "Andela Twitter Handle"}
                onChange={handleInputChange}
              /> Andela Twitter Handle
            </div>
            <div>
              <input 
                type="radio" 
                name="applicationPost" 
                value="Got an email from Andela"
                checked={formData.applicationPost === "Got an email from Andela"}
                onChange={handleInputChange}
              /> Got an email from Andela
            </div>
            <div>
              <input 
                type="radio" 
                name="applicationPost" 
                value="Referred by a friend"
                checked={formData.applicationPost === "Referred by a friend"}
                onChange={handleInputChange}
              /> Referred by a friend
            </div>
            <div className='space-y-3'>
              <div>
                <input 
                  type="radio" 
                  name="applicationPost" 
                  value="Other"
                  checked={formData.applicationPost === "Other"}
                  onChange={handleInputChange}
                /> Other:
              </div>
              <InputField
                name="otherApplication"
                placeholder="Let us know how!"
                type="text"
                value={formData.otherApplication}
                onChange={handleInputChange}
                className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
              />
            </div>
          </div>
  
          <div className='space-y-5 w-2/3'>
            <label htmlFor="andelaPrograms">Did you participate in (and complete) any of the Andela Rwanda affiliated programs below?</label>
            <div>
              <input 
                type="radio" 
                name="andelaPrograms" 
                value="Web Development Crash Course"
                checked={formData.andelaPrograms === "Web Development Crash Course"}
                onChange={handleInputChange}
              /> Web Development Crash Course
            </div>
            <div>
              <input 
                type="radio" 
                name="andelaPrograms" 
                value="Andela Learning Community"
                checked={formData.andelaPrograms === "Andela Learning Community"}
                onChange={handleInputChange}
              /> Andela Learning Community (ALC)
            </div>
            <div className='space-y-3'>
              <div>
                <input 
                  type="radio" 
                  name="andelaPrograms" 
                  value="Other"
                  checked={formData.andelaPrograms === "Other"}
                  onChange={handleInputChange}
                /> Other:
              </div>
              <InputField
                name="otherPrograms"
                placeholder="Let us know which program!"
                type="text"
                value={formData.otherPrograms}
                onChange={handleInputChange}
                className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
              />
            </div>
          </div>
        </div>
  
        <div className='space-y-8'>
          <div className='flex flex-col space-y-5 w-2/3'>
            <label htmlFor="training">Do you understand that the Andela Technical Leadership Program is an unpaid training Program?</label>
            <div>
              <input 
                type="radio" 
                name="training" 
                value="yes"
                checked={formData.training === "yes"}
                onChange={handleInputChange}
              /> Yes
            </div>
            <div>
              <input 
                type="radio" 
                name="training" 
                value="no"
                checked={formData.training === "no"}
                onChange={handleInputChange}
              /> No
            </div>
          </div>
  
          <div className='flex flex-col space-y-5 w-2/3'>
            <label htmlFor="laptop">If selected, do you have a laptop that you can use in the program?</label>
            <div>
              <input 
                type="radio" 
                name="laptop" 
                value="yes"
                checked={formData.laptop === "yes"}
                onChange={handleInputChange}
              /> Yes
            </div>
            <div>
              <input 
                type="radio" 
                name="laptop" 
                value="no"
                checked={formData.laptop === "no"}
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