import React from 'react';

interface SelectFieldProps {
  id?: string;
  name?: string;
  value?: string | number;
  options: { value: string | number; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ref?: React.Ref<HTMLSelectElement>;
  className?: string;
  defaultValue?: string | number;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  options,
  onChange,
  ref,
  className = "",
  defaultValue,
  onBlur
}) => {
  return (
    <select
      id={id}
      name={name}
      ref={ref}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      className={`dark:bg-dark-tertiary dark:text-white shadow appearance-none py-2 px-3 rounded w-full leading-tight focus:outline-none focus:shadow-outline ${className}`}
      onBlur={(e: React.FocusEvent<HTMLSelectElement>) => onBlur?.(e)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
