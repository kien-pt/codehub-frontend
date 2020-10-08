import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTER from '../../constant/router';

import AppHeader from '../../containers/AppLayout/AppHeader';
import Home from '../Home';
import Courses from '../Courses';
import Quiz from '../Quiz';
import Submission from '../Submission';

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
        </Switch>
      </div>
    </>
  );
}

export default AppLayout;
