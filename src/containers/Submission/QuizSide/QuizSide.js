import React from 'react';
import { connect } from 'react-redux';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import QuizDiscuss from '../../Quiz/QuizDiscuss';
import QuizStatistic from '../../Quiz/QuizStatistic';
import QuizSubmissions from '../../Quiz/QuizSubmissions';

function QuizSide(props) {
  const quizId = props.submission.find((e) => e.id === props.submissionId)?.quizId;

  if (quizId >= 0) return (
    <>
      <QuizSubmissions quizId={quizId} />
      <QuizStatistic quizId={quizId} />
      <QuizDiscuss quizId={quizId} />
    </>
  );
  return null;
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submission: select(state, 'submissionsReducer', 'submission'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSide));
