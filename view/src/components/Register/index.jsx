import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Registration = () => {
    return (
        <>
            <div className="row">
                <div className="col-3 border">
                    <div className="row">
                        <div className="col">
                            <h1 className="text-center">People Budget</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            A civic engagement process for educating Mimians on budgeting
                        </div>
                    </div>
                    <div className="row">
                        <div className="col ">
                            <Link to="/register">
                                <Button />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
