import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {Controlled as CodeMirror} from 'react-codemirror2';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

require('codemirror/theme/neat.css');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/clike/clike.js');

function SubmissionDetail(props) {
  const history = useHistory();

  const { isFetchingQuiz, isFetchingSubmissions } = props; 

  const temp = window.location.href.split('/');
  const submissionId = parseInt(temp[temp.length - 1]);

  const submission = props.submission?.find((e) => e.id === submissionId);

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader title="Bài nộp" style={{ color: 'white', backgroundColor: '#39424E' }}/>
      <CardContent>
        <CodeMirror
          value={submission?.sourceCode}
          options={{
            mode: 'text/x-c++src',
            theme: 'material',
            lineNumbers: true
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
              onClick={() => history.push(`${ROUTER.QUIZ}/${submission?.quizId}`)}
            >
              Làm lại
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Backdrop open={isFetchingQuiz || isFetchingSubmissions} style={{ zIndex: 10 }}><CircularProgress /></Backdrop>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submission: select(state, 'submissionsReducer', 'submission'),
  isFetchingQuiz: select(state, 'quizReducer', 'isFetching'),
  isFetchingSubmissions: select(state, 'submissionsReducer', 'isFetching'),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(SubmissionDetail));

