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

function PrivateRoute({ auth, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user && auth.user.id ? (
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
        auth: state.auth
    }
}
export default connect(mapStateToProps)(PrivateRoute);