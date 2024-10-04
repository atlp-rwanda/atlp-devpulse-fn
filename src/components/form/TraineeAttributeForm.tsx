import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTraineeAttribute } from '../../redux/actions/traineeAttributes';
import TraineeFormPage1 from 'components/TraineeFormPage1';
import TraineeFormPage2 from 'components/TraineeFormPage2';


const TraineeAttributeForm = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studying: '',
    educationLevel: '',
    nationality: '',
    province: '',
    district: '',
    sector: '',
    dateOfBirth: '',
    currentEducationLevel: '',
    gender: '',
    discipline: '',
    employed: '',
    laptop: '',
    applicationPost: '',
    andelaPrograms: '',
    training: '',
    otherApplication: '',
    otherPrograms: '',
  });

  const handleNext = () => {
    setPage(2);
  };

  const handleBack = () => {
    setPage(1);
  };

  const handleSubmit = () => {
  
    const attributeData = {
      gender: formData.gender,
      birth_date: formData.dateOfBirth,
      Address: `${formData.sector}, ${formData.district}, ${formData.province}`,
      phone: '', 
      field_of_study: formData.discipline,
      education_level: formData.educationLevel,
      currentEducationLevel: formData.currentEducationLevel,
      province: formData.province,
      district: formData.district,
      sector: formData.sector,
      isEmployed: formData.employed === 'yes',
      haveLaptop: formData.laptop === 'yes',
      isStudent: formData.studying === 'yes',
      Hackerrank_score: '', 
      english_score: '', 
      interview_decision: '', 
      past_andela_programs: formData.andelaPrograms,
      applicationPost: formData.applicationPost,
      otherApplication: formData.otherApplication,
      andelaPrograms: formData.andelaPrograms,
      otherPrograms: formData.otherPrograms,
      understandTraining: formData.training === 'yes',
      discipline: formData.discipline,
      trainee_id: '', 
    };

    dispatch(createTraineeAttribute(attributeData));
  };

  return (
    <div className='text-white w-full h-full pt-5 px-4 md:px-8 lg:px-16'>
      <h2 className='text-center font-semibold text-xl md:text-2xl mb-6'>Fill the form</h2>
      
      <form className='max-w-4xl mx-auto'>
        {page === 1 ? (
          <TraineeFormPage1 
            formData={formData} 
            setFormData={setFormData} 
            onNext={handleNext} 
          />
        ) : (
          <TraineeFormPage2 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
      </form>
    </div>
  );
};

export default TraineeAttributeForm;