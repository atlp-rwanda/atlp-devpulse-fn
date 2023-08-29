// Implementing a drop down input component for the candidate form for selecting the current level of education

import React from 'react';
import PropTypes from 'prop-types';

interface DropDownInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error: string;
}

const DropDownInput = ({ label, name, value, onChange, error }: DropDownInputProps): JSX.Element => {   
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name} className="mb-2 pl-4 font-bold text-lg text-gray-200">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-200 py-2 px-3  text-gray-600 rounded-lg focus:outline-none focus:border-primary"
            >
                <option value="0">Education Level</option>
                <option value="1">High School</option>
                <option value="2">Undergraduate</option>
                <option value="3">Postgraduate</option>
            </select>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
}

DropDownInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

DropDownInput.defaultProps = {
    error: '',
};

export default DropDownInput;