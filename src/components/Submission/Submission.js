import React from 'react';
import { Grid } from '@material-ui/core';

import SubmissionQuiz from '../../containers/Submission/SubmissionQuiz';
import SubmissionDetail from '../../containers/Submission/SubmissionDetail';

function Quiz(props) {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={7} md={8} xs={12}>
        <SubmissionQuiz />
        <SubmissionDetail /> 
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        {/* <QuizSubmissions quizId={quizId} />
        <QuizDiscuss quizId={quizId} /> */}
      </Grid>
    </Grid>
  );
}

export default Quiz;