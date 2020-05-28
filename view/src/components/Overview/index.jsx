import React from 'react';
import Card from '../Card/index';
import { cardPosition, overview } from '../Overview/index.module.css';
import image from '../../AirlinesArena.jpg';

const Overview = () => {
    return (
        <div className="row p-0" style={{margin: 'auto'}}>
            <div className={`  col-4 p-0`}></div>
            <div className="col-8 p-0" style={{ height: '60vh',backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'relative'}}>
                
            </div>
            <div style={{ position: 'relative', height: '0px'}}>
                .
                <Card
                    customClassName={cardPosition}
                    // min-height="100vh"
                    width="40vw"
                    top="-50vh"
                    bottom="50vh"
                    left="10vw"
                    radius="2em"
                    border
                    shadow
                >
                    <div className="mx-auto p-3" style={{ width: 'auto' }}>
                        <div className="row">
                            <div
                                className="col text-center"
                                style={{
                                    // fontSize: '2vw',
                                    // fontSize: '2.5vh',
                                    overflow: 'hidden',
                                    height: '30vh',
                                    // letterSpacing: '0.03rem'
                                }}
                            >
                                <h3 style={{
                                            color: '#104953',
                                            marginTop: '0px',
                                            marginBottom: '5px'
                                       
                                     }}>
                                    <b>About People Budget</b>
                                </h3>
                                <p>
                                    
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Quasi tempore totam vel dolorum modi commodi perferendis
                                        impedit nisi rerum excepturi necessitatibus, recusandae
                                        voluptatum unde, facilis, eum voluptatibus adipisci cumque
                                        deserunt. Lorem ipsum dolor sit amet consectetur adipisicing. 
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    
                                   
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Overview;
