import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTraineeAttribute } from '../../redux/actions/traineeAttributes';
import TraineeFormPage1 from '../../components/TraineeFormPage1';
import TraineeFormPage2 from '../../components/TraineeFormPage2';
import { useTheme } from '../../hooks/darkmode'; 

const TraineeAttributeForm = ({ traineeId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { theme } = useTheme(); 
  const isDarkMode = theme === false; 

  const [formData, setFormData] = useState({
    gender: '',
    birth_date: '',
    address:'',
    phone:'',
    study:'',
    education_level: '',
    currentEducationLevel:'',
    nationality: '',
    province: '',
    district: '',
    sector: '',
    discipline: '',
    isEmployed: '',
    haveLaptop: '',
    isStudent:'',
    applicationPost: '',
    andelaPrograms: '',
    understandTraining: '',
    otherApplication: '',
    otherPrograms: '',
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
      address: formData.address,
      phone: formData.phone,
      education_level: formData.education_level,
      currentEducationLevel: formData.currentEducationLevel,
      province: formData.province,
      district: formData.district,
      sector: formData.sector,
      isEmployed: formData.isEmployed === 'yes',
      haveLaptop: formData.haveLaptop === 'yes',
      isStudent: formData.isStudent === 'yes',
      nationality: formData.nationality, 
      english_score: '', 
      interview_decision: '', 
      andelaPrograms: formData.andelaPrograms,
      applicationPost: formData.applicationPost,
      otherApplication: formData.otherApplication,
      otherPrograms: formData.otherPrograms,
      understandTraining: formData.understandTraining === 'yes',
      discipline: formData.discipline,
      trainee_id: traineeId, 
    };
    console.log('Attribute data being sent:', attributeData);
    dispatch(createTraineeAttribute(attributeData));
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    }`}>
      <h2 className={`text-2xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>Fill the form for more information</h2>
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
  );
};

export default TraineeAttributeForm;