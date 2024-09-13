import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  hidden?: boolean;
}

interface SelectInputProps {
  id: string;
  name: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  ref?: React.RefObject<HTMLSelectElement>;
  placeholder?: string;
  currentValue?: SelectOption;
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, name, defaultValue, onChange, options, placeholder, currentValue }, ref) => {
  return (
    <select
      className="dark:bg-dark-tertiary dark:text-white shadow appearance-none py-2 px-3 rounded w-full leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      ref={ref}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {currentValue && (
        <option
          value={currentValue.value}
          className="dark:bg-dark-tertiary dark:text-white hidden"
        >
          {currentValue.label}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={`dark:bg-dark-tertiary dark:text-white p-3 dark:hover:bg-dark-frame-bg ${option.hidden ? 'hidden' : ''}`}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;