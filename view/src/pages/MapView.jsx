import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar/index';
import MapViewComp from '../components/MapView/index'
import { Context } from '../store/store';

const MapView = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    return (
        <main className="container-fluid">
            <Navbar options={getMenus()} />
            <MapViewComp />
        </main>
    );
};

export default MapView;
