import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../Navbar/index';
import Input from '../Inputv2/index';
import Button from '../Button/index';

import { container, nav, map, right, loginForm } from './index.module.css';

const LoginComponent = (props) => {
    const nameForm = useRef(null);

    const history = useHistory();

    const handleClickEvent = () => {
        const form = nameForm.current;
        //alert(`${form['email'].value} ${form['password'].value}`);
        history.push('/proposals');
    };

    return (
        <div className={`${container}`}>
            <div className={`${nav}`}>
                <Navbar
                    options={[
                        { text: 'home', link: '/', auth: 0 },
                        { text: 'register', link: '/register', auth: 0 }
                    ]}
                />
            </div>
            <div className={`${map}`} />
            <div className={`${loginForm}`}>
                <div className="row  mt-5">
                    <div className="col-sm-auto  ml-5 mb-4">
                        <h1 className="text-capitalize">Welcome back!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8 pb-3">
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
                    <div className="col-sm-8 pb-3">
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
                    <div className="col-4 ml-auto" style={{ left: '-33%' }}>
                        {/* <Button
                        className="btn btn-block active"
                        onClick={handleClickEvent}
                    >
                        Login
                    </Button> */}

                        <Button
                            color="#ee9623"
                            radius=".6em"
                            sidePadding="1em"
                            centerPadding=".4em"
                            width="15vw"
                            height="6vh"
                            onClick={handleClickEvent}
                            shadow
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
