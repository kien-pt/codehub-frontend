import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CheckRounded, CloseRounded } from '@material-ui/icons';
import {Controlled as CodeMirror} from 'react-codemirror2';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/clike/clike.js');

function SubmissionDetail(props) {
  const history = useHistory();

  const temp = window.location.href.split('/');
  const submissionId = parseInt(temp[temp.length - 1]);

  const submission = props.submission?.find((e) => e.id === submissionId);

  const quiz = submission?.quiz;

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Bài nộp"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
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
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submission: select(state, 'submissionsReducer', 'submission'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(SubmissionDetail));

