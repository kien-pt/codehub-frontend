import React from 'react';
import { Grid } from '@material-ui/core';

import HomeRank from '../../containers/Home/HomeRank';
import QuizList from '../../containers/Courses/QuizList';
import CourseStatistic from '../../containers/Courses/CourseStatistic';

function Courses() {
  const temp = window.location.href.split('/');
  const courseId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={7} md={8} xs={12}>
        <QuizList courseId={courseId} />
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        <HomeRank courseId={courseId} disabled={true} />
        <CourseStatistic courseId={courseId} />
      </Grid>
    </Grid>
  );
}

export default Courses;
