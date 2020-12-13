import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import Interweave from 'interweave';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { getSubmissionsById } from '../../../reducer/submissions';
import { getQuizById } from '../../../reducer/quiz';

import QuizSubmissions from '../../Quiz/QuizSubmissions';
import QuizStatistic from '../../Quiz/QuizStatistic';
import QuizDiscuss from '../../Quiz/QuizDiscuss';

function QuizSide(props) {
  const { submissionId } = props;

  const submission = props.submission.find((e) => e.id === submissionId);

  const quizId = submission?.quizId;

  if (quizId >= 0) {
    return (
      <>
        <QuizSubmissions quizId={quizId} />
        <QuizStatistic quizId={quizId} />
        <QuizDiscuss quizId={quizId} />
      </>
    );
  }
  return null;
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submission: select(state, 'submissionsReducer', 'submission'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSide));

