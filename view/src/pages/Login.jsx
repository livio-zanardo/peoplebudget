import React, { useState, useRef } from 'react';
import Input from '../components/Input/index';
import Button from '../components/Button/index';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar/index';

const Login = () => {

    const [value, setValue] = useState('');
    const nameForm = useRef(null);

    let history = useHistory();

    const handleClickEvent = () => {
        const form = nameForm.current;
        //alert(`${form['email'].value} ${form['password'].value}`);
        history.push("/proposals");
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100%' }}>
                <div className="col-sm-4 border-0 bg-light p-0">
                    <img src="https://via.placeholder.com/400x1200" className="w-100 vh-100" />
                </div>
                <div className="col-sm-8 ">
                    <Navbar options={[{ text: 'home', link: '/', auth: 0 }, { text: 'register', link: '/register', auth: 0 }]}/>
                    <div
                        className=""
                        style={{ position: 'relative', top: '25vh', bottom: '50vh', left: '10vh' }}
                    >
                        <div className="col-sm-8 border-0 ml-5 mt-5 p-3">
                            <div className="row  mt-5">
                                <div className="col-sm-auto  ml-5 mb-4">
                                    <h1 className="text-capitalize">Welcome back!</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col pb-3">
                                    {' '}
                                    <Input
                                        className="form-control"
                                        type="email"
                                        placeHolder="Email"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col pb-3">
                                    {' '}
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeHolder="Password"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 ml-auto align-self-end">
                                <Button className="btn btn-block btn-primary" onClick={handleClickEvent}>login</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
