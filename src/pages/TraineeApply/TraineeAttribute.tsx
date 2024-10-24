import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TraineeAttributeForm from '../../components/TraineeApply/TraineeAttributeForm';

interface RootState {
  trainee: {
    currentTraineeId: string | null;
  };
}

const TraineeAttribute: React.FC = () => {
  const { traineeId } = useParams<{ traineeId?: string }>();
  const navigate = useNavigate();
  const currentTraineeId = useSelector((state: RootState) => state.trainee.currentTraineeId);

  const effectiveTraineeId = traineeId || currentTraineeId;

  if (!effectiveTraineeId) {
    navigate('trainee-apply');
    return null;
  }

  return (
    <div>
      <TraineeAttributeForm traineeId={effectiveTraineeId} />
    </div>
  );
};

export default TraineeAttribute;