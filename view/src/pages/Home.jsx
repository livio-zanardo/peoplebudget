import React, { useContext } from 'react';
import Navbar from '../components/Navbar/index';
import { Context } from '../store/store';
import Contributor from '../components/Contributors/index';
import { home } from './Home.module.css';
import Overview from '../components/Overview';
import Registration from '../components/Registration';

const Home = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    // console.log(getMenus());
    return (
        <div className={`${home} container-fluid`}>
            <Navbar options={getMenus()} />
            <Registration />
            <Overview />
            <Contributor />
        </div>
    );
};

export default Home;
