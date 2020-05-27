import React from 'react';
import { Link } from 'react-router-dom';
import { links } from './index.module.css';

const NavButton = ({ text, link, color }) => {
    return (
        <div className={`col-sm-auto text-center text-capitalize`}>
            
            <Link className={`${links}`} to={link}>
            <h6 className='p-2 mx-1 font-weight-bold '>
                {text}
                </h6>
            </Link>
            
            
        </div>
    );
};

export default NavButton;
