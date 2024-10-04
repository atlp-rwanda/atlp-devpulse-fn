import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrainee } from '../../redux/actions/TraineeAction';
import { getAllCycles } from '../../redux/actions/cyclesActions';
import Button from './Button';
import InputField from './InputField';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../redux/store';
import useFormValidation from '../useFormValidation'

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
  error?: string
}> = ({ value, onChange, cycles, cyclesLoading, error }) => (
  <>
    <select
      name="cycle_id"
      value={value}
      onChange={onChange}
      className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
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

  const cycles = useSelector((state: RootState) => state.cycles.data);
  const cyclesLoading = useSelector((state: RootState) => state.cycles.isLoading);

  const { errors, validateForm } = useFormValidation(formData);

  useEffect(() => {
    dispatch(getAllCycles());
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitError(null);
      try {
        const newTraineeId = await dispatch(createTrainee(formData));
        console.log('Trainee created successfully');
        navigate(`trainee-success/${newTraineeId}`, { replace: true });
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('An error occurred while submitting the form. Please try again.');
      }
    }
  };

  return (
    <div className='w-full max-w-[500px] min-h-screen'>
      <div className="p-20 border border-primary shadow-xl bg-slate-800 rounded mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Trainee Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          {['firstName', 'lastName', 'email'].map((field) => (
            <InputField
              key={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              value={formData[field as keyof FormData]}
              onChange={handleInputChange}
              error={errors[field as keyof FormErrors]}
              className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
            />
          ))}
          <CycleSelector
            value={formData.cycle_id}
            onChange={handleInputChange}
            cycles={cycles}
            cyclesLoading={cyclesLoading}
            error={errors.cycle_id}
          />
          <Button
            type="submit"
            label="Submit Application"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default TraineeApplicationForm;