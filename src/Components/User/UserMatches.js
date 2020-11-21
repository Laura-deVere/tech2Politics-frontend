import { connect } from 'react-redux';

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
            return <li>{item.name}</li>
        });
    }

    return (
        <div>
            <h3>Matches</h3>
            <ul>
                {users.map((user, index) => {
                    return (
                        <li key={index}>
                            <h4>{user.firstName} {user.lastName}</h4>
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