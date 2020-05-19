import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router'

import {
    HOST,
    PORT,
    BASE_API_URL,
    PROTOCOL,
    SIGNUP_ENDPOINT } from '../constants/constants';


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
            'fname' : firstName,
            'lname' : lastName,
            'email' : email,
            'linkedinurl' : linkedin,
            'address1' : address1,
            'address2' : address2,
            'zip' : zip,
            'securityQuestion' : securityQuestion,
            'pass' : password,
            'recover' : recoveryPassword
        };
        axios({
            method: 'post',
            url: `${PROTOCOL}${HOST}:${PORT}${BASE_API_URL}${SIGNUP_ENDPOINT}`,
            data: requestBody
        })
            .then((res) => {
                if(res.status === 201) {
                    setSignedUp(true);
                }
            })
            .catch((err) => {
                //TODO: Add returning of the error message to the client
                console.log(err)
            });
    }

    if(signedUp) {
        return(
            <Redirect to="/" />
        )
    }
    return(
        <Form className="signup-form">
            <h3>Sign Up</h3>
            <FormGroup>
                <Label>First Name</Label>
                <Input type="text"
                       placeholder="First Name"
                       name="first-name"
                       onChange={e => setFirstName(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input type="text"
                       placeholder="Last Name"
                       name="last-name"
                       onChange={e => setLastName(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email"
                       placeholder="Email"
                       name="email"
                       onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Linkedin</Label>
                <Input type="text"
                       placeholder="Linkedin"
                       name="linkedin"
                       onChange={e => setLinkedin(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Address</Label>
                <Input type="text"
                       placeholder="address"
                       name="address"
                       onChange={e => setAddress1(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Additional Address</Label>
                <Input type="text"
                       placeholder="additional address"
                       name="additional-address"
                       onChange={e => setAddress2(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Zip Code</Label>
                <Input type="text"
                       placeholder="Zip Code"
                       name="zip"
                       onChange={e => setZip(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password"
                       placeholder="Password"
                       name="password"
                       onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Recovery Password</Label>
                <Input type="password"
                       placeholder="Recovery Password"
                       name="password"
                       onChange={e => setRecoveryPassword(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Security Question</Label>
                <Input type="text"
                       placeholder="Security Question"
                       name="security-question"
                       onChange={e => setSecurityQuestion(e.target.value)}/>
            </FormGroup>

            <FormGroup>
                <Button onClick={handleOnSubmit}>Sign Up</Button>
            </FormGroup>
        </Form>
    )
}

export default UserRegistration;