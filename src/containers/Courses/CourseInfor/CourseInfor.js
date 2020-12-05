import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormControl,
  OutlinedInput,
  Snackbar,
  Divider,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentTurnedIn, AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import InsertTagModal from '../../Manager/InsertTagModal';

import { insertCourse } from '../../../reducer/courses';

function CourseInfor(props) {
  const [isInserting, setInserting] = useState(false);

  const handleClick = (inserting) => {
    setInserting(inserting);
  }

  return (
    <>
      <Card style={{ marginTop: 32 }}>
        <CardHeader
          title="Thống kê"
          style={{ color: 'white', backgroundColor: '#39424E' }}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={10}>Tổng số lượng bài tập:</Grid>
            <Grid item xs={2} style={{ textAlign: 'end' }}>{props.quiz?.length}</Grid>
            <Grid item xs={10}>Tổng số lượng bài nộp:</Grid>
            <Grid item xs={2} style={{ textAlign: 'end' }}></Grid>
          </Grid>
          <Divider style={{ margin: '8px 0' }} />
          <Button variant="outlined" onClick={() => handleClick(true)} style={{ width: '100%' }}>Thêm danh mục khoá học</Button>
        </CardContent>
      </Card>

      <InsertTagModal isInserting={isInserting} handleClick={handleClick} />
    </>
  );
}

const mapStateToProps = (state) => ({
  quiz: select(state, 'quizReducer', 'quiz'),
});

const mapDispatchToProps = (dispatch) => ({
  insertCourse: (payload) => dispatch(insertCourse(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(CourseInfor));

