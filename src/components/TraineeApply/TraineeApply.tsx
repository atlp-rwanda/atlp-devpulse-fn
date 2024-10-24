import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../form/Button';
import InputField from '../form/InputField';
import { useTraineeFormLogic } from '../../hooks/useTraineeFormLogic';
import { useTheme } from '../../hooks/darkmode';

interface Cycle {
  id: string;
  name: string;
}

const CycleSelector: React.FC<{
  value: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  cycles: Cycle[],
  cyclesLoading: boolean,
  error?: string,
  isDarkMode: boolean 
}> = ({ value, onChange, cycles, cyclesLoading, error, isDarkMode }) => (
  <>
    <select
      name="cycle_id"
      value={value}
      onChange={onChange}
      className={`w-52 md:w-2/3 rounded-md px-2 py-2 border ${
        isDarkMode ? 'border-white text-white bg-[#1F2A37]' : 'border-gray-300 text-gray-900 bg-white'
      } placeholder:text-gray-400 sm:text-[12px] outline-none`}
      disabled={cyclesLoading}
    >
      <option value="">Select Application Cycle</option>
      {cycles.map((cycle: Cycle) => (
        <option key={cycle.id} value={cycle.id}>
          {cycle.name}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500">{error}</p>}
  </>
);

const TraineeApplicationForm: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    cycles,
    cyclesLoading,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useTraineeFormLogic();

  const { theme } = useTheme();
  const isDarkMode = theme === false;

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='w-full max-w-[500px] min-h-screen'>
      <div className={getContainerClassName(isDarkMode)}>
        <h2 className={getTitleClassName(isDarkMode)}>Trainee Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          {renderFormFields(formData, errors, handleInputChange, isDarkMode)}
          {renderCycleSelector(formData, errors, handleInputChange, cycles, cyclesLoading, isDarkMode)}
          {renderSubmitButton(isSubmitting, isDarkMode)}
        </form>
      </div>
    </div>
  );
};

const renderFormFields = (formData, errors, handleInputChange, isDarkMode) => 
  ['firstName', 'lastName', 'email'].map((field) => (
    <InputField
      key={field}
      name={field}
      type={field === 'email' ? 'email' : 'text'}
      placeholder={formatFieldName(field)}
      value={formData[field]}
      onChange={handleInputChange}
      error={errors[field]}
      className={getInputClassName(isDarkMode)}
    />
  ));

const renderCycleSelector = (formData, errors, handleInputChange, cycles, cyclesLoading, isDarkMode) => (
  <>
    <select
      name="cycle_id"
      value={formData.cycle_id}
      onChange={handleInputChange}
      className={getInputClassName(isDarkMode)}
      disabled={cyclesLoading}
    >
      <option value="">Select Application Cycle</option>
      {cycles.map((cycle) => (
        <option key={cycle.id} value={cycle.id}>
          {cycle.name}
        </option>
      ))}
    </select>
    {errors.cycle_id && <p className="text-red-500">{errors.cycle_id}</p>}
  </>
);

const renderSubmitButton = (isSubmitting, isDarkMode) => (
  <Button
    type="submit"
    label={isSubmitting ? "Submitting..." : "Submit Application"}
    className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
    disabled={isSubmitting}
  />
);

const formatFieldName = (field: string) =>
  field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');

const getInputClassName = (isDarkMode: boolean) =>
  `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
    isDarkMode 
      ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]' 
      : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
  } sm:text-[12px] outline-none`;

const getContainerClassName = (isDarkMode: boolean) =>
  `p-20 border shadow-xl rounded mt-20 ${
    isDarkMode ? 'border-primary bg-slate-800 text-white' : 'border-gray-300 bg-white text-gray-900'
  }`;

const getTitleClassName = (isDarkMode: boolean) =>
  `text-2xl font-semibold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`;

export default TraineeApplicationForm;