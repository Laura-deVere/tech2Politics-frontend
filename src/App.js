import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Nav from './Components/Nav';
import LP from "./Components/LP/LP";
import SignupForm  from './Components/Forms/SignupForm';
import SigninForm  from './Components/Forms/SigninForm';
<<<<<<< HEAD
import UserProfile from './Components/User/UserProfile';
=======
>>>>>>> ebda88406b3a5efb2e77d8e164d20287081a6239
import Footer from './Components/Footer';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Switch>
<<<<<<< HEAD
          <Route path="/user">
            <UserProfile />
          </Route>
=======
>>>>>>> ebda88406b3a5efb2e77d8e164d20287081a6239
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
