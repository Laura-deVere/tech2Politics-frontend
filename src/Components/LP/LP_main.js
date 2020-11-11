import Button from "../Button";
import img from '../../images/wocintechchat.jpg';
import { lpmain, overlay, image } from '../../sass/LP.module.scss';

const LPMain = () => {
    return (
        <section className={lpmain}>
            <div>
                <p>Tech2Politics aims to equip and support aspiring womxn politicians to build successful technology-based campaigns. A platform created by progressive womxn, for progressive womxn who seek to bridge the intersection of politics, policy, and tech.</p>
                <ul>
                    <li><Button text="JOIN NOW"/></li>
                    <li><Button text="LOG IN"/></li>
                </ul>
            </div>
            <div className={image}>
                <div className={overlay}>
                    <img src={img} alt="Two women sitting on a windowsil talking" />
                </div>
            </div>
        </section>
    )
}

export default LPMain;