import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar/index';
import LoginComp from '../components/LoginComp';

const Login = () => {
    

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100%' }}>
                <div className="col border-0  p-0 vh-100" 
                >
                </div>
                <div className="col-sm-11 ">
                    <Navbar
                        options={[
                            { text: 'home', link: '/', auth: 0 },
                            { text: 'register', link: '/register', auth: 0 }
                        ]}
                    />
                    <LoginComp />
                    
                    
                        
                </div>
            </div>
            </div>
    );
};

export default Login;
