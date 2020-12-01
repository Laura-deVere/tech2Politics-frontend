import { connect } from 'react-redux';
import { getUserMatches } from '../../actions';
import UserMatches from './UserMatches';
import Avatar from "../Avatar"; 
import Button from '../Button';

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
        return <li key={index}>{item.name} {index !== list.length - 1 ? ' | ' : ''}</li>
        });

    }

    return (
        <section className={userProfile}>
            <header>
                <Avatar size="large" />
                <div>
                    <h1 className={userName}>{user.firstName} {user.lastName}</h1>
                    <ul>
                        { expertiseList.length !== 0 ? findListItemName(user.expertise) : null }
                    </ul>
                    <p className={userLocation}>Location: <span>{user.location}</span></p>
                    <p>{user.summary}</p>
                    <div>
                        <a href={user.website}><i className="lni lni-world"></i></a>
                        <a href={user.linkedIn}><i className="lni lni-linkedin-original"></i></a>
                    </div>
                </div>
                <Button text="Edit Profile" />
            </header>
            { !dataLoading && userMatches ? <UserMatches users={userMatches} /> : null }
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