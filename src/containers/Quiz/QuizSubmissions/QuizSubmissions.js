import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from '@material-ui/core';

import './QuizSubmissions.css';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getQuizById } from '../../../reducer/quiz';
import { getSubmissionsByQuizId } from '../../../reducer/submissions';

function QuizSubmissions(props) {
  const { quizId, getQuizById, getSubmissionsByQuizId } = props;

  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    getQuizById(quizId);
    getSubmissionsByQuizId(quizId);
  }, [getQuizById, getSubmissionsByQuizId, quizId]);

  const yourSubmissions = props.submissions.filter((submission) => submission.userId === userId)

  return (
    <Card>
      <CardHeader
        title="Các lần bạn nộp"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent style={{ minHeight: 150, maxHeight: 150, overflow: 'auto' }}>
        {yourSubmissions.map((submission, index) => {
          const point = submission?.point;
          var status = 'finish';
          if (point === 0) status = 'fail';
          if (point === 100) status = 'success';
          return (
            <Link
              key={`submission${submission?.id}`}
              to={{
                pathname: `${ROUTER.SUBMISSION}/${submission?.id}`,
                state: { quizId: quizId, submissionId: submission?.id },
              }}
              style={{ textDecoration: 'none' }}
            >
              <Grid className={`quizSubmission ${status}`} container >
                <Grid item xs={6}>#{yourSubmissions.length - index}</Grid>
                <Grid item xs={6}><div style={{ float: 'right' }}>{point}/100</div> </Grid>
              </Grid>
            </Link>
          )
        })}
      </CardContent>
      <CardActions style={{ height: 8 }} />
    </Card>
  );
}

const mapStateToProps = (state) => ({
  submissions: select(state, 'submissionsReducer', 'submissions'),
});

const mapDispatchToProps = (dispatch) => ({
  getQuizById: (id) => dispatch(getQuizById(id)),
  getSubmissionsByQuizId: (id) => dispatch(getSubmissionsByQuizId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmissions));

