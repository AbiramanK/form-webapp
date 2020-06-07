import React from 'react';
import {
  ToastContainer
} from 'react-toastify';
import logo from './logo.svg';
import './App.css';
import {
        Login , 
        Register,
        EthicsCommitte,
        SiteInfo,
        AdminView,
        UserView
} from './screens/Forms/index'

import { BrowserRouter as Router ,
          Route,
          Switch,
          Link
} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}  />
        <Route path='/register' component={Register} />
        <Route path='/site-info' component={SiteInfo} />
        <Route path='/ethics-com' component={EthicsCommitte} />
        <Route path='/userview' component={UserView} /> 
        <Route path='/adminview' component={AdminView} /> 
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
