import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import PrivateRoute from './Components/PrivateRoute';
import Nav from './Components/Nav';
import LP from "./Components/LP/LP";
import SignupForm  from './Components/Forms/SignupForm';
import SigninForm  from './Components/Forms/SigninForm';
import UserProfile from './Components/User/UserProfile';
import Footer from './Components/Footer';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Switch>
          <PrivateRoute path="/user">
            <UserProfile />
          </PrivateRoute>
          <Route path="/signin">
            <SigninForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/">
            <LP />
          </Route>
        </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
