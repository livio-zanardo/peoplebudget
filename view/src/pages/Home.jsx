import React, { useContext } from 'react';
import Navbar from '../components/Navbar/index';
import { Context } from '../store/store';
import Contributor from '../components/Contributors/index';
import Overview from '../components/Overview';
import Registration from '../components/Registration';
import { home } from './Home.module.css';
import Info from '../components/Info Section/Info';

const Home = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    return (
        <div className={`${home} container-fluid`}>
            <Navbar options={getMenus()} />
            <Registration />
            <Overview />
            <Contributor />
            <Info />
        </div>
    );
};

export default Home;
