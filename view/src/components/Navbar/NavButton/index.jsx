import React from 'react';
import { Link } from 'react-router-dom';
import { links } from './index.module.css';

const NavButton = ({ text, link, color }) => {
    return (
        <div className={`col-sm-auto text-center text-capitalize`}>
            <Link style={{color: color,
            }} className={`${links}`} to={link}>
                {text}
            </Link>
        </div>
    );
};

export default NavButton;
