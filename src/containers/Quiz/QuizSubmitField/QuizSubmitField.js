/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {UnControlled as CodeMirror} from 'react-codemirror2';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { submitCode, resetTestCaseCount } from '../../../reducer/quiz';
import { insertPoint, updatePoint, getPointByQuizId } from '../../../reducer/point';

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
  
  const { resetTestCaseCount, quizId } = props;

  // useEffect(() => {
  //   getPointByQuizId(quizId);
  // }, [getPointByQuizId, quizId]);
  const quiz = props.quizList.find((quiz) => quiz.id === quizId);

  // useEffect(() => {
  // }, [resetTestCaseCount, quiz]);


  const handleSubmit = () => {
    setSubmitting(true);
    resetTestCaseCount(quiz?.testCases?.length);
    quiz?.testCases?.forEach((e) => {
      props.submitCode(
        history,
        {
          quizId,
          sourceCode,
          input: e.input,
          output: e.output,
        }
      );
    });
  }

  return (
    <>
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
      
      <Backdrop open={isSubmitting} style={{ zIndex: 10 }}>
        <CircularProgress /> 
      </Backdrop>
    </>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
  testCase: select(state, 'quizReducer', 'testCase'),
  testCaseCount: select(state, 'quizReducer', 'testCaseCount'),

  submissions: select(state, 'submissionsReducer', 'submissions'),
  isSolving: select(state, 'submissionsReducer', 'isSolving'),

  point: select(state, 'pointReducer', 'point'),
});

const mapDispatchToProps = (dispatch) => ({
  submitCode: (history, payload) => dispatch(submitCode(history, payload)),
  resetTestCaseCount: (size) => dispatch(resetTestCaseCount(size)),

  getPointByQuizId: (id) => dispatch(getPointByQuizId(id)),
  insertPoint: (payload) => dispatch(insertPoint(payload)),
  updatePoint: (id, payload) => dispatch(updatePoint(id, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmitField));

