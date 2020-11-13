import img from '../../images/wit2.jpeg';

import { lphow } from '../../sass/LP.module.scss';

const LPHow = () => {
    return (
        <section className={lphow}>
            <img src={img} alt='needs alt text' />
            <div>
                <div>
                    <h2>
                        How does it work?
                    </h2>
                    <p>
                        Tech2Politics created to help you take the guesswork out of building a tech-forward team to support your policies and political campaign. Much like a professional matchmaking service, Tech2Politics is powered by extensive data that will pair you up with qualified tech experts. Members reap the benefits of having 24/7 access to an array of technologists, developers, digital strategists and more.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LPHow;