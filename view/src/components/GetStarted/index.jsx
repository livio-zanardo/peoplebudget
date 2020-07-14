import React from 'react';
import Card from '../Card/index';
import { Link } from 'react-router-dom';
import mapImg from '../../miamiMap.png';
import { card, imageContainer, container } from './index.module.css';

const GetStarted = () => {
    return (
        <div className={`row p-0`} style={{ margin: 'auto' }}>
            <div className={`${imageContainer} col-12 p-0`} style={{ position: 'relative', backgroundImage: `url(${mapImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        
            </div>
            <div className={`col-5 ${container} my-auto`} style={{ position: 'relative', height: '0px' }}>
                
                <Card customClassName={`${card}`} left="50vw" radius="2em" border shadow>
                    <div className="p-3">
                        <div className="row">
                            <div className="col text-center">
                                <h1
                                        style={{
                                            color: '#104953',
                                            marginTop: '0px',
                                            marginBottom: '10px'
                                        }}
                                    ><b>People Budget</b></h1>
                                <hr style={{ width: '100%', borderTop: '2px solid #ee9623' }} />
                                <p>
                                    <b>
                                        A civic engagement process for educating Miamians on
                                        budgeting
                                    </b>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <Link color="white" to="/register">
                                <button
                                className="button"
                            >
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default GetStarted;
