import { connect } from 'react-redux';
import Avatar from "../Avatar"; 
import Button from '../Button';

import { userProfile, userLocation, userName } from '../../sass/UserProfile.module.scss';

const UserPreview = (props) => {
    const user = props.location.state.data;
    const expertiseList = props.expertiseList;

    const renderList = (list) => {
        const name = list.map((item) => item.name );
        return name.map((item, index) => {
            return <li key={index}>{item} {index !== list.length - 1 ? ' | ' : ''}</li>
        });
    }

    return (
        <section className={userProfile}>
            <header>
                <Avatar size="large" />
                <div>
                    <h1 className={userName}>{user.firstName} {user.lastName}</h1>
                    <ul>
                        { expertiseList.length !== 0 ? renderList(user.expertise) : null }
                    </ul>
                    <p className={userLocation}>Location: <span>{user.location}</span></p>
                    <p>{user.summary}</p>
                    <div>
                        <a href={user.website} target="_blank" rel="noreferrer"><i className="lni lni-world"></i></a>
                        <a href={user.linkedIn} target="_blank" rel="noreferrer"><i className="lni lni-linkedin-original"></i></a>
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