import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
} from '@material-ui/core';
import { CheckRounded, CloseRounded } from '@material-ui/icons';
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
  
  const detail = props.detail?.got.replace('[', '').replace(']', '').split(',');

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
        
        <Divider style={{ marginTop: 16}}/>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Test Case</b></TableCell>
                <TableCell align="center"><b>Tình trạng</b></TableCell>
                <TableCell align="center"><b>Input</b></TableCell>
                <TableCell align="center"><b>Output của bạn</b></TableCell>
                <TableCell align="center"><b>Output đúng</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submission?.quiz?.testCases.map((row, index) => (
                <TableRow
                  key={`row${index}`}
                  style={{
                    color: 'rgb(51 51 51 / 50%)',
                    backgroundColor: row.output === (detail?.length > index ? detail[index] : '') ? 'rgb(170 255 170 / 50%)' : 'rgb(250 170 170 / 50%)'
                  }}
                >
                  <TableCell align="center">{`#${index + 1}`}</TableCell>
                  <TableCell align="center">{row.output === (detail?.length > index ? detail[index] : '') ? <CheckRounded /> : <CloseRounded />}</TableCell>
                  <TableCell align="left">{row.input.split('\n').map((e) => (<>{e}<br/></>))}</TableCell>
                  <TableCell align="left">{detail?.length > index ? detail[index].split('\n').map((e) => (<>{e}<br/></>)) : ''}</TableCell>
                  <TableCell align="left">{row.output.split('\n').map((e) => (<>{e}<br/></>))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  detail: select(state, 'submissionsReducer', 'detail'),
  submission: select(state, 'submissionsReducer', 'submission'),
  isFetchingQuiz: select(state, 'quizReducer', 'isFetching'),
  isFetchingSubmissions: select(state, 'submissionsReducer', 'isFetching'),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(SubmissionDetail));

