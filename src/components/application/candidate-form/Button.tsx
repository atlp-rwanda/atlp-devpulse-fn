// Implement Button Component for Applicant Form using Tailwind CSS
import React from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const ButtonComponent = ({ text, onClick, disabled }: ButtonProps): JSX.Element => {
    return (
        <button
            className="bg-[#308050] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

ButtonComponent.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ButtonComponent.defaultProps = {
    disabled: false,
};

export default ButtonComponent;
