import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import Interweave from 'interweave';

import './index.css';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getQuizById } from '../../../reducer/quiz';

function QuizContent(props) {
  const history = useHistory();
  const { getQuizById, quizId } = props;

  useEffect(() => {
    getQuizById(quizId).then((res) => {if (!res) history.push(ROUTER.ERROR)}).catch();
  }, [getQuizById, history, quizId]);

  const quiz = props.quizList.find((quiz) => quiz.id === quizId);

  return (
    <Card>
      <CardHeader
        title={quiz?.title}
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
});

const mapDispatchToProps = (dispatch) => ({
  getQuizById: (id) => dispatch(getQuizById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizContent));

