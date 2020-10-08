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

function QuizContent(props) {
  const temp = window.location.href.split('/');
  const submissionId = temp[temp.length - 1];

  useEffect(() => {
    props.getSubmissionsById(submissionId);
  }, []);

  const submission = props.submissions.find((e) => e.id === submissionId);
  const quiz = props.quizList.find((e) => e.id === submission?.quizId);

  var point = 0;
  if (submission) submission.testCase.map((e) => point += (e.get === e.want) ? 1 : 0);
  point = ((point / submission?.testCase.length) * 100).toFixed(0);
  var status = 'finish';
  if (point === 0) status = 'fail';
  if (point === 100) status = 'success';

  return (
    <Card>
      <CardHeader
        title={quiz?.name}
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <span style={{ color: (status === 'finish') ? '#F8941D' : (status === 'fail') ? '#82B74B' : '#B94A48', fontSize: 24, fontWeight: 'bold' }}>
          {
            (status === 'finish')
            ? 'Đúng một phần'
            : (status === 'fail') ? 'Sai' : 'Đúng'
          }
        </span>
        <span style={{ color: '#808080', fontSize: 24, fontWeight: 'bold' }}>
          {` - Đạt điểm ${point}/100`}
        </span>
        <Divider />
        <Interweave content={quiz?.content} />
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submissions: select(state, 'submissionsReducer', 'submissions'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getSubmissionsById : (id) => dispatch(getSubmissionsById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizContent));

