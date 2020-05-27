import React from 'react';
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
        </button>
    );
};

export default Button;
