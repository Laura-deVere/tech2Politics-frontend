import LPMain from "./LP_main";
import LPHow from './LP_how_it_works'
import Members from "./LP_members";
import LPWhat from "./LP_what";

import { landingPage } from '../../sass/LP.module.scss'

const LP = () => {
    return (
        <div className={landingPage}>
            <LPMain />
            <LPWhat />
            <LPHow />
            <Members />
        </div>
    )
}

export default LP;