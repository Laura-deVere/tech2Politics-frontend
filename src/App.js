import { useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getExpertiseList, getLatestUsersList } from './actions';
import PrivateRoute from './Components/PrivateRoute';
import Nav from './Components/Nav';
import LP from "./Components/LP/LP";
import SignupForm  from './Components/Forms/SignupForm';
import SigninForm  from './Components/Forms/SigninForm';
import UserProfile from './Components/User/UserProfile';
import UserPreview from './Components/User/UserPreview';
import Footer from './Components/Footer';

import './App.scss';

const App = ({ getExpertiseList, getLatestUsersList, currentUser }) => {
  useEffect(() => {
    getExpertiseList();
    getLatestUsersList();
  },[]);

  return (
    <div className="App">
      <Router>
      <Nav />
        <Switch>
          <Route path="/userpreview" exact component={UserPreview}/>
          <PrivateRoute path="/user" currentUser={currentUser}>
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

const mapStateToProps = state => ({ currentUser: state.auth.currentUser})

export default connect(mapStateToProps, { getExpertiseList, getLatestUsersList })(App);
