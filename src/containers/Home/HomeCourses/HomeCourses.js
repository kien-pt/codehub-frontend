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
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AddBox, Clear } from '@material-ui/icons';

import InsertCourseModal from '../../Courses/InsertCourseModal';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';
import { getCourses } from '../../../reducer/courses';
import { getTags } from '../../../reducer/quiz';
import { getAllPoint } from '../../../reducer/point';

import { deleteCourse } from '../../../reducer/courses';

function HomeCourses(props) {
  const history = useHistory();
  const { getCourses, getAllPoint } = props;

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
  }, [getCourses, getAllPoint]);

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
              <Card key={course.id} style={{ marginBottom: 16 }}>
                <CardContent style={{ position: 'relative' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 20, padding: '16px 0 8px 0' }}>{course.name}</div>
                  <IconButton
                    onClick={() => setDeletedCourse(course)}
                    style={{ position: 'absolute', right: 4, top: 4 }}
                  >
                    <Clear />
                  </IconButton>
                  <LinearProgress variant="determinate" value={totalPoint === 0 ? 0 : currentPoint / totalPoint * 100} style={{ width: '70%' }} />
                  <div style={{ padding: '12px 0' }}>
                    <span style={{ fontWeight: 'bold' }}>{totalPoint === 0 ? '0%' : `${currentPoint / totalPoint * 100}%`}</span>
                    <span>&nbsp; {` ${currentPoint}/${totalPoint}`}</span>
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      history.push({
                        pathname: `${ROUTER.COURSES}/${course.id}`,
                        state: { courseId: course.id },
                      });
                    }}
                  >
                    Tiếp tục luyện tập
                  </Button>
                </CardContent>
              </Card>
            )
          })}
          <InsertCourseModal isInserting={isInserting} handleClick={handleClick} />
        </CardContent>
      </Card>

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
  getCourses: () => dispatch(getCourses()),
  getAllPoint: () => dispatch(getAllPoint()),
  deleteCourse: (id) => dispatch(deleteCourse(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

