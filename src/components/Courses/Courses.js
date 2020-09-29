import React from 'react';
import { Grid } from '@material-ui/core';

import QuizList from '../../containers/Courses/QuizList';

function Courses(props) {
  const courseId = props.history.location.state.courseId;
  return (
    // <QuizList courseId={courseId} />
    <Grid container spacing={3}>
      <Grid item md={1} xs={0} />
      <Grid item md={7} xs={12}>
        <QuizList courseId={courseId} />
      </Grid>
      <Grid item md={3} xs={12}>
      </Grid>
      <Grid item md={1} xs={0} />
    </Grid>
  );
}

export default Courses;
