import React from 'react';

const Card = ({
    children,
    radius = '0',
    width = 'fit-content',
    height = 'fit-content',
    top = '0',
    bottom = '0',
    left = '0',
    right = '0',
    shadow,
    border,
    customClassName
}) => {
    return (
        <div
            className={`p-1 ${shadow ? 'shadow' : ''}
             ${border ? 'border' : ''} ${customClassName ? customClassName : ''}`}
            style={{
                backgroundColor: 'white',
                borderRadius: radius,
                width: width,
                height: height,
                top: top,
                bottom: bottom,
                left: left,
                right: right,
            }}
        >
            {children}
        </div>
    );
};

export default Card;
