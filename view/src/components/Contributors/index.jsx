import React from 'react';
import ProfilePic from './ContributorProfile';
const faker = require('faker');

const Contributor = () => {
    const contributorArr = (profiles) => {
        return profiles.map((profile, index) => (
            <ProfilePic name={faker.name.findName()} image={faker.image.avatar()} />
        ));
    };
    return (
        <>
            <div className="row" style={{margin: 'auto'}}>
                <div className="col p-4" style={{backgroundColor: '#084652'}}>
                     <p className='text-center' style={{color: '#DCDCDC', fontSize:'120%'}}>Top Contributors of City of Miami</p> 
                     <div className="row">
                         <div className="col-auto mx-auto"> 
                            <div className="row">{contributorArr([1, 2, 3, 4])}</div> 
                        </div> 
                    </div> 
                </div>
            </div>
        </>
    );
};
export default Contributor;
