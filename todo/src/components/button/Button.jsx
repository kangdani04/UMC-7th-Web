import React from 'react';
import './Button.css';

const Button = ({ text, onClick, disabled }) => {
    return (
        <button
            className={`custom-button ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
