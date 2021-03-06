import React from 'react';
import { Grid } from '@material-ui/core';

import QuizSide from '../../containers/Submission/QuizSide';
import SubmissionQuiz from '../../containers/Submission/SubmissionQuiz';
import SubmissionDetail from '../../containers/Submission/SubmissionDetail';

function Quiz(props) {
  const temp = window.location.href.split('/');
  const submissionId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={7} md={8} xs={12}>
        <SubmissionQuiz submissionId={submissionId} />
        <SubmissionDetail submissionId={submissionId} /> 
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        <QuizSide submissionId={submissionId} />
      </Grid>
    </Grid>
  );
}

export default Quiz;
