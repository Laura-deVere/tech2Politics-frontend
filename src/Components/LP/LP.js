import LPMain from "./LP_main";
import LPHow from './LP_how_it_works'
import Members from "./LP_members";
import LPWhat from "./LP_what";

const LP = () => {
    return (
        <div className="landing-page">
            <LPMain />
            <LPWhat />
            <LPHow />
            <Members />
        </div>
    )
}

export default LP;