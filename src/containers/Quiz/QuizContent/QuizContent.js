import React, { useEffect } from 'react';
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

import { getQuizById } from '../../../reducer/quiz';

function QuizContent(props) {
  const { getQuizById, quizId } = props;

  useEffect(() => {
    getQuizById(quizId);
  }, [getQuizById, quizId]);

  const quiz = props.quizList.find((quiz) => quiz.id === quizId);

  return (
    <Card>
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
  getQuizById: (id) => dispatch(getQuizById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizContent));

