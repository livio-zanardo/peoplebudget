import React from 'react';
import { button } from './index.module.css';

const Button = ({ children, onClick, customClassName }) => {
    return (
        <button
            className={`${button} 
        ${customClassName ? customClassName : ''}`}
            onClick={onClick}
        >
            {children ? children : 'Default'}
        </button>
    );
};

export default Button;
