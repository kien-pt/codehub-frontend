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

function QuizContent(props) {
  const { getQuizById, getSubmissionsById, submissionId } = props;

  useEffect(() => {
    getSubmissionsById(submissionId);
  }, [getSubmissionsById, submissionId]);

  const submission = props.submission.find((e) => e.id === submissionId);

  const quiz = submission?.quiz;

  const point = submission?.point;
  var status = 'finish';
  if (point === 0) status = 'fail';
  if (point === 100) status = 'success';

  return (
    <Card>
      <CardHeader
        title={quiz?.title}
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <span style={{ color: (status === 'finish') ? '#F8941D' : (status === 'fail') ? '#B94A48' : '#82B74B', fontSize: 24, fontWeight: 'bold' }}>
          {
            (status === 'finish')
            ? 'Đúng một phần'
            : (status === 'fail') ? 'Sai' : 'Đúng'
          }
        </span>
        <span style={{ color: '#808080', fontSize: 24, fontWeight: 'bold' }}>
          {` - Đạt điểm ${point}/100`}
        </span>
        <Divider style={{ marginBottom: 8 }} />
        <Interweave content={quiz?.content} />
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submission: select(state, 'submissionsReducer', 'submission'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getSubmissionsById: (id) => dispatch(getSubmissionsById(id)),
  getQuizById: (id) => dispatch(getQuizById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizContent));

