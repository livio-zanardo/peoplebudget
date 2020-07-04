import React from 'react';
import Card from '../Card/index';
import { Link } from 'react-router-dom';
import Button from '../Button/index';
import { card, imageContainer, container, wrapper, text } from './index.module.css';

const GetStarted = () => {
    return (

        <div className={`${imageContainer}`}>
            <div className={`${wrapper}`}>
                <Card className={`${card}`} radius="2em">
                    <div className={`${text}`}>
                        <h1>People Budget</h1>
                        <hr style={{ width: '100%', borderTop: '2px solid #ee9623' }} />
                        <p>
                            <b>
                                A civic engagement process for educating Miamians on
                                budgeting
                            </b>
                        </p>
                        <Link color="white" to="/register">
                            <Button

                                color="#ee9623"
                                radius="5em"
                                sidePadding="1em"
                                centerPadding=".4em"
                                shadow
                            >
                            Get Started
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>

        </div>
    );
};
export default GetStarted;
