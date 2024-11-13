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

// Custom hook to manage form state
const useFormState = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  return { formData, setFormData, formErrors, setFormErrors, handleInputChange };
};

// Custom hook to manage submission state
const useSubmissionState = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return { submitError, setSubmitError, isSubmitting, setIsSubmitting };
};

// Custom hook to handle user data
const useUserData = (setFormData: (fn: (prev: FormData) => FormData) => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const isMounted = useRef(true);
  
  const { loggedUser, loggedUserLoading } = useSelector((state: RootState) => ({
    loggedUser: state.loggedUser.user,
    loggedUserLoading: state.loggedUser.loading,
  }));

  useEffect(() => {
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
  }, [loggedUser, setFormData]);

  return { loggedUserLoading, isMounted };
};

// Custom hook to handle form submission
const useFormSubmission = (
  formData: FormData,
  validateForm: () => boolean,
  isMounted: React.MutableRefObject<boolean>,
  setFormErrors: (fn: (prev: Record<string, string>) => Record<string, string>) => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { submitError, setSubmitError, isSubmitting, setIsSubmitting } = useSubmissionState();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const result: any = await dispatch(createTrainee(formData));
      
      if (result?.data?.createNewTraineeApplicant?._id) {
        const traineeId = result.data.createNewTraineeApplicant._id;
        navigate(`/applicant/available-jobs/trainee-apply/trainee-success/${traineeId}`, {
          replace: true
        });
      } else if (result?.data?.errors) {
        throw new Error(result.data.errors[0]?.message || 'Failed to create trainee');
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error: any) {
      console.error('Detailed error:', {
        error,
        message: error.message,
        response: error.response,
        stack: error.stack
      });

      const errorMessage = getErrorMessage(error);
      setSubmitError(errorMessage);
      
      if (errorMessage.toLowerCase().includes('cycle')) {
        setFormErrors(prev => ({
          ...prev,
          cycle_id: 'Please select a valid application cycle'
        }));
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  return { handleSubmit, submitError, isSubmitting };
};

// Main hook that composes all the functionality
export const useTraineeFormLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formData, setFormData, formErrors, setFormErrors, handleInputChange } = useFormState(initialFormData);
  const { errors, validateForm } = useFormValidation(formData);
  const { loggedUserLoading, isMounted } = useUserData(setFormData);
  const { handleSubmit, submitError, isSubmitting } = useFormSubmission(
    formData,
    validateForm,
    isMounted,
    setFormErrors
  );

  const { cycles, cyclesLoading } = useSelector((state: RootState) => ({
    cycles: state.cycles.data,
    cyclesLoading: state.cycles.isLoading,
  }));

  useEffect(() => {
    dispatch(getAllCycles());
  }, [dispatch]);

  return {
    formData,
    errors: { ...errors, ...formErrors },
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
  }
  if (error.message) {
    return error.message;
  }
  return "An error occurred while creating the trainee.";
}