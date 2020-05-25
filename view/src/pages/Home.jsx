import React, { useContext } from 'react';
import Navbar from '../components/Navbar/index';
import { Context } from '../store/store';
import Contributor from '../components/Contributors/index';
import Overview from '../components/Overview';
import Registration from '../components/Registration';
import Info from '../components/Info Section/Info';

const Home = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    return (
        <div className={`p-0 container-fluid`}>
            <Navbar options={getMenus()} />
            <Registration />
            <Overview />
            <Contributor />
            <Info />
        </div>
    );
};

export default Home;
