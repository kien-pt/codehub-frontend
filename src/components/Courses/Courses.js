import React from 'react';
import { Grid } from '@material-ui/core';

import QuizList from '../../containers/Courses/QuizList';

function Courses() {
  const temp = window.location.href.split('/');
  const courseId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={7} md={8} xs={12}>
        <QuizList courseId={courseId} />
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
      </Grid>
    </Grid>
  );
}

export default Courses;
