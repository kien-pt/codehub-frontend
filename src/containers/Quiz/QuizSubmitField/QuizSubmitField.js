/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {UnControlled as CodeMirror} from 'react-codemirror2';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { setSolving } from '../../../reducer/submissions';
import { submitCode, resetTestCaseCount } from '../../../reducer/quiz';
import { insertPoint, updatePoint, getPointByQuizId } from '../../../reducer/point';

require('codemirror/theme/neat.css');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
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
  
  const { resetTestCaseCount, quizId } = props;

  const quiz = props.quizList.find((quiz) => quiz.id === quizId);

  const handleSubmit = () => {
    props.setSolving();
    resetTestCaseCount(quiz?.testCases?.length);
    quiz?.testCases?.forEach((e, id) => {
      props.submitCode(
        history,
        {
          id,
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
        <CardHeader title="Bài nộp" style={{ color: 'white', backgroundColor: '#39424E' }} />
        <CardContent>
          <CodeMirror
            value={code}
            options={{
              indentUnit: 4,
              lineNumbers: true,
              theme: 'material',
              mode: 'text/x-c++src',
            }}
            onChange={(editor, data, value) => setSourceCode(value)}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  point: select(state, 'pointReducer', 'point'),
  quizList: select(state, 'quizReducer', 'quiz'),
  testCase: select(state, 'quizReducer', 'testCase'),
  testCaseCount: select(state, 'quizReducer', 'testCaseCount'),
  submissions: select(state, 'submissionsReducer', 'submissions'),
});

const mapDispatchToProps = (dispatch) => ({
  setSolving: () => dispatch(setSolving()),
  resetTestCaseCount: (size) => dispatch(resetTestCaseCount(size)),
  submitCode: (history, payload) => dispatch(submitCode(history, payload)),

  getPointByQuizId: (id) => dispatch(getPointByQuizId(id)),
  insertPoint: (payload) => dispatch(insertPoint(payload)),
  updatePoint: (id, payload) => dispatch(updatePoint(id, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmitField));

