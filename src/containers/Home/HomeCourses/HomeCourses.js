import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  LinearProgress,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';
import { getCourses } from '../../../reducer/courses';
import { getAllPoint } from '../../../reducer/point';
import { getTags } from '../../../reducer/quiz';

function HomeCourses(props) {
  const history = useHistory();
  const { getCourses, getAllPoint, getTags } = props;

  useEffect(() => {
    getCourses();
    getAllPoint();
    getTags();
  }, [getCourses, getAllPoint, getTags]);

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title="Các lớp học phần"
        style={{ backgroundColor: '#39424E' }}
      />
      <CardContent>
        {props.courses.map((course) => {
          var totalPoint = 0;
          course.tags.forEach((current) => {
            const quizList = props.tags.find((tag) => tag.id === current)?.quizList;
            if (quizList !== undefined) totalPoint += quizList.length * 100;
          });

          var currentPoint = 0;
          props.point.forEach((e) => currentPoint += (e.courseId === course.id) ? e.point : 0);
          console.log(props.point);

          return (
            <Card key={course.id} style={{ marginBottom: 16 }}>
              <CardActionArea onClick={() => {
                history.push({
                  pathname: `${ROUTER.COURSES}/${course.code}`,
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
                  <div className="cardButton" style={{ width: '20%' }}>Tiếp tục luyện tập</div>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tags: select(state, 'quizReducer', 'tags'),
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

