import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MAP_KEY } from '../../constants/constants';

const Map = (props) => {
    console.log(process.env.MAPS);
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '97vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: MAP_KEY }}
                defaultCenter={{
                    lat: 25.77,
                    lng: -80.22
                }}
                defaultZoom={11}
            >
                {props.children}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
