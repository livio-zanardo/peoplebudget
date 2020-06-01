import React, { useState, useRef } from 'react';
import Input from '../Inputv2/index';
import Button from '../Button/index';
import axios from 'axios';
import { Form, FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../Card/index';
import { card, imageContainer, container } from './index.module.css';
import Mapimg from '../../miamiMap.png';

const LoginComp = () => {

    return (
        <div className={`row`} style={{ margin: 'auto' }}>
        <Card
            customClassName={`${card}`}
            height="40vw"
            radius="2em"
            width="84vw"
            border-style
        >
            <div className="row">
            <div className={`${imageContainer} col`}
                    style={{position: 'relative', backgroundImage: `url(${Mapimg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', 
                    borderRadius: '2em'}}>

                </div>
                <div className="col ml-5"
                >
                    <div className="p-3">
                        
                        <div className="row  mt-5">
                                <div className="col-sm-auto  ml-5 mb-4">
                                    <h1 className="text-capitalize">Welcome back!</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center pb-3">
                                <Link color="white" to="/register">
                                    <Button
                                      
                                        color="#ee9623"
                                        radius="5em"
                                        sidePadding="3em"
                                        centerPadding=".4em"
                                        shadow
                                    >
                                        Sign up with LinkedIn
                                    </Button>
                                </Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center pb-3">
                                    ---OR---
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-9 pb-3 ml-5">
                                    {' '}
                                    <Input
                                        name="email"
                                        className="form-control"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-9 pb-3 ml-5">
                                    {' '}
                                    <Input
                                        name="password"
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                <Link color="white" to="/register">
                                    <Button
                                        color="#ee9623"
                                        radius="5em"
                                        sidePadding="3em"
                                        centerPadding=".4em"
                                        shadow
                                    >
                                        Login
                                    </Button>
                                </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </Card>
        </div>
    );
};

export default LoginComp;
