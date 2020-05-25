import React, { useState, useRef } from 'react';
import Input from '../components/Input/index';
import Button from '../components/Button/index';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar/index';

const Login = () => {
    const [value, setValue] = useState('');
    const nameForm = useRef(null);

    const history = useHistory();

    const handleClickEvent = () => {
        const form = nameForm.current;
        history.push('/proposals');
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '100%' }}>
                <div className="col-sm-4 border-0 bg-light p-0">
                    <img src="https://via.placeholder.com/400x1200" className="w-100 vh-100" />
                </div>
                <div className="col-sm-8 ">
                    <Navbar
                        options={[
                            { text: 'home', link: '/', auth: 0 },
                            { text: 'register', link: '/register', auth: 0 }
                        ]}
                    />
                    <div
                        className=""
                        style={{ position: 'relative', top: '20vh', bottom: '50vh', left: '10vh' }}
                    >
                        <div className="col-sm-8 border-0 ml-5 p-3">
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
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col pb-3">
                                    {' '}
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 ml-auto align-self-end">
                                    <Button
                                        className="btn btn-block btn-primary"
                                        onClick={handleClickEvent}
                                    >
                                        Login
                                    </Button>
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
