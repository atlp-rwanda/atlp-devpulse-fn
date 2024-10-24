import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTraineeAttribute } from '../../redux/actions/traineeAttributes';
import TraineeFormPage1 from '../../components/TraineeFormPage1';
import TraineeFormPage2 from '../../components/TraineeFormPage2';
import { useTheme } from '../../hooks/darkmode'; 
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

interface FormData {
  gender: string;
  birth_date: string;
  Address: string;
  phone: string;
  field_of_study: string;
  education_level: string;
  province: string;
  district: string;
  sector: string;
  isEmployed: string;
  haveLaptop: string;
  isStudent: string;
  past_andela_programs: string;
  understandTraining: string;
}   

const TraineeAttributeForm = ({ traineeId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { theme } = useTheme(); 
  const isDarkMode = theme === false; 
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    gender: '',
    birth_date: '',
    Address:'',
    phone:'',
    field_of_study:'',
    education_level: '',
    province: '',
    district: '',
    sector: '',
    isEmployed: '',
    haveLaptop: '',
    isStudent:'',
    past_andela_programs: '',
    understandTraining: '',
  });

  const handleNext = () => {
    setPage(2);
  };

  const handleBack = () => {
    setPage(1);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const attributeData = {
        ...formData,
        isEmployed: formData.isEmployed === 'yes',
        haveLaptop: formData.haveLaptop === 'yes',
        isStudent: formData.isStudent === 'yes',
        understandTraining: formData.understandTraining === 'yes',
        trainee_id: traineeId,
      };
      const result = await dispatch(createTraineeAttribute(attributeData));

      if (result.success) {
        toast.success("Application submitted successfully!");
        navigate('/applicant');
      } else {
        setError(result.error?.message || "Failed to submit application. Please try again.");
        toast.error(result.error?.message || "Failed to submit application");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h3 className={`text-3xl font-semibold mb-8 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Fill the form for more information</h3>
        <div className="w-full max-w-4xl">
          {page === 1 ? (
            <TraineeFormPage1
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              isDarkMode={isDarkMode}
            />
          ) : (
            <TraineeFormPage2
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineeAttributeForm;