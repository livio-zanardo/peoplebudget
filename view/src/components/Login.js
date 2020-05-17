import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {
    HOST,
    API_PORT,
    BASE_API_URL,
    PROTOCOL,
    LOGIN_ENDPOINT } from '../constants';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnSubmit = () => {
        const requestBody = {
            'email' : email,
            'pass' : password
        };
        axios.post(`${PROTOCOL}${HOST}:${API_PORT}${BASE_API_URL}${LOGIN_ENDPOINT}`,
            requestBody, {
            withCredentials: true
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.warn(err)
            });
    }

    return(
        <Form className="login-form">
            <h3>Login</h3>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email"
                       placeholder="Email"
                       name="email"
                       onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password"
                       placeholder="Password"
                       name="password"
                       onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Button onClick={handleOnSubmit}>Login</Button>
            </FormGroup>
        </Form>
    )
}

export default Login;