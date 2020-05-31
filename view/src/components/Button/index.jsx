import React from 'react';
<<<<<<< HEAD
import Style from './index.module.css';

const Button = (props) => {
    return (
        <button className={`${Style.Button} ${Style.buttonShadow} `} onClick={props.onClick}>
            { props.children ? props.children : 'Default'}
=======
import style, { button } from './index.module.css';

const Button = ({
    onClick,
    children,
    color = 'white',
    radius = '0',
    width = 'fit-content',
    height = 'fit-content',
    sidePadding = '0',
    centerPadding = '0',
    top = '0',
    bottom = '0',
    left = '0',
    right = '0',
    shadow,
    border,
    customClassName
}) => {
    return (
        <button
            className={`${button} ${shadow ? style.shadow : ''}
        ${border ? 'border' : ''} ${customClassName ? customClassName : ''}`}
            style={{
                backgroundColor: color,
                width: width,
                height: height,
                paddingLeft: sidePadding,
                paddingRight: sidePadding,
                paddingTop: centerPadding,
                paddingBottom: centerPadding,
                borderRadius: radius,
                top: top,
                bottom: bottom,
                left: left,
                right: right
            }}
            onClick={onClick}
        >
            {children ? children : 'Default'}
>>>>>>> ad1da6da832c26071ad4e27af97049fbafbfa146
        </button>
    );
};

<<<<<<< HEAD
export default Button;
=======
export default Button;
>>>>>>> ad1da6da832c26071ad4e27af97049fbafbfa146
