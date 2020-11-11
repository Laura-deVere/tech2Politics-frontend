import { Link } from 'react-router-dom';

import Button from './Button';

import { nav } from '../sass/Nav.module.scss';

const Nav = () => {
    return (
        <nav className={nav}>
            <span><Link to="/">Tech2Politics</Link></span>
            <ul>
                <li>
                    <Link to="/signup">
                        <Button text={'JOIN NOW'} />
                    </Link>
                </li>    
                <li>
                    <Link to="/signin">
                        <Button text={'SIGN IN'} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;