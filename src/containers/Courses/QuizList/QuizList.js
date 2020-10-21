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
import { getQuizByCourseId, getTagsByCourseId } from '../../../reducer/quiz';
import { getPointByCourseId } from '../../../reducer/point';

function HomeCourses(props) {
  const history = useHistory();
  const {
    getCourseById,
    getPointByCourseId,
    getTagsByCourseId,
    getQuizByCourseId,
    courseId,
  } = props;

  useEffect(() => {
    getCourseById(courseId);
    getPointByCourseId(courseId);
    getTagsByCourseId(courseId);
    getQuizByCourseId(courseId);
  }, [courseId, getCourseById, getPointByCourseId, getQuizByCourseId, getTagsByCourseId]);

  return (
    <>
      {props.tags?.map((tag) => {
        return (
          <Card key={`tag-${tag?.id}`} style={{ padding: 0, marginBottom: 16 }}>
            <CardHeader
              title={tag?.name}
              style={{ color: 'white', backgroundColor: '#39424E' }}
            />
            <CardContent>
              {props.quiz?.filter((e) => e.tagId === tag?.id).map((quiz) => {
                const point = props.point.find((e) => e.quizId === quiz.id)?.point || 0;
                return (
                  <Card key={`quiz-${quiz.id}`} style={{ marginBottom: '8px' }}>
                    <CardActionArea onClick={() => history.push(`${ROUTER.QUIZ}/${quiz.id}`)}>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={8}>
                            <div style={{ fontSize: 24, padding: 8 }}>
                              {quiz?.name}
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
  getQuizByCourseId: (id) => dispatch(getQuizByCourseId(id)),
  getTagsByCourseId: (id) => dispatch(getTagsByCourseId(id)),
  getCourseById: (courseId) => dispatch(getCourseById(courseId)),
  getPointByCourseId: (courseId) => dispatch(getPointByCourseId(courseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

