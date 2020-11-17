import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getExpertiseList } from '../../actions';
import Avatar from "../Avatar"; 

import { userProfile, expertiseListStyle, userLocation, userName } from '../../sass/UserProfile.module.scss';

const UserProfile = ({ user, expertiseList }) => {
    const [listLength, updateListLength] = useState(expertiseList.length);

    useEffect(() => {
        if(listLength === 0) getExpertiseList();
        updateListLength(expertiseList.length);
    },[listLength]);

    const findListItemName = (list) => {
        const name = list.map((item) => { 
            return expertiseList.find(el => { 
                if (el._id === item) { 
                    return el;
                } 
            });
        });

        return name.map((item, index) => {
            return <li key={index}>{item.name}</li>
        });

    }
    return (
        <section className={userProfile}>
            <header>
                <Avatar size="large" />
                    <h1 className={userName}>{user.firstName} {user.lastName}</h1>
                    <p className={userLocation}>{user.location}</p>
                    <p>{user.summary}</p>
                    <div>
                        <a href={user.website}><i className="lni lni-world"></i></a>
                        <a href={user.linkedIn}><i className="lni lni-linkedin-original"></i></a>
                    </div>
                <div>
                    <h3>Expertise</h3>
                    <ul className={expertiseListStyle}>
                        { expertiseList.length ? findListItemName(user.expertise) : null }
                        {/* { findListItemName(user.expertiseList)} */}
                    </ul>
                </div>
            </header>
        </section>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.auth.user,
        expertiseList: state.expertiseList
    }
}

export default connect(mapStateToProps, { getExpertiseList })(UserProfile);