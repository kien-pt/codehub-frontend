import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './redux/store';

import ROUTER from './constant/router';

import AppLayout from './components/AppLayout';

import './index.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={ROUTER.HOME} component={AppLayout} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
