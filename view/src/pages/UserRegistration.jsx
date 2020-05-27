import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router';
import Input from '../components/Inputv3/index';
import Button from '../components/Button/index';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/index';

import { HOST, PORT, BASE_API_URL, PROTOCOL, SIGNUP_ENDPOINT } from '../constants/constants';

const UserRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [zip, setZip] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [password, setPassword] = useState('');
    const [recoveryPassword, setRecoveryPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false);

    const handleOnSubmit = () => {
        const requestBody = {
            fname: firstName,
            lname: lastName,
            email: email,
            linkedinurl: linkedin,
            address1: address1,
            address2: address2,
            zip: zip,
            securityQuestion: securityQuestion,
            pass: password,
            recover: recoveryPassword
        };
        axios({
            method: 'post',
            url: `${PROTOCOL}${HOST}:${PORT}${BASE_API_URL}${SIGNUP_ENDPOINT}`,
            data: requestBody
        })
            .then((res) => {
                if (res.status === 201) {
                    setSignedUp(true);
                }
            })
            .catch((err) => {
                //TODO: Add returning of the error message to the client
                console.log(err);
            });
    };

    if (signedUp) {
        return <Redirect to="/" />;
    }
    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100%' }}>
                <div className="col-sm-4 border-0 bg-light p-0">
                    <img src="https://via.placeholder.com/400x1200" className="w-100 vh-100" />
                </div>
                <div className="col-sm-8">
                    <Navbar
                        options={[
                            { text: 'home', link: '/', auth: 0 },
                            { text: 'Login', link: '/login', auth: 0 }
                        ]}
                    />
                    <div className="col-lg mt-2 pl-3 bg-light rounded p-4 pr-5" style={{ top: '10vh',left: '-40vh', width: '90vw' }}>
                        {' '}
                        {/*form div*/}
                        <div className="row">
                            <div className="col h2">Sign Up</div>
                            <div className="col-3 mr-auto">
                                <a href="https://www.linkedin.com/home">
                                    <Button className="btn btn-info">LinkedIn log in</Button>
                                </a>
                            </div>
                        </div>
                        <div className="row mx-auto mt-5">
                            <FormGroup className="col-sm-5 ">
                                <Input
                                    type="text"
                                    placeholder="First Name"
                                    name="first-name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="col-sm-5 ">
                                <Input
                                    type="text"
                                    placeholder="Last Name"
                                    name="last-name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="row mx-auto mt-2">
                            <FormGroup className="col-md-6">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4">
                                <Input
                                    type="text"
                                    placeholder="LinkedIn"
                                    name="linkedIn"
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="row mx-auto mt-2">
                            <FormGroup className="col-md-5">
                                <Input
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    onChange={(e) => setAddress1(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup className="col-md-4">
                                <Input
                                    type="text"
                                    placeholder="Address 2"
                                    name="address-2"
                                    onChange={(e) => setAddress2(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-2">
                                <Input
                                    type="text"
                                    placeholder="Zip"
                                    name="zip"
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <div className="row mx-auto mt-2">
                            <FormGroup className="col-md-5">
                                <Input
                                    type="password"
                                    placeholder="Recovery Password"
                                    name="password"
                                    onChange={(e) => setRecoveryPassword(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-5">
                                <Input
                                    type="text"
                                    placeholder="Security Question"
                                    name="security-question"
                                    onChange={(e) => setSecurityQuestion(e.target.value)}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <div className="d-flex justify-content-center">
                                <div className="col-4 mt-2">
                                    <div className="row">
                                        <Button className="btn btn-block" onClick={handleOnSubmit}>
                                            Sign Up
                                        </Button>
                                    </div>
                                    <div className="row mt-2 d-flex justify-content-center">
                                        <Link to="/login">Already a Member?</Link>
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegistration;
