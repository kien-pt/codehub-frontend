import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Button,
} from '@material-ui/core';
import Interweave from 'interweave';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

function QuizDiscuss(props) {
  const quiz = props.quizList.find((quiz) => quiz.id == props.quizId);

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thảo luận"
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
)(toJs(QuizDiscuss));

