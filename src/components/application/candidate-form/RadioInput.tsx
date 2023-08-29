// Implement Applicant Form radio input component
import React from 'react';
import PropTypes from 'prop-types';

interface RadioInputProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = ({
  label,
  name,
  value,
  checked,
  onChange,
}: RadioInputProps): JSX.Element => {
  return (
    <div className='flex items-center mb-4'>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className='h-6 w-6 mr-4 border-gray-300 text-[#173B3F] focus:ring-[#173B3F]'
      />
      <label htmlFor={name} className='text-gray-200 text-lg'>
        {label}
      </label>
    </div>
  );
};

RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioInput;
