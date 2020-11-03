import TextBoxSmall from './LP_text_box_small';

import { lpwwd } from '../../sass/LP.module.scss';

const LPWhat = () => {
    return (
        <section className={lpwwd}>
            <h2>What we do</h2>
            <ul>
                <li>
                    <TextBoxSmall header={'SME (SUBJECT MATTER EXPERTS)'}
                        copy={'Find the SME you are looking for when looking for information about the intersection of tech and politics'} />
                </li>
                <li>
                    <TextBoxSmall header={'MEMBERSHIP'}
                        copy={'Select from a list of consultants to address an issue at your local election office or organization'} />
                </li>
                <li>
                    <TextBoxSmall header={'CONNECTING WOMXN TO RESOURCES TO RUN FOR OFFICE'}
                        copy={'Connect womxn with resoources and organizations'} />
                </li>
            </ul>
        </section>
    )
}

export default LPWhat;