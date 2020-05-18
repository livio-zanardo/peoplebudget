import React, { useState, useRef } from 'react';
import Input from './Input/index';

const Home = () => {
    const [value, setValue] = useState('');
    const nameForm = useRef(null);
    /*
    const handleSubmit = (event) => {
        alert('An essay was submitted: ' + value);
        event.preventDefault();
        console.log(value.term);
    };
    */
    const handleClickEvent = () => {
        const form = nameForm.current;
        alert(`${form['Pmail'].value} ${form['Password'].value}`);
    };
    return (
        <div>
            <h1>Home Page</h1>
            <form ref={nameForm}>
                <Input name={'Email'} label="Email" placeHolder={'Email'} type={'text'} />
                <Input name={'Password'} placeHolder={'Password'} type={'email'} />
            </form>
            <button onClick={handleClickEvent}>submit</button>
        </div>
    );
};

export default Home;
