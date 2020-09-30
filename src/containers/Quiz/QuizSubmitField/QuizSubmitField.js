import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  TextareaAutosize,
} from '@material-ui/core';

import Editor from '@matthamlin/react-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

const code = "#include <cstring>";

function QuizSubmitField(props) {
  const quiz = props.quizList.find((quiz) => quiz.id == props.quizId);
  console.log(quiz);

  return (
    <Card style={{ padding: 0, marginTop: 32 }}>
      <CardHeader
        title="Bài nộp"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        {/* <TextareaAutosize rowsMin={20} placeholder="Empty" style={{ minWidth:'98%', maxWidth: '98%' }} /> */}
      
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
)(toJs(QuizSubmitField));

