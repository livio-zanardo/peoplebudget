import React from 'react';
import Card from '../Card/index';
import map from '../../miamiMapBW.png';
import style from './index.module.css';
import icon from '../../triangleIcon.png';

const Info = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/*LEFT COL*/}
                <div className="col-6 mx-auto p-0">
                    <img src={map}></img>
                </div>
                {/*RIGHT COL*/}
                <div className="col-6 mx-auto d-flex justify-content-center">
                    <Card
                        customClassName={style.Card}
                        transform="translate(-50%, -50%)"
                        height="100%"
                        width="100%"
                        top="50%"
                        left="50%"
                        radius="2em"
                        border
                        shadow
                    >
                        <div className="mx-auto" style={{ width: 'auto' }}>
                            <div className="row">
                                <div className="col text-center" style={{ margin: '25px' }}>
                                    {/*TITLE*/}
                                    <h3>
                                        <b>Current Top Projects Rankings</b>
                                    </h3>
                                    <hr className="HeaderHR"/>
                                    {/*LIST OF PROJECTS*/}

                                    <div className="row">
                                        <div className="col-10 text-left pl-5">
                                            <span> {/*Needs to auto-update*/}
                                                Complete Maintenance on the Metrorail
                                            </span> 
                                        </div>
                                        <div className="col-auto ml-auto pr-5">
                                            <div className="row">
                                                <div className="col-auto p-0">
                                                    <p>{/*Needs to be auto-update*/}
                                                        48
                                                    </p>
                                                </div>
                                                <div className="col-auto p-0">
                                                    <img
                                                        className="d-block"
                                                        src={icon}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                    <div className="row">
                                        <div className="col-10 text-left pl-5">
                                            <span>{/*Needs to be auto-update*/}
                                                Remodel Douglas Park Public Bathrooms
                                            </span>
                                        </div>
                                        <div className="col-auto ml-auto pr-5">
                                            <div className="row">
                                                <div className="col-auto p-0">
                                                    <p>{/*Needs to be auto-update*/}
                                                        32
                                                    </p>
                                                </div>
                                                <div className="col-auto p-0">
                                                    <img
                                                        className="d-block"
                                                        
                                                        src={icon}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Info;
