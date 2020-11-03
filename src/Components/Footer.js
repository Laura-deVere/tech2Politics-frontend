import { footer, copyright } from '../sass/Footer.module.scss'

const Footer = () => {
    return (
        <footer className={footer}>
            <div>
                <span>Tech2Politics</span>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Mission</a></li>
                    <li><a href="#">Membership</a></li>
                </ul>
            </div>
            <div className={copyright}>© 2020 Tech2Politics, All Rights Reserved</div>
        </footer>
    )
}

export default Footer;