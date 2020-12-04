import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Button,
  LinearProgress,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';
import { getCourses } from '../../../reducer/courses';
import { getTags } from '../../../reducer/quiz';
import { getAllPoint } from '../../../reducer/point';

import InsertCourseModal from '../../Courses/InsertCourseModal';

function HomeCourses(props) {
  const history = useHistory();
  const { getCourses, getTags, getAllPoint } = props;

  useEffect(() => {
    getCourses();
    getTags();
    getAllPoint();
  }, [getCourses, getTags, getAllPoint]);

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title="Các lớp học phần"
        style={{ backgroundColor: '#39424E' }}
      />
      <CardContent>
        {props.courses.map((course) => {
          const totalPoint = props.quiz?.filter((e) => e.courseId === course.id)?.length * 100;

          var currentPoint = 0;
          props.point.forEach((e) => currentPoint += (e.courseId === course.id) ? e.point : 0);

          return (
            <Card key={course.id} style={{ marginBottom: 16 }}>
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
            </Card>
          )
        })}
        {/* <InsertCourseModal /> */}
      </CardContent>
    </Card>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

