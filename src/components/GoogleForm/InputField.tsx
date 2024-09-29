interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    touched?: boolean;
    classname?: string
}

const InputField = ({
    id,
    name,
    label,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    touched,
    classname
}: InputFieldProps) => (
    <div className={`${classname} g-red-200 sm:col-span-1`}>
        <label className='block text-sm font-medium text-primary dark:text-secondary' htmlFor={id}>
            {label}
        </label>
        <div className='mt-1'>
            <input
                autoComplete={name}
                className={`block w-full dark:text-white dark:bg-dark-tertiary rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${touched && error ? 'border-red-500' : ''
                    }`}
                id={id}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                value={value}
            />
            {touched && error && <div className='text-red-500'>{error}</div>}
        </div>
    </div>
);

export default InputField;
