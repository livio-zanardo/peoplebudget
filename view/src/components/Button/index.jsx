import React from 'react';
import Style from './index.module.css';

const Button = (props) => {
    return (
        <button className={`${Style.Button} ${Style.buttonShadow} `} onClick={props.onClick}>
            { props.children ? props.children : 'Default'}
        </button>
    );
};

export default Button;