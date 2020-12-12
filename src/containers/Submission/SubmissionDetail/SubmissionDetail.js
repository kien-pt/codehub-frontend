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

  const submission = props.submissions?.find((e) => e.id === submissionId);
  const quiz = props.quizList.find((e) => e.id === submission?.quizId);

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

        <Divider style={{ marginTop: 16}}/>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Test Case</TableCell>
                <TableCell align="center">Tình trạng</TableCell>
                <TableCell align="center">Input</TableCell>
                <TableCell align="center">Output của bạn</TableCell>
                <TableCell align="center">Output đúng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submission?.quiz.testCases.map((row, index) => (
                <TableRow
                  key={`row${index}`}
                  style={{
                    color: 'rgb(51 51 51 / 50%)',
                    backgroundColor: row.get === row.want ? 'rgb(170 255 170 / 50%)' : 'rgb(250 170 170 / 50%)'
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.get === row.want ? <CheckRounded /> : <CloseRounded />}</TableCell>
                  <TableCell align="center">{index === 0 ? quiz?.testCase[index].input : 'Đã bị ẩn'}</TableCell>
                  <TableCell align="center">{index === 0 ? row.get : 'Đã bị ẩn'}</TableCell>
                  <TableCell align="center">{index === 0 ? row.want : 'Đã bị ẩn'}</TableCell>
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
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submissions: select(state, 'submissionsReducer', 'submissions'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(SubmissionDetail));

