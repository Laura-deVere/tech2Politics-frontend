import { connect } from 'react-redux';
import Avatar from "../Avatar"; 

import { userProfile, expertiseList, userLocation, userName } from '../../sass/UserProfile.module.scss';

const UserProfile = ({user}) => {

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
                    <ul className={expertiseList}>
                        {user.expertise.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                </div>
            </header>
        </section>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(UserProfile);