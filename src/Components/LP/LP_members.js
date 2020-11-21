import Preview from "./LP_member_preview";
import { connect } from 'react-redux';
import { lpMembers, lpMembersPreview } from '../../sass/LP.module.scss';

const Members = ({ latestUsers }) => {
    return (
        <section className={lpMembers}>
            <h2>Meet our Members</h2>
            <ul>
                {
                    latestUsers ? (
                        latestUsers.map((user, index) => {
                            return (
                                <li className={lpMembersPreview} key={`user-${index}`}>
                                    <Preview user={user} />
                                </li>
                            )
                        })
                    ) : null
                }
            </ul>
        </section>
    )
}

const mapStateToProps = state => {
    return { latestUsers: state.users.latestUsers }
}

export default connect(mapStateToProps)(Members);