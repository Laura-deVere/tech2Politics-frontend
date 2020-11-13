import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { connect } from 'react-redux';

function PrivateRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.id ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}
export default connect(mapStateToProps)(PrivateRoute);