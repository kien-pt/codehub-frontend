import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Button,
  Grid,
  LinearProgress,
  IconButton,
} from '@material-ui/core';
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

  const isAdmin = sessionStorage.getItem("isAdmin") === 'true';

  const handleClick = (inserting) => {
    setInserting(inserting);
  }

  useEffect(() => {
    getCourses();
    getAllPoint();
  }, [getCourses, getAllPoint]);

  return (
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
              {/* <CardActionArea onClick={() => {
                history.push({
                  pathname: `${ROUTER.COURSES}/${course.id}`,
                  state: { courseId: course.id },
                });
              }}> */}
              <CardContent style={{ position: 'relative' }}>
                <div style={{ fontWeight: 'bold', fontSize: 20, padding: '16px 0 8px 0' }}>{course.name}</div>
                <IconButton
                  // onClick={() => props.deleteCourse(course.id)}
                  style={{ position: 'absolute', right: 4, top: 4 }}
                >
                  <Clear />
                </IconButton>
                <LinearProgress variant="determinate" value={totalPoint === 0 ? 0 : currentPoint / totalPoint * 100} style={{ width: '70%' }} />
                <div style={{ padding: '12px 0' }}>
                  <span style={{ fontWeight: 'bold' }}>{totalPoint === 0 ? '0%' : `${currentPoint / totalPoint * 100}%`}</span>
                  <span>&nbsp; {` ${currentPoint}/${totalPoint}`}</span>
                </div>
                {/* <div className="cardButton" style={{ minWidth: 140, width: '20%' }}></div> */}
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
              {/* </CardActionArea> */}
            </Card>
          )
        })}
        <InsertCourseModal isInserting={isInserting} handleClick={handleClick} />
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
  deleteCourse: (id) => dispatch(deleteCourse(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

