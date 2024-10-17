interface SelectFieldProps {
    id: string;
    name: string;
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
    error?: string;
    touched?: boolean;
}

const SelectField = ({
    id,
    name,
    label,
    options,
    value,
    onChange,
    onBlur,
    error,
    touched,
}: SelectFieldProps) => (
    <div className='sm:col-span-1'>
        <label className='block text-sm font-medium text-primary dark:text-secondary' htmlFor={id}>
            {label}
        </label>
        <div className='relative rounded-md shadow-sm'>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`block w-full dark:text-white dark:bg-dark-tertiary rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${touched && error ? 'border-red-500' : ''
                    }`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {touched && error && <div className='text-red-500'>{error}</div>}
        </div>
    </div>
);

export default SelectField;
