import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ROUTER from './constant/router';

import AppLayout from './components/AppLayout';

import './index.css';

const App = () => (
  <Router>
    <Switch>
      <Route path={ROUTER.HOME} component={AppLayout} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
