import React from 'react';

const Login = () => {
    return (
        <div className="row" style={{ height: '100%' }}>
            <div className="col-sm-4 border bg-light p-0">
                <img src="https://via.placeholder.com/250x700" className="img-fluid" />
            </div>
            <div className="col-sm-8 ">
                <div className="row  mt-5">
                    <div className="col-sm-auto  ml-5"><h1 className='text-capitalize'>welcome back,</h1></div>
                </div>
                <div className="row">
                    <div className="col-sm-8 border ml-5 mt-5 p-3">
                        <div className="row">
                            <div className="col pb-2">
                                {' '}
                                <input className="form-control" type="email" placeholder="email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col pb-2">
                                {' '}
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="password"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mr-auto">
                                <button className="btn btn-block btn-primary">login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
