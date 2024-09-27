import React from 'react';
import { FieldProps } from 'formik';

interface CustomInputProps extends FieldProps {
  title: string;
  placeholder?: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  title,
  placeholder,
  type = 'text',
}) => {
  const error = touched[field.name] && errors[field.name];

  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-100">
        {title}
      </label>
      <input
        id={field.name}
        {...field} // Spread the Formik field props
        type={type}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#56C870] sm:text-sm bg-transparent placeholder:text-gray-700`}
      />
      {error ? (
        <div className="text-red-500 text-sm mt-1">{errors[field.name] as string}</div>
      ) : null}
    </div>
  );
};

export default CustomInput;
