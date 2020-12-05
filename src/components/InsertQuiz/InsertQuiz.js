import React from 'react';
import { Grid } from '@material-ui/core';

import InsertQuizForm from '../../containers/InsertQuiz/InsertQuizForm';

function InsertQuiz() {
  const temp = window.location.href.split('/');
  const quizId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
      </Grid>
      <Grid item lg={7} md={8} xs={12}>
        <InsertQuizForm />
      </Grid>
    </Grid>
  );
}

export default InsertQuiz;
