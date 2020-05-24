import React from 'react';
import image from '../../AirlinesArena.jpg';

const Overview = () => {
    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-7">
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
