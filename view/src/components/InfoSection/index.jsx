import React from 'react';
import Map from '../../miamiMapBW.png';
import { container, grid, map, table, triangleUp } from './index.module.css';
import icon from '../../triangleIcon.png';

const Info = () => {
    return (
        <div className={container}>
            <div className={grid}>
                <div className={map}>{/* <img src={Map}></img> */}</div>
                <div className={table}>
                    
                        {/*TITLE*/}
                        <h3>
                            <b>Current Top Projects Rankings</b>
                        </h3>
                        <hr id="HeaderHR" />

                        <div>
                            <span>
                                {/*Needs to auto-update*/}
                                Complete Maintenance on the Metrorail
                            </span>
                        </div>

                        <div>
                            <p>
                                {/*Needs to be auto-update*/}
                                48
                            </p>
                        </div>
                        <div>
                           <div className={triangleUp}></div>
                        </div>

                        <hr />

                        <div>
                            <span>
                                {/*Needs to be auto-update*/}
                                Remodel Douglas Park Public Bathrooms
                            </span>
                        </div>

                        <div>
                            <p>
                                {/*Needs to be auto-update*/}
                                32
                            </p>
                        </div>
                        <div>
                            <img src={icon} />
                        </div>

                        <hr />
                    
                </div>
            </div>
        </div>

        // {/* <div className="container">
        //         <div className="GridItems">

        //                 {/*LEFT COL*/}
        //                 <div className="firstCol">
        //                     <img src={map}></img>
        //                 </div>
        //                 {/*RIGHT COL*/}
        //                 <div className="secondCol">
        //                     <div className="card">
        //                         {Card}

        //         </div>
        //     </div>
    );
};

export default Info;
