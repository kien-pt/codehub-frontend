import React from 'react';
import { Grid } from '@material-ui/core';

import InsertQuizForm from '../../containers/InsertQuiz/InsertQuizForm';
import InsertQuizSetting from '../../containers/InsertQuiz/InsertQuizSetting';
import InsertQuizTestCase from '../../containers/InsertQuiz/InsertQuizTestCase';

function InsertQuiz(props) {
  const temp = window.location.href.split('/');
  const courseId = props.location?.state?.courseId;

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
        <InsertQuizSetting courseId={courseId} />
        <InsertQuizTestCase />
      </Grid>
      <Grid item lg={7} md={8} xs={12}>
        <InsertQuizForm />
      </Grid>
    </Grid>
  );
}

export default InsertQuiz;
