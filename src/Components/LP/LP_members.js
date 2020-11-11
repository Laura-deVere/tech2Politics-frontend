import Preview from "./LP_member_preview";

import { lpMembers, lpMembersPreview } from '../../sass/LP.module.scss';

const Members = () => {
    return (
        <section className={lpMembers }>
            <h2>Meet our Members</h2>
            <ul>
                <li className={lpMembersPreview}><Preview /></li>
                <li className={lpMembersPreview}><Preview /></li>
                <li className={lpMembersPreview}><Preview /></li>
                <li className={lpMembersPreview}><Preview /></li>
            </ul>
        </section>
    )
}

export default Members;