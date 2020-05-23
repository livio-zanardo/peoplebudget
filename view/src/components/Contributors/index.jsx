import React from 'react';
import ProfilePic from './ContributorProfile';
const faker = require('faker');

const Contributor = () => {
    const contributorArr = (profiles) => {
        return profiles.map((profile, index) => (
            <ProfilePic rounded name={faker.name.findName()} image={faker.image.avatar()} />
        ));
    };
    return (
        <div className="row">
            <div className="col-auto mx-auto">
                <div className="row">{contributorArr([1, 2, 3, 4, 5, 6])}</div>
            </div>
        </div>
    );
};
export default Contributor;
