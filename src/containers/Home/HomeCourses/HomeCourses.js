import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CardActionArea,
  DialogContentText,
  DialogActions,
  Snackbar,
  Fab,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AddBox, Clear } from '@material-ui/icons';

import InsertCourseModal from '../../Manager/InsertCourseModal';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';
import { getCourses } from '../../../reducer/courses';
import { getAllQuiz, getTags } from '../../../reducer/quiz';
import { getAllPoint } from '../../../reducer/point';

import { deleteCourse } from '../../../reducer/courses';

function HomeCourses(props) {
  const history = useHistory();
  const { getAllQuiz, getCourses, getAllPoint } = props;

  const [isInserting, setInserting] = useState(false);
  const [deletedCourse, setDeletedCourse] = useState(null);
  const [noti, setNoti] = useState(null);

  const isAdmin = sessionStorage.getItem("isAdmin") === 'true';

  const handleClick = (inserting) => {
    setInserting(inserting);
  }

  useEffect(() => {
    getCourses();
    getAllPoint();
    getAllQuiz();
  }, [getAllQuiz, getCourses, getAllPoint]);

  return (
    <>
      <Card style={{ color: 'white', padding: 0 }}>
        <CardHeader
          title={
            <Grid container>
              <Grid item xs={10}>Các lớp học phần</Grid>
              <Grid item xs={2} style={{ display: isAdmin ? 'block' : 'none' }}>
                <IconButton size="small" onClick={() => handleClick(true)} style={{ float: 'right', marginBottom: 2 }}>
                  <AddBox style={{ color: 'white' }} />
                </IconButton>
              </Grid>
            </Grid>
          }
          style={{ backgroundColor: '#39424E' }}
        />
        <CardContent>
          {props.courses.map((course) => {
            const totalPoint = props.quiz?.filter((e) => e.courseId === course.id)?.length * 100;

            var currentPoint = 0;
            props.point.forEach((e) => currentPoint += (e.courseId === course.id) ? e.point : 0);

            return (
              <Card key={course.id} style={{ marginBottom: 16, position: 'relative' }}>
                <CardActionArea onClick={() => {
                  history.push({
                    pathname: `${ROUTER.COURSES}/${course.id}`,
                    state: { courseId: course.id },
                  });
                }}>
                  <CardContent>
                    <div style={{ fontWeight: 'bold', fontSize: 20, padding: '16px 0 8px 0' }}>{course.name}</div>
                    <LinearProgress variant="determinate" value={totalPoint === 0 ? 0 : currentPoint / totalPoint * 100} style={{ width: '70%' }} />
                    <div style={{ padding: '12px 0' }}>
                      <span style={{ fontWeight: 'bold' }}>{totalPoint === 0 ? '0%' : `${currentPoint / totalPoint * 100}%`}</span>
                      <span>&nbsp; {` ${currentPoint}/${totalPoint}`}</span>
                    </div>
                    <div className="cardButton" style={{ minWidth: 120, width: '20%' }}>Tiếp tục luyện tập</div>
                  </CardContent>
                </CardActionArea>

                <Fab
                  size="small"
                  onClick={() => setDeletedCourse(course)}
                  style={{
                    display: isAdmin ? 'inline-flex' : 'none',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    color: 'rgb(0 0 0 / 50%)',
                    boxShadow: 'none',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Clear />
                </Fab>
              </Card>
            )
          })}
        </CardContent>
      </Card>

      <InsertCourseModal isInserting={isInserting} handleClick={handleClick} />

      <Dialog
        open={deletedCourse !== null}
        keepMounted
        onClose={() => setDeletedCourse(null)}
      >
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Bạn có thực sự muốn xoá khoá học "${deletedCourse?.name}" khỏi hệ thống?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletedCourse(null)} color="secondary">Huỷ</Button>
          <Button 
            onClick={() => {
              props.deleteCourse(deletedCourse.id)
              .then(result => setNoti(result))
              .catch();
              setDeletedCourse(null);
            }}
            color="primary"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>
          {noti?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state) => ({
  tags: select(state, 'quizReducer', 'tags'),
  quiz: select(state, 'quizReducer', 'quiz'),
  point: select(state, 'pointReducer', 'point'),
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getTags: () => dispatch(getTags()),
  getAllQuiz: () => dispatch(getAllQuiz()),
  getCourses: () => dispatch(getCourses()),
  getAllPoint: () => dispatch(getAllPoint()),
  deleteCourse: (id) => dispatch(deleteCourse(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

