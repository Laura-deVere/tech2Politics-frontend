import { connect } from 'react-redux';
import Avatar from "../Avatar";

const Preview = ({ user, expertiseList }) => {
    const { firstName, lastName, expertise } = user;
    const findExpertiseName = (expertiseId) => {
        let name;
        
        expertiseList.find(el => { 
                if (el._id === expertiseId) { 
                    name = el.name;
                } 
        });

        return name;
    }
    return (
        <>
            <Avatar size='small' />
            <h3>{firstName} {lastName}</h3>
            <span>{findExpertiseName(expertise[0])}</span>
        </>
    )
}

const mapStateToProps = state => {
    return { expertiseList: state.expertiseList }
}

export default connect(mapStateToProps)(Preview);