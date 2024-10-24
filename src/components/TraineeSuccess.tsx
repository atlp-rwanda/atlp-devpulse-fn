import React from 'react';
import Button from '../components/form/Button';
import { useTheme } from '../hooks/darkmode';

interface TraineeSuccessProps {
  onContinue: () => void;
}

const TraineeSuccess: React.FC<TraineeSuccessProps> = ({ onContinue }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${theme ? 'bg-white text-gray-900' : ' text-white'}`}>
      <div className={`max-w-md w-full ${theme ? 'border border-gray-500 bg-gray-100' : 'bg-gray-800'} shadow-md rounded-lg p-6`}>
        <h2 className={`text-2xl font-bold mb-4 ${theme ? 'text-gray-800' : 'text-gray-100'}`}>
          Congratulations
        </h2>
        <p className={`mb-6 ${theme ? 'text-gray-600' : 'text-gray-300'}`}>
          Thank you for applying as a trainee! We would like you to provide more information about you.
        </p>
        <Button
          onClick={onContinue}
          className={`w-full ${theme ? 'focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293] text-white' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TraineeSuccess;