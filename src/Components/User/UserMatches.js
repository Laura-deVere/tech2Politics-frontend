import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { matchesList, matchesPreview } from '../../sass/UserProfile.module.scss';
import Avatar from '../Avatar';

const UserMatches = ({ users, expertiseList }) => {

    const renderList = (list) => {
        const name = list.map((item) => { 
            return item.name;
        });

        return name.map((item, index) => {
            return <li key={index}>{item}</li>
        });
    }

    return (
        <div className={matchesList}>
            <h3>Matches</h3>
            <ul>
                {users.map((user, index) => {
                    return (
                        <li key={index} className={matchesPreview}>
                            <Avatar size={`small`} />
                            <Link to={{
                                pathname: "/userpreview",
                                state: { data: user }
                            }}>
                            <h4>{user.firstName} {user.lastName}</h4>
                            </Link>
                            <h5>Area of expertise:</h5>
                            <ul>
                                {
                                   renderList(user.expertise)
                                }
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        expertiseList: state.expertiseList
    }
}

export default connect(mapStateToProps)(UserMatches);