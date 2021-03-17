import { Switch, Route, Redirect } from 'react-router';
import Main from './components/Main/Main';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Layout from './components/Layout/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'alk-life';
import 'alk-rounded-nusx-med';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
