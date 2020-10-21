/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {UnControlled as CodeMirror} from 'react-codemirror2';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router'; 

import { submitCode, resetTestCaseCount } from '../../../reducer/quiz';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/clike/clike.js');

const code = `#include <iostream>

using namespace std;

int main()
{
	cout << "Hello World" << endl;
	return 0;
}
`;

function QuizSubmitField(props) {
  const history = useHistory();

  const [sourceCode, setSourceCode] = useState(code);
  const [isSubmitting, setSubmitting] = useState(false);

  const temp = window.location.href.split('/');
  const quizId = temp[temp.length - 1];

  const quiz = props.quizList.find((quiz) => quiz.id === quizId);

  const handleSubmit = () => {
    setSubmitting(true);
    props.resetTestCaseCount(quiz?.testCase?.length);
    quiz?.testCase?.forEach((e) => props.submitCode(quizId, sourceCode, e.input, e.output));
  }

  if (isSubmitting && props.testCaseCount === 0 && props.isSolving === false) {
    setSubmitting(false);
    history.push(`${ROUTER.SUBMISSION}/${props.submissions[props.submissions.length - 1].id + 1}`);
  }

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Bài nộp"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <CodeMirror
          value={code}
          options={{
            mode: 'text/x-c++src',
            theme: 'material',
            lineNumbers: true,
            indentUnit: 4,
          }}
          onChange={(editor, data, value) => {
            setSourceCode(value);
          }}
        />
        <Grid container justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{
                margin: '16px 0',
                width: 160,
                float: 'right',
              }}
              onClick={() => handleSubmit()}
            >
              Nộp bài
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
  testCaseCount: select(state, 'quizReducer', 'testCaseCount'),

  submissions: select(state, 'submissionsReducer', 'submissions'),
  isSolving: select(state, 'submissionsReducer', 'isSolving'),
});

const mapDispatchToProps = (dispatch) => ({
  submitCode: (quizId, sourceCode, input, output) => dispatch(submitCode(quizId, sourceCode, input, output)),
  resetTestCaseCount: (size) => dispatch(resetTestCaseCount(size)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmitField));

