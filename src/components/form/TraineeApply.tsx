import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrainee } from '../../redux/actions/TraineeAction';
import { getAllCycles } from '../../redux/actions/cyclesActions';
import Button from './Button';
import InputField from './InputField';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../redux/store'; // Adjust the import path as needed

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

const TraineeApplicationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.trainee);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    cycle_id: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cycles = useSelector((state: RootState) => state.cycles.data);
  const cyclesLoading = useSelector((state: RootState) => state.cycles.isLoading);

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

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.cycle_id.trim()) newErrors.cycle_id = 'Cycle ID is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitError(null);
      dispatch(createTrainee(formData))
        .then(() => {
          console.log('Trainee created successfully');
          navigate('trainee-success', { replace: true });
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          setSubmitError('An error occurred while submitting the form. Please try again.');
        });
    }
  };

  return (
    <div className='w-full max-w-[500px] min-h-screen'>
      <div className="p-20 border border-primary shadow-xl bg-slate-800 rounded mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Trainee Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          <InputField
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
          <InputField
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            className="w-52 md:w-2/3 rounded-md px-2 py-2 border border-white placeholder:text-gray-400 text-white sm:text-[12px] outline-none autofill:bg-transparent autofill:text-white bg-[#1F2A37]"
          />
          <select
            name="cycle_id"
            value={formData.cycle_id}
            onChange={handleInputChange}
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
          {errors.cycle_id && <p className="text-red-500">{errors.cycle_id}</p>}
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