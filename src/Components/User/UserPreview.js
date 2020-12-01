import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from "../Avatar"; 
import Button from '../Button';

import { userProfile, userLocation, userName } from '../../sass/UserProfile.module.scss';

const UserPreview = (props) => {
    console.log(props.location.state.data)
    const user = props.location.state.data;
    const expertiseList = props.expertiseList;
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
                <Button text="Connect" />
            </header>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        expertiseList: state.expertiseList
    }
}

export default connect(mapStateToProps)(UserPreview);