import React, { useContext } from 'react';
import { Context } from '../store/store';
import Navbar from '../components/Navbar/index';
import Registration from '../components/Registration';
import Overview from '../components/Overview';
import Contributor from '../components/Contributors/index';
import Info from '../components/Info Section/Info';
import Footer from '../components/Footer/Footer'

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
            <Footer/>
        </div>
    );
};

export default Home;
