import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import Button from './Button';

import { nav } from '../sass/Nav.module.scss';

const Nav = ({ auth, signOut }) => {
    return (
        <nav className={nav}>
            <span><Link to="/">Tech2Politics</Link></span>
            <ul>
                {
                    auth.user && auth.user.id ? (
                    <li>
                        <Link to="/">
                            <Button text={'SIGN OUT'} onClickHandler={() => signOut(auth.user.email)} />
                        </Link>
                    </li>) : (
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
        auth: state.auth
    }
}
export default connect(mapStateToProps, { signOut })(Nav);