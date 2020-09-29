import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTER from '../../constant/router';

import AppHeader from '../../containers/AppLayout/AppHeader';
import Home from '../Home';
import Courses from '../Courses';

function AppLayout() {
  return (
    <>
      <AppHeader />
      <div style={{ padding: '96px 24px 0', height: '100%', backgroundColor: '#F3F7F7' }}>
        <Switch>
          <Route exact path={ROUTER.HOME} component={Home} />
          <Route path={ROUTER.COURSES} component={Courses} />
        </Switch>
      </div>
    </>
  );
}

export default AppLayout;
