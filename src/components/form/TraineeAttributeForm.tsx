import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { createTraineeAttribute } from '../../redux/actions/traineeAttributes';
import TraineeFormPage1 from '../../components/TraineeFormPage1';
import TraineeFormPage2 from '../../components/TraineeFormPage2';


const TraineeAttributeForm = ({ traineeId }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
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
    <div className='text-white w-full h-full pt-5 px-4 md:px-8 lg:px-16'>
      <h2 className='text-center font-semibold text-xl md:text-2xl mb-6'>Fill the form for more information</h2>
      
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