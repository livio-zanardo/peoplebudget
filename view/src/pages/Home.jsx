import React, { useContext } from 'react';
import Navbar from '../components/Navbar/index';
import { Context } from '../store/store';
import Overview from '../components/OverViewInfo/index';
import Contributor from '../components/Contributors/index'
import Registration from '../components/Register';


const Home = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    // console.log(getMenus());
    return (
        <div className="container-fluid">
            <Navbar options={getMenus()} />
            <Registration/>
            <Overview />
            <Contributor />
        </div>
    );
};

export default Home;
