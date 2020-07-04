import React from 'react';
import Card from '../Card/index';
import { Link } from 'react-router-dom';
import Button from '../Button/index';
import { card, imageContainer, wrapper, text, hr, button } from './index.module.css';

const GetStarted = () => {
    return (

        <div className={`${imageContainer}`}>
            <div className={`${wrapper}`}>
                <Card className={`${card}`} radius="2em">
                    <div className={`${text}`}>
                        <h1>People Budget</h1>
                        <hr className={`${hr}`} />
                        <p>
                            <b>
                                A civic engagement process for educating Miamians on
                                budgeting
                            </b>
                        </p>
                        <div className={`${button}`}>
                            <Link color="white" to="/register">
                                <Button
                                    width="65%"
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


                    </div>
                </Card>
            </div>

        </div>
    );
};
export default GetStarted;
