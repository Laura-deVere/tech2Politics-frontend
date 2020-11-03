import Button from './Button';

import { nav } from '../sass/Nav.module.scss';

const Nav = () => {
    return (
        <nav className={nav}>
            <span>Tech2Politics</span>
            <ul>
                <li><Button text={'JOIN NOW'} /></li>
                <li><Button text={'SIGN IN'} /></li>
            </ul>
        </nav>
    )
}

export default Nav;