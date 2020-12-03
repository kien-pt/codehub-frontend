import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTER from '../../constant/router';

import AppHeader from '../../containers/AppLayout/AppHeader';
import Home from '../Home';
import Courses from '../Courses';
import Quiz from '../Quiz';
import Submission from '../Submission';
import Manager from '../Manager';

function AppLayout() {
  return (
    <>
      <AppHeader />
      <div style={{ padding: '96px 24px 0' }}>
        <Switch>
          <Route exact path={ROUTER.HOME} component={Home} />
          <Route path={ROUTER.COURSES} component={Courses} />
          <Route path={ROUTER.QUIZ} component={Quiz} />
          <Route path={ROUTER.SUBMISSION} component={Submission} />
          <Route path={ROUTER.MANAGER} component={Manager} />
        </Switch>
      </div>
    </>
  );
}

export default AppLayout;
