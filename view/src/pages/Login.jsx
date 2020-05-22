import React, { useState, useRef } from 'react';
import Input from '../components/Input/index';
import Button from '../components/Button/index';
import { useHistory } from 'react-router-dom';


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
        <div className="row" style={{ height: '100%' }}>
            <div className="col-sm-4 border bg-light p-0">
                <img src="https://via.placeholder.com/250x700" className="img-fluid" />
            </div>
            <div className="col-sm-8 ">
                <div className="row  mt-5">
                    <div className="col-sm-auto  ml-5"><h1 className='text-capitalize'>welcome back,</h1></div>
                </div>
                <div className="row">
                    <div className="col-sm-8 border ml-5 mt-5 p-3">
                    <form ref={nameForm}>
                        <div className="row">
                            <div className="col pb-2">
                                {' '}
                                
                                <Input name = {'email'}
                                className="form-control" type="email" placeholder="email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col pb-2">
                                {' '}
                                <Input
                                    name={'password'}
                                    className="form-control"
                                    type="password"
                                    placeholder="password"
                                />
                            </div>
                        </div>
                        </form>
                        <div className="row">
                            <div className="col mr-auto">
                                <Button className="btn btn-block btn-primary" onClick={handleClickEvent}>login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
