import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTraineeAttribute } from '../../redux/actions/traineeAttributes';
import TraineeFormPage1 from '../../components/TraineeFormPage1';
import TraineeFormPage2 from '../../components/TraineeFormPage2';
import { useTheme } from '../../hooks/darkmode'; 
import { useNavigate } from 'react-router-dom'

const TraineeAttributeForm = ({ traineeId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { theme } = useTheme(); 
  const isDarkMode = theme === false; 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const attributeData = {
      gender: formData.gender,
      birth_date: formData.birth_date,
      Address: formData.Address,
      phone: formData.phone,
      field_of_study:formData.field_of_study, 
      education_level: formData.education_level,
      province: formData.province,
      district: formData.district,
      sector: formData.sector,
      isEmployed: formData.isEmployed === 'yes',
      haveLaptop: formData.haveLaptop === 'yes',
      isStudent: formData.isStudent === 'yes',
      past_andela_programs: formData.past_andela_programs,
      understandTraining: formData.understandTraining === 'yes',
      trainee_id: traineeId, 
    };
    dispatch(createTraineeAttribute(attributeData));
    navigate('/applicant')
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