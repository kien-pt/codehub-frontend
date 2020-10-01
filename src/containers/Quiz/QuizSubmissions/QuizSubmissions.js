import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import Interweave from 'interweave';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function QuizSubmissions(props) {
  const quiz = props.quizList.find((quiz) => quiz.id == props.quizId);

  return (
    <Card>
      <CardHeader
        title="Các lần bạn nộp"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmissions));

