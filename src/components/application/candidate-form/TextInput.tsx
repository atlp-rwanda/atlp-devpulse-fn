// Implement Applicant Text Input Component 
import React from 'react';
import PropTypes from 'prop-types';

interface TextInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const TextInput = ({ label, name, type, placeholder, value, onChange, error }: TextInputProps): JSX.Element => {    
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="mb-2 pl-4 font-bold text-lg text-gray-200">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border border-gray-200 py-2 px-3  text-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

TextInput.defaultProps = {
    error: '',
};

export default TextInput;