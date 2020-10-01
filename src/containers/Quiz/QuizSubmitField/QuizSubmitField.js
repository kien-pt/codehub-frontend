import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@material-ui/core';

import {UnControlled as CodeMirror} from 'react-codemirror2';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { submitCode } from '../../../reducer/quiz';

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
  const quiz = props.quizList.find((quiz) => quiz.id == props.quizId);
  const [sourceCode, setSourceCode] = useState(code);

  return (
    <Card style={{ padding: 0, marginTop: 32 }}>
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
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {
            setSourceCode(value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: '16px 0',
            width: 160,
            float: 'right',
          }}
          onClick={() => props.submitCode(sourceCode)}
        >
          Nộp bài
        </Button>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  submitCode: (sourceCode) => dispatch(submitCode(sourceCode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizSubmitField));

