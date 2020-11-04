import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Nav from './Components/Nav';
import LP from "./Components/LP/LP";
import SignupForm  from './Components/Forms/SignupForm';
import Footer from './Components/Footer';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Switch>
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
