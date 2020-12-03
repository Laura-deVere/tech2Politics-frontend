import { connect } from 'react-redux';
import Avatar from "../Avatar";

const Preview = ({ user, expertiseList }) => {
    const { firstName, lastName, expertise } = user;
    return (
        <>
            <Avatar size='small' />
            <h3>{firstName} {lastName}</h3>
            <span>{expertise[0].name}</span>
        </>
    )
}

const mapStateToProps = state => {
    return { expertiseList: state.expertiseList }
}

export default connect(mapStateToProps)(Preview);