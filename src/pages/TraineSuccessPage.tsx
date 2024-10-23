import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TraineeSuccess from '../components/TraineeSuccess';

const TraineeSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { traineeId } = useParams<{ traineeId: string }>();

  const handleContinue = () => {
    if (traineeId) {
      navigate(`/applicant/myApplications/trainee-apply/trainee-success/trainee-add-attributes/${traineeId}`);
    } else {
      console.error('Trainee ID is missing');
    }
  };

  return (
    <div>
      <TraineeSuccess onContinue={handleContinue} />
    </div>
  );
};

export default TraineeSuccessPage;