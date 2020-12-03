import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserMatches } from '../../actions';
import UserMatches from './UserMatches';
import UserProfileEdit from './UserProfileEdit';
import Avatar from "../Avatar"; 
import Button from '../Button';

import { userProfile, userLocation, userName } from '../../sass/UserProfile.module.scss';

const UserProfile = ({ user, userMatches, getUserMatches }) => {
    const [dataLoading, setDataLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(async () => {
        await getUserMatches(user.expertise, user.email);
        setDataLoading(false);
    },[])

    const findListItemName = (list) => {
        const name = list.map((item) => { 
            return item.name;
        });
        console.log(name)
        return name.map((item, index) => {
            return <li key={index}>{item} {index !== list.length - 1 ? ' | ' : ''}</li>
        });
    }

    return (
        <section className={userProfile}>
            <header>
                { editMode ? <UserProfileEdit user={user} /> :
                    (
                    <>
                        <Avatar size="large" />
                        <div>
                            <h1 className={userName}>{user.firstName} {user.lastName}</h1>
                            <ul>
                                { user.expertise.length > 0 ? findListItemName(user.expertise) : null }
                            </ul>
                            <p className={userLocation}>Location: <span>{user.location}</span></p>
                            <p>{user.summary}</p>
                            <div>
                                <a href={user.website}><i className="lni lni-world"></i></a>
                                <a href={user.linkedIn}><i className="lni lni-linkedin-original"></i></a>
                            </div>
                        </div>
                        <Button text="Edit Profile" onClickHandler={() => setEditMode(true)} />
                    </>
                    )
                }   
            </header>
            { !dataLoading && userMatches ? <UserMatches users={userMatches} /> : null }
        </section>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        userMatches: state.users.userMatches
    }
}

export default connect(mapStateToProps, { getUserMatches })(UserProfile);