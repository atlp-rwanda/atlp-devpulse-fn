import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrainee } from '../../redux/actions/TraineeAction';
import { getAllCycles } from '../../redux/actions/cyclesActions';
import Button from './Button';
import InputField from './InputField';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../redux/store';
import useFormValidation from '../useFormValidation';
import { useTheme } from '../../hooks/darkmode'; 
import { loggedUserAction } from '../../redux/actions/getLoggedUser';
import { toast } from "react-toastify";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cycle_id: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  cycle_id?: string;
}

interface Cycle {
  id: string;
  name: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  cycle_id: ''
};

const CycleSelector: React.FC<{
  value: string,
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cycles, cyclesLoading, loggedUser, loggedUserLoading } = useSelector((state: RootState) => ({
    cycles: state.cycles.data,
    cyclesLoading: state.cycles.isLoading,
    loggedUser: state.loggedUser.user,
    loggedUserLoading: state.loggedUser.loading,
  }));

  const { errors, validateForm } = useFormValidation(formData);
  const { theme } = useTheme();
  const isDarkMode = theme === false;

  const isMounted = useRef(true);

  useEffect(() => {
    dispatch(getAllCycles());
    dispatch(loggedUserAction());
    return () => { isMounted.current = false; };
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser && isMounted.current) {
      setFormData(prevData => ({
        ...prevData,
        firstName: loggedUser.firstName || '',
        lastName: loggedUser.lastName || '',
        email: loggedUser.email || '',
      }));
    }
  }, [loggedUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitError(null);
      setIsSubmitting(true);
      try {
        const newTraineeId = await dispatch(createTrainee(formData));
        navigate(`myApplications/trainee-success/${newTraineeId}`, { replace: true });
      } catch (error: any) {
        console.error('Error submitting form:', error);
        setSubmitError(getErrorMessage(error));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loggedUserLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='w-full max-w-[500px] min-h-screen'>
      <div className={`p-20 border shadow-xl rounded mt-20 ${isDarkMode ? 'border-primary bg-slate-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
        <h2 className={`text-2xl font-semibold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trainee Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          {renderFormFields()}
          <CycleSelector
            value={formData.cycle_id}
            onChange={handleInputChange}
            cycles={cycles}
            cyclesLoading={cyclesLoading}
            error={errors.cycle_id}
            isDarkMode={isDarkMode}
          />
          <Button
            type="submit"
            label={isSubmitting ? "Submitting..." : "Submit Application"}
            className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );

  function renderFormFields() {
    return ['firstName', 'lastName', 'email'].map((field) => (
      <InputField
        key={field}
        name={field}
        type={field === 'email' ? 'email' : 'text'}
        placeholder={formatFieldName(field)}
        value={formData[field as keyof FormData]}
        onChange={handleInputChange}
        error={errors[field as keyof FormErrors]}
        className={getInputClassName()}
      />
    ));
  }

  function formatFieldName(field: string) {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
  }

  function getInputClassName() {
    return `w-52 md:w-2/3 rounded-md px-2 py-2 border ${
      isDarkMode 
        ? 'border-white placeholder:text-gray-400 text-white bg-[#1F2A37]' 
        : 'border-gray-300 placeholder:text-gray-500 text-gray-900 bg-white'
    } sm:text-[12px] outline-none`;
  }
};

function getErrorMessage(error: any): string {
  if (error.response?.data?.errors?.[0]?.message) {
    return error.response.data.errors[0].message;
  } else if (error.message) {
    return error.message;
  }
  return "An error occurred while creating the trainee.";
}

export default TraineeApplicationForm;