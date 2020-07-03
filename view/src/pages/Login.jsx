import React, { useState, useRef} from 'react';
import Navbar from '../components/Navbar/index';
import LoginComponent from '../components/LoginComponent/index';

const Login = () => {
   // const [value, setValue] = useState('');
   // const nameForm = useRef(null);

  //  const history = useHistory();
/*
    const handleClickEvent = () => {
        const form = nameForm.current;
        //alert(`${form['email'].value} ${form['password'].value}`);
        history.push('/proposals');
    };
*/
    return (
        // <div className={`p-0 container-fluid`}>
        //         <Navbar
        //             options={[
        //                 { text: 'home', link: '/', auth: 0 },
        //                 { text: 'register', link: '/register', auth: 0 }
        //             ]}
        //         />
        <LoginComponent/>
        // </div>
    );
};

export default Login;
