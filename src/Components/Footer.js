import { Link } from 'react-router-dom';
import { footer, copyright } from '../sass/Footer.module.scss'

const Footer = () => {
    return (
        <footer className={footer}>
            <div>
                <span><Link to="/">Tech2Politics</Link></span>
                <ul>
                    <li><a href="www.google.com">About</a></li>
                    <li><a href="www.google.com">Mission</a></li>
                    <li><a href="www.google.com">Membership</a></li>
                </ul>
            </div>
            <div className={copyright}>© 2020 Tech2Politics, All Rights Reserved</div>
        </footer>
    )
}

export default Footer;