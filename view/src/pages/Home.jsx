import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import { Context } from '../store/store';
import Overview from '../components/OverViewInfo/index';
import Contributor from '../components/Contributors/index'

const Home = () => {
    const {
        actions: { getMenus }
    } = useContext(Context);
    // console.log(getMenus());
    return (
        <div className="container-fluid">
            <Navbar options={getMenus()} />
            <div className="row border">
                <div className="col border mx-auto p-5">
                    <div>
                        <Link to="/register">Get Started</Link>
                    </div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis illum quisquam
                    iste ullam minima mollitia eveniet et laudantium temporibus. Culpa cum vitae
                    placeat? Est amet laudantium unde perferendis consequuntur veritatis.
                </div>
            </div>
            <Overview />
            <Contributor />
        </div>
    );
};

export default Home;
