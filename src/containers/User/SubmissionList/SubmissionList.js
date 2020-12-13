import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getAllQuiz } from '../../../reducer/quiz';
import { getSubmissionsByUserId } from '../../../reducer/submissions';

function SubmissionList(props) {
  const { profileId, getAllQuiz, getSubmissionsByUserId } = props;
  // const userId = parseInt(localStorage.getItem("userId"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    getAllQuiz();
    getSubmissionsByUserId(profileId);
  }, [getAllQuiz, getSubmissionsByUserId, profileId]);

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title="Bảng chấm bài"
        style={{ backgroundColor: '#39424E', height: 32 }}
      />
      <CardContent style={{ color: 'black' }}>
      <TableContainer component={Paper} style={{ marginTop: 12 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>ID</b></TableCell>
                  <TableCell align="center"><b>Bài tập</b></TableCell>
                  <TableCell align="center"><b>Điểm</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.submissions.slice(rowsPerPage * page, rowsPerPage * (page + 1)).map((submission) => {
                  const quiz = props.quizList.find((quiz) => quiz.id === submission.quizId);
                  return (
                  <TableRow key={submission.id}>
                    <TableCell align="center"><Link href={`${ROUTER.SUBMISSION}/${submission.id}`}>{`#${submission.id}`}</Link></TableCell>
                    <TableCell align="center"><Link href={`${ROUTER.QUIZ}/${quiz?.id}`}>{quiz?.title}</Link></TableCell>
                    <TableCell align="center">{`${submission.point}/100`}</TableCell>
                  </TableRow>
                  )
                })}
                <TableRow>
                  <TablePagination
                    page={page}
                    rowsPerPageOptions={[5]}
                    rowsPerPage={rowsPerPage}
                    count={props.submissions.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />  
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  submissions: select(state, 'submissionsReducer', 'submissions'),
});

const mapDispatchToProps = (dispatch) => ({
  getAllQuiz: () => dispatch(getAllQuiz()),
  getSubmissionsByUserId: (id) => dispatch(getSubmissionsByUserId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(SubmissionList));
