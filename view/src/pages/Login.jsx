import React, { useState, useRef } from 'react';
import Input from '../components/Inputv2/index';
import Button from '../components/Button/index';
import axios from 'axios';
import { Form, FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import Mapimg from '../miamiMapFaded.png';
import LoginComp from '../components/LoginComp';

const Login = () => {
    

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
