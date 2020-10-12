import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@material-ui/core';

import './QuizSubmissions.css';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getSubmissionsByQuizId } from '../../../reducer/submissions';

function QuizSubmissions(props) {
  const { getSubmissionsByQuizId } = props;

  useEffect(() => {
    getSubmissionsByQuizId(props.quizId);
  }, [getSubmissionsByQuizId, props.quizId]);

  return (
    <Card>
      <CardHeader
        title="Các lần bạn nộp"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        {props.submissions.map((submission) => {
          var point = 0;
          submission.testCase.map((e) => point += (e.get === e.want) ? 1 : 0);
          point = ((point / submission.testCase.length) * 100).toFixed(0);
          var status = 'finish';
          if (point === 0) status = 'fail';
          if (point === 100) status = 'success';
          return (
            <Link
              to={{
                pathname: `${ROUTER.SUBMISSION}/${submission.id}`,
                state: { quizId: props.quizId, submissionId: submission.id },
              }}
              style={{ textDecoration: 'none' }}
            >
              <Grid
                className={`quizSubmission ${status}`}
                container
              >
                <Grid item xs={6}>#{submission.id}</Grid>
                <Grid item xs={6}>
                  <div style={{ float: 'right' }}>{point}/100</div>
                </Grid>
              </Grid>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  submissions: select(state, 'submissionsReducer', 'submissions'),
  isFetching: select(state, 'submissionsReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getSubmissionsByQuizId: (id) => dispatch(getSubmissionsByQuizId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmissions));

