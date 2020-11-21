import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import Search from './Search';
import Button from './Button';

import { nav } from '../sass/Nav.module.scss';

const Nav = ({ user, signOut }) => {
    return (
        <nav className={nav}>
            <span><Link to="/">Tech2Politics</Link></span>
            <ul>
                {
                    user ? (
                    <>
                    <li>
                        <Search />
                    </li>
                    <li>    
                        <Link to="/user">
                            Profile
                        </Link>
                    </li>
                    <li>    
                        <Link to="/">
                            <Button text={'SIGN OUT'} onClickHandler={() => signOut(user.email)} />
                        </Link>
                    </li></>) : (
                        <>
                        <li>
                            <Link to="/signup">
                                <Button text={'JOIN NOW'} />
                            </Link>
                        </li>    
                        <li>
                            <Link to="/signin">
                                <Button text={'LOG IN'} />
                            </Link>
                        </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, { signOut })(Nav);