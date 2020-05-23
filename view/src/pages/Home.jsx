import React, { useContext } from 'react';
import Navbar from '../components/Navbar/index';
import { Context } from '../store/store';
import Contributor from '../components/Contributors/index';

const Home = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    // console.log(getMenus());
    return (
        <div className="container-fluid">
            <Navbar options={getMenus()} />
            <Contributor />
        </div>
    );
};

export default Home;
