import React from 'react';
import Style from './index.module.css';
import icon from '../../triangleIcon.png';

const TopButton = () => {
    return (
        <div className={Style.button}>
            <a href="#top">
                <img
                    
                    style={Style.img}
                    src={icon}
                    alt=""
                />
            </a>
        </div>
    );
};

export default TopButton;
