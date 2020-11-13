import { connect } from 'react-redux';
import Avatar from "../Avatar"; 

const UserProfile = ({user}) => {

    return (
        <section>
            <header>
                <Avatar size="large" />
                    <h1>{user.firstName} {user.lastName}</h1>
                    <p>{user.summary}</p>
                <div>
                    <h3>Expertise</h3>
                    <ul>
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
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(UserProfile);