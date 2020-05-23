import React from 'react';
import Style from './index.module.css';

const Button = (props) => {
    return (
        <button className={`${Style.Button} ${Style.buttonShadow} `} onClick={props.onClick}>
            <div>
                <Link to="/register">Get Started</Link>
            </div>
        </button>
    );
};

export default Button;
