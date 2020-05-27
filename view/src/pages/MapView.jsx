import React, { useState } from 'react';
import Comments from '../components/CommentPanel/index';
import Map from '../components/Map/index';
import Marker from '../components/Map/Marker/index';
import Navbar from '../components/Navbar/index';

const MapView = () => {
    return (
        <div className="container-fluid">
            <Navbar />
            <div className="row">
                <div className="col-12 mx-auto">
                    <div className="row">
                        <div className="col-6">
                            <Comments />
                        </div>
                        <div className="col-6 p-0">
                            <Map>
                                <Marker lat={25.77} lng={-80.22} title="Fix roadsFix roadsFix roadsFix roadsFix roadsFix roads">
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Perspiciatis nesciunt eum cum nemo repellendus, optio alias
                                        architecto voluptas neque, officiis sequi. Explicabo odit,
                                        officia sit error assumenda impedit? Necessitatibus,
                                        ducimus!
                                    </div>
                                </Marker>
                                <Marker lat={25.88} lng={-80.22} title="Fix roads">
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Perspiciatis nesciunt eum cum nemo repellendus, optio alias
                                        architecto voluptas neque, officiis sequi. Explicabo odit,
                                        officia sit error assumenda impedit? Necessitatibus,
                                        ducimus!
                                    </div>
                                </Marker>
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
