import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { matchesList, matchesPreview } from '../../sass/UserProfile.module.scss';
import Avatar from '../Avatar';

const UserMatches = ({ users, expertiseList }) => {

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
                                   findListItemName(user.expertise)
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