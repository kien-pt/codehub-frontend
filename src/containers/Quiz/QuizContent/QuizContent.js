import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import Interweave from 'interweave';

import './index.css';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function QuizContent(props) {
  const quiz = props.quizList.find((quiz) => quiz.id == props.quizId);

  return (
    <Card style={{ padding: 0 }}>
      <CardHeader
        title={quiz?.name}
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <Interweave content={quiz?.content} />
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
)(toJs(QuizContent));

