import React, { useState } from 'react';
import style from './index.module.css';

const Input = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const onChangeHandler = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={`${style.container}`}>
            <label className={`${style.label}`} forhtml={`${props.name}`}>
                {props.label}
            </label>
            <input
                className={`${style.input}`}
                name={`${props.name}`}
                id={`${props.name}`}
                value={searchTerm}
                type={`${props.type}`}
                placeholder={props.placeHolder}
                onChange={onChangeHandler}
            ></input>
        </div>
    );
};

export default Input;
