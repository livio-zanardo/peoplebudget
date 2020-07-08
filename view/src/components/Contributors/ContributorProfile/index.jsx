import React from 'react';
import { profileImg, profile, profileName } from '../ContributorProfile/index.module.css';

const ProfilePic = ({ image, name }) => {
    return (
        <div className={profile}>
            <img className={profileImg} alt="avatar" src={image} />
            <div className={profileName}>{name}</div>
        </div>

        // <div className="col-auto p-1 ">
        //     <div className="row m-0">
        //         <div className="col  mx-auto" style={{ maxWidth: '60%' }}>
        //             <img
        //                 className={`${rounded ? 'rounded-circle' : ''}  d-block mx-auto img-fluid`}
        //                 alt="avatar"
        //                 src={image}
        //             />
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col text-center p-3 " style={{color: '#DCDCDC' }}>{name}</div>
        //     </div>
        // </div>
    );
};

export default ProfilePic;
