import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTER from '../../constant/router';

import Home from '../Home';
import Quiz from '../Quiz';
import User from '../User';
import Manager from '../Manager';
import Courses from '../Courses';
import InsertQuiz from '../InsertQuiz';
import UpdateQuiz from '../UpdateQuiz';
import Submission from '../Submission';
import AppHeader from '../../containers/AppLayout/AppHeader';


function AppLayout() {
  return (
    <>
      <AppHeader />
      <div style={{ padding: '96px 24px 0' }}>
        <Switch>
          <Route path={ROUTER.USER} component={User} />
          <Route exact path={ROUTER.HOME} component={Home} />
          <Route path={ROUTER.COURSES} component={Courses} />
          <Route path={ROUTER.MANAGER} component={Manager} />
          <Route path={ROUTER.SUBMISSION} component={Submission} />
          <Route path={ROUTER.UPDATE_QUIZ} component={UpdateQuiz} />
          <Route exact path={ROUTER.NEW_QUIZ} component={InsertQuiz} />
          <Route path={ROUTER.QUIZ} component={Quiz} />
        </Switch>
      </div>
    </>
  );
}

export default AppLayout;
