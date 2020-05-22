import React from 'react';

const Card = ({
    children,
    radius = '0',
    width = '0',
    height = '0',
    top = '0',
    bottom = '0',
    left = '0',
    right = '0',
    shadow,
    border
}) => {
    return (
        <div
            className={`p-1 ${shadow ? 'shadow' : ''}
             ${border ? 'border' : ''}`}
            style={{
                backgroundColor: 'white',
                borderRadius: radius,
                width: width,
                height: height,
                top: top,
                bottom: bottom,
                left: left,
                right: right,
                position: 'relative'
            }}
        >
            {children}
        </div>
    );
};

export default Card;
