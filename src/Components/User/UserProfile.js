import { connect } from 'react-redux';
import { getUserMatches } from '../../actions';
import UserMatches from './UserMatches';
import Avatar from "../Avatar"; 

import { userProfile, expertiseListStyle, userLocation, userName } from '../../sass/UserProfile.module.scss';
import { useEffect, useState } from 'react';

const UserProfile = ({ user, expertiseList, userMatches, getUserMatches }) => {
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(async () => {
        await getUserMatches(user.expertise);
        setDataLoading(false);
        console.log(dataLoading)
    },[])

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
                        { expertiseList.length !== 0 ? findListItemName(user.expertise) : null }
                    </ul>
                </div>
            </header>
            { !dataLoading && userMatches ? <UserMatches users={userMatches} /> : null }
            {/* <UserMatches users={userMatches} /> */}
        </section>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.auth.user,
        userMatches: state.users.userMatches,
        expertiseList: state.expertiseList
    }
}

export default connect(mapStateToProps, { getUserMatches })(UserProfile);