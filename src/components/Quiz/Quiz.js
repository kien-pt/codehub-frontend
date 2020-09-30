import React from 'react';
import { Grid } from '@material-ui/core';

import QuizContent from '../../containers/Quiz/QuizContent';
import QuizSubmitField from '../../containers/Quiz/QuizSubmitField';

function Quiz(props) {
  const quizId = props.history.location.state.quizId;
  return (
    <Grid container spacing={3}>
      <Grid item md={1} xs={false} />
      <Grid item md={7} xs={12}>
        <QuizContent quizId={quizId} />
        <QuizSubmitField quizId={quizId} />
      </Grid>
      <Grid item md={3} xs={12}>
      </Grid>
      <Grid item md={1} xs={false} />
    </Grid>
  );
}

export default Quiz;
