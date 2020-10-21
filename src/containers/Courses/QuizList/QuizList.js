import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getCourseById } from '../../../reducer/courses';
import { getQuiz, getTags } from '../../../reducer/quiz';
import { getPointByCourseId } from '../../../reducer/point';

function HomeCourses(props) {
  const temp = window.location.href.split('/');
  const courseId = temp[temp.length - 1];

  const history = useHistory();
  const { getCourseById, getPointByCourseId, getTags, getQuiz } = props;

  useEffect(() => {
    getCourseById(courseId);
    getPointByCourseId(courseId);
    getTags();
    getQuiz();
  }, [getCourseById, getPointByCourseId, getQuiz, getTags]);

  return (
    <>
      {props.courses?.find((course) => course.id === props.courseId)?.tags?.map((tagId) => {
        const tag = props.tags.find((e) => e.id === tagId);
        return (
          <Card key={`tag-${tagId}`} style={{ padding: 0, marginBottom: 16 }}>
            <CardHeader
              title={tag?.name}
              style={{ color: 'white', backgroundColor: '#39424E' }}
            />
            <CardContent>
              {tag?.quizList.map((quizId) => {
                const point = props.point.find((e) => e.quizId === quizId)?.point || 0;
                return (
                  <Card key={`quiz-${quizId}`} style={{ marginBottom: '8px' }}>
                    <CardActionArea onClick={() => {
                      history.push({
                        pathname: `${ROUTER.QUIZ}/${quizId}`,
                        state: { quizId },
                      });
                    }}>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={8}>
                            <div style={{ fontSize: 24, padding: 8 }}>
                              {props.quiz?.find((quiz) => quiz.id === quizId)?.name}
                            </div>
                          </Grid>
                          <Grid item xs={4}>
                            <div className="cardButton" style={{ float: 'right' }}>{`${point}/100`}</div>
                          </Grid>
                        </Grid>
                        
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )
      })}
    </>
  );
}

const mapStateToProps = (state) => ({
  quiz: select(state, 'quizReducer', 'quiz'),
  tags: select(state, 'quizReducer', 'tags'),
  point: select(state, 'pointReducer', 'point'),
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: () => dispatch(getQuiz()),
  getTags: () => dispatch(getTags()),
  getCourseById: (courseId) => dispatch(getCourseById(courseId)),
  getPointByCourseId: (courseId) => dispatch(getPointByCourseId(courseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

