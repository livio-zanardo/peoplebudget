import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar/index';
import RegistrationComp from '../components/RegistrationComp';

const Register = () => {
    

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100%' }}>
                <div className="col border-0  p-0 vh-100" 
                 >
                    {/* <img src={Mapimg} className="w-100 vh-100"  /> */}
                </div>
                <div className="col-sm-11 ">
                    <Navbar
                        options={[
                            { text: 'home', link: '/', auth: 0 },
                            { text: 'login', link: '/login', auth: 0 }
                        ]}
                    />
                    <RegistrationComp />
                    
                    
                        
                </div>
            </div>
            </div>
    );
};

export default Register;
