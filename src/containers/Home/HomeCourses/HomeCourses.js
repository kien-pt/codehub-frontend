import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Fab,
  Grid,
  IconButton,
  LinearProgress,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import { AddBoxSharp, Create, Clear } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getCourses } from '../../../reducer/courses';
import { getAllQuiz } from '../../../reducer/quiz';
import { getTags } from '../../../reducer/tags';
import { resetUserPoint, getUserPointByCourseId } from '../../../reducer/point';

import InsertCourseModal from '../../Manager/InsertCourseModal';
import UpdateCourseModal from '../../Manager/UpdateCourseModal';
import DeleteCourseModal from '../../Manager/DeleteCourseModal';


function HomeCourses(props) {
  const history = useHistory();
  const {
    courses,
    getTags,
    getAllQuiz,
    getCourses,
    getUserPointByCourseId,
  } = props;

  const [isInserting, setInserting] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [updatingCourse, setUpdatingCourse] = useState(null);

  const userId = parseInt(localStorage.getItem("userId"));
  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  // Handle insert course
  const handleClick = (inserting) => setInserting(inserting);

  useEffect(() => {
    getCourses();
    getAllQuiz();
    getTags();
  }, [getAllQuiz, getCourses, getTags]);

  useEffect(() => {
    props.resetUserPoint();
    courses.forEach((course) => getUserPointByCourseId(course.id));
  }, [courses, getUserPointByCourseId]);

  return (
    <>
      <Card style={{ color: 'white', padding: 0 }}>
        <CardHeader
          title={
            <Grid container>
              <Grid item xs={10}>Các lớp học phần</Grid>
              <Grid item xs={2} style={{ display: isAdmin ? 'block' : 'none' }}>
                <IconButton size="small" onClick={() => handleClick(true)} style={{ float: 'right', marginBottom: 2 }}>
                  <AddBoxSharp style={{ color: 'white' }} />
                </IconButton>
              </Grid>
            </Grid>
          }
          style={{ backgroundColor: '#39424E' }}
        />
        <CardContent>
          {courses.map((course) => {
            var totalPoint = 0;
            props.tags.filter((tag) => tag.courseId === course.id).forEach((tag) => {
              totalPoint += props.quizList.filter((quiz) => quiz.tagId === tag.id).length;
            });
            totalPoint = totalPoint * 100;

            const currentPoint = props.server_point.find((e) => e.userID === userId)?.total_point || 0;

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
                  className="fab-quiz-element"
                  onClick={() => setDeletingCourse(course)}
                  style={{ display: isAdmin ? 'inline-flex' : 'none' }}
                >
                  <Clear />
                </Fab>
                <Fab
                  size="small"
                  className="fab-quiz-element"
                  onClick={() => setUpdatingCourse(course)}
                  style={{ display: isAdmin ? 'inline-flex' : 'none', right: 24 }}
                >
                  <Create style={{ fontSize: 18 }} />
                </Fab>
              </Card>
            )
          })}
        </CardContent>
      </Card>

      <InsertCourseModal isInserting={isInserting} handleClick={handleClick} />
      <UpdateCourseModal updatingCourse={updatingCourse} setUpdatingCourse={setUpdatingCourse} />
      <DeleteCourseModal deletingCourse={deletingCourse} setDeletingCourse={setDeletingCourse} />
    </>
  );
}

const mapStateToProps = (state) => ({
  tags: select(state, 'tagsReducer', 'tags'),
  quizList: select(state, 'quizReducer', 'quiz'),
  server_point: select(state, 'pointReducer', 'server_point'),
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getTags: () => dispatch(getTags()),
  getAllQuiz: () => dispatch(getAllQuiz()),
  getCourses: () => dispatch(getCourses()),
  resetUserPoint: () => dispatch(resetUserPoint()),
  getUserPointByCourseId: (id) => dispatch(getUserPointByCourseId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

