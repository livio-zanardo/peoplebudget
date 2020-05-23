import React from 'react';
import { Link } from 'react-router-dom';
import { links } from './index.module.css';

const NavButton = ({ text, link }) => {
    return (
        <div className={`col-sm-auto text-center text-capitalize`}>
            <h6 className='p-2 mx-1 font-weight-bold'>
            <Link className={`${links}`} to={link}>
                {text}
            </Link>
            </h6>
            
        </div>
    );
};

export default NavButton;
