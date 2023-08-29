// implementing textarea input component for applicant form

import React from 'react';
import PropTypes from 'prop-types';

interface TextareaInputProps {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string;
}

const TextareaInput = ({ label, name, value, placeholder, onChange, error }: TextareaInputProps): JSX.Element => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="mb-2 pl-4 font-bold text-lg text-gray-200">{label}</label>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="border border-gray-200 py-2 px-3  text-gray-600 rounded-lg focus:outline-none focus:border-primary"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
}

TextareaInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

TextareaInput.defaultProps = {
    error: '',
};

export default TextareaInput;