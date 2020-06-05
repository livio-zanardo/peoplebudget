import React, { useState, useRef } from 'react';
import Input from '../Inputv2/index';
import Select from '../Dropdown/index';
import Button from '../Button/index';
import axios from 'axios';
import { Form, FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../Card/index';
import { card, imageContainer, container, hr, or } from './index.module.css';
import Mapimg from '../../miamiMap.png';

const RegistrationComp = () => {

    return (
        <div className={`row`} style={{ margin: 'auto' }}>
            <Card
                customClassName={`${card}`}
                height="55vw"
                radius="4em"
                width="84vw"
                border-style
                shadow
            >
                <div className="row">
                    <div className={`${imageContainer} col`}
                        style={{
                            position: 'relative', mixBlendMode: `multiply`, backgroundImage: `url(${Mapimg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                            borderRadius: '4em',
                            height: "55vw"
                        }}>

                    </div>
                    <div className="col ml-5"
                    >
                        <div className="p-3">

                            <div className="row mt-2">
                                <div className="col-sm-auto  ml-5 mb-4">
                                    <h1 className="text-capitalize"><b>Welcome</b></h1>
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
                            <div className="row w-75 mx-auto">
                                <div className="col text-left pb-3">
                                    <div>
                                        <hr className={`${hr}`}></hr>
                                    </div>
                                </div>
                                <div className={`${or}`}>OR</div>
                                <div className="col text-left pb-3">
                                    <div>
                                        <hr className={`${hr}`}></hr>
                                    </div>
                                </div>
                            </div>
                            <div className="row mx-auto">
                                <div className="row mx-auto" >
                                    <div className="row w-50 mx-auto">
                                        <div className="col-sm-10 pb-3 ml-5">
                                            {' '}
                                            <Input
                                                name="firstName"
                                                className="form-control"
                                                type="firstName"
                                                placeholder="First Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="row w-50 mx-auto">
                                        <div className="col-sm-10 pb-3">
                                            {' '}
                                            <Input
                                                name="lastName"
                                                className="form-control"
                                                type="lastName"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="row w-100 mx-auto">
                                    <div className="col-sm-10 pb-3 ml-5">
                                        {' '}
                                        <Input
                                            name="email"
                                            className="form-control"
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="row w-100 mx-auto">
                                    <div className="col-sm-10 pb-3 ml-5">
                                        {' '}
                                        <Input
                                            name="password"
                                            className="form-control"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="row w-100 mx-auto">
                                    <div className="col-sm-10 pb-3 ml-5">
                                        {' '}
                                        <Select placeholder="Security Question"/>
                                    </div>
                                </div>
                                <div className="row w-100 mx-auto">
                                    <div className="col-sm-10 pb-4 ml-5">
                                        {' '}
                                        <Input
                                            name="answer"
                                            className="form-control"
                                            type="answer"
                                            placeholder="Answer"
                                        />
                                    </div>
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
                                            height="6vh"
                                        >
                                            Sign Up
                                    </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col text-center">
                                    <Link to="/register" style={{ color: 'grey' }}>
                                        Already a member?
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

export default RegistrationComp;
