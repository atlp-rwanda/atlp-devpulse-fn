import React from 'react';
import { useNavigate } from 'react-router-dom';
import TraineeSuccess from '../components/TraineeSuccess';

const TraineeSuccessPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    
    navigate('trainee-add-attributes');
  };

  return (
    <div>
      <TraineeSuccess onClick={handleClick} />
    </div>
  );
};

export default TraineeSuccessPage;