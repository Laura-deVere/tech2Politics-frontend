import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

function PrivateRoute({ currentUser, children, ...rest }) {
        console.log(children)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          currentUser ? (
            children
          ) : (
            <Redirect
              push to={{
                pathname: "/signin",
                state: { referrer: location }
              }}
            />
          )
        }
      />
    );
}
 
export default PrivateRoute;