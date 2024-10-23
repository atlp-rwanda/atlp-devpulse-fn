import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTrainee } from '../redux/actions/TraineeAction';
import { getAllCycles } from '../redux/actions/cyclesActions';
import { loggedUserAction } from '../redux/actions/getLoggedUser';
import { AppDispatch, RootState } from '../redux/store';
import useFormValidation from '../components/useFormValidation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cycle_id: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  cycle_id: ''
};

export const useTraineeFormLogic = () => {
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
        navigate(`trainee-success/${newTraineeId}`, { replace: true });
      } catch (error: any) {
        console.error('Error submitting form:', error);
        setSubmitError(getErrorMessage(error));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    cycles,
    cyclesLoading,
    handleInputChange,
    handleSubmit,
    isLoading: loggedUserLoading,
  };
};

function getErrorMessage(error: any): string {
  if (error.response?.data?.errors?.[0]?.message) {
    return error.response.data.errors[0].message;
  } else if (error.message) {
    return error.message;
  }
  return "An error occurred while creating the trainee.";
}