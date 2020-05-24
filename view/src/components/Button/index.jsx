import React from 'react';
import Style from './index.module.css';
import Style from "./index.module.css";

const Button = (props) => {
    return (
        <button className={`${Style.Button} ${Style.buttonShadow} `} onClick={props.onClick}>
            Get Started
            {props.children ? props.children : 'Default'}
        </button>
    );
};

export default Button;
export default Button;
