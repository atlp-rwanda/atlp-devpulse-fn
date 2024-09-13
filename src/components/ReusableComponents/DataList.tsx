import React from 'react';

interface DatalistProps {
    id: string;
    options: { value: string; label?: string }[];
    style?: React.CSSProperties; 
  }

const Datalist: React.FC<DatalistProps> = ({ id, options }) => {
    return (
        <datalist id={id}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label || option.value}
                </option>
            ))}
        </datalist>
    );
};

export default Datalist;
