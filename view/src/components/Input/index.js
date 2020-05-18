import React, { useRef, useEffect, useState } from 'react';
import style from './index.module.css';
//import idGenerator from '../../helpers/IdGenerator';

const Input = (props) => {
    // States
    const [value, setValue] = useState('');

    // Generator
    //const gen = idGenerator('input', 0);
    //let id = gen.next().value;

    // Handlers
    const onChangeHandler = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={`${style.container}`}>
            <label className={`${style.label}`} forHtml={`${props.name}`}>
                {props.label}
            </label>
            <input
                className={`${style.input}`}
                name={`${props.name}`}
                id={`${props.name}`}
                value={value}
                type={`${props.type}`}
                placeholder={props.placeHolder}
                onChange={onChangeHandler}
            ></input>
        </div>
    );
};

export default Input;
