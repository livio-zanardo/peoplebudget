import React from 'react';
import Card from '../Card/index';
import { Link } from 'react-router-dom';
import Button from '../Button/index';
import mapImg from '../../miamiMap.png';
import { registration, card } from './index.module.css';

const Registration = () => {
    return (
        <div className={`row  ${registration}`}>
            <div className="col-12">
                <img src={mapImg} alt="Map of Miami" />
            </div>
            <Card
                customClassName={card}
                top="50%"
                left="50%"
                radius="2em"
                border
                shadow
            >
                <div className="mx-auto p-3" style={{ width: 'auto' }}>
                    <div className="row">
                        <div className="col text-center">
                            <h1>People Budget</h1>
                            <p>
                                <b>A civic enagement process for educating Miamians on budgeting</b>
                            </p>
                        </div>
                    </div>
                    <Link color="white" to="/register">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};
export default Registration;
