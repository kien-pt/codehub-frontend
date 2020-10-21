import React from 'react';
import { Grid } from '@material-ui/core';

import QuizContent from '../../containers/Quiz/QuizContent';
import QuizSubmitField from '../../containers/Quiz/QuizSubmitField';
import QuizSubmissions from '../../containers/Quiz/QuizSubmissions';
import QuizDiscuss from '../../containers/Quiz/QuizDiscuss';

function Quiz() {
  const temp = window.location.href.split('/');
  const quizId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={7} md={8} xs={12}>
        <QuizContent quizId={quizId} />
        <QuizSubmitField quizId={quizId} />
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        <QuizSubmissions quizId={quizId} />
        <QuizDiscuss quizId={quizId} />
      </Grid>
    </Grid>
  );
}

export default Quiz;
