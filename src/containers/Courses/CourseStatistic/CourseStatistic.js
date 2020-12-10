import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { insertCourse } from '../../../reducer/courses';

import InsertTagModal from '../../Manager/InsertTagModal';

function CourseStatistic(props) {
  const history = useHistory();

  const { courseId } = props;
  const [isInserting, setInserting] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  // Open/Close inserting modal
  const handleClick = (inserting) => setInserting(inserting);

  return (
    <>
      <Card style={{ marginTop: 32 }}>
        <CardHeader title="Thống kê" style={{ color: 'white', backgroundColor: '#39424E' }} />
        <CardContent>
          <Grid container>
            <Grid item xs={10}>Tổng số lượng bài tập:</Grid>
            <Grid item xs={2} style={{ textAlign: 'end' }}>{props.quiz?.length}</Grid>
            <Grid item xs={10}>Tổng số lượng bài nộp:</Grid>
            <Grid item xs={2} style={{ textAlign: 'end' }}></Grid>
          </Grid>
          <div style={{ display: isAdmin ? 'block' : 'none' }}>
            <Divider style={{ margin: '8px 0' }} />
            <Button variant="outlined" onClick={() => handleClick(true)} style={{ width: '100%' }}>Thêm danh mục khoá học</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push({ pathname: ROUTER.NEW_QUIZ, state: { courseId }})}
              style={{ width: '100%', marginTop: 8 }}
            >
              Thêm bài tập
            </Button>
          </div>
        </CardContent>
      </Card>

      <InsertTagModal isInserting={isInserting} courseId={courseId} handleClick={handleClick} />
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
)(toJs(CourseStatistic));

