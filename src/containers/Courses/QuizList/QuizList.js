import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
  Fab,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getCourseById } from '../../../reducer/courses';
import { getTagsByCourseId } from '../../../reducer/quiz';
import { getPointByCourseId } from '../../../reducer/point';

function HomeCourses(props) {
  const history = useHistory();
  const {
    getCourseById,
    getPointByCourseId,
    getTagsByCourseId,
    courseId,
  } = props;

  useEffect(() => {
    getCourseById(courseId);
    getPointByCourseId(courseId);
    getTagsByCourseId(courseId);
  }, [courseId, getCourseById, getPointByCourseId, , getTagsByCourseId]);

  return (
    <>
      {props.tags?.map((tag) => {
        return (
          <Card key={`tag-${tag?.id}`} style={{ padding: 0 }}>
            <CardHeader
              title={tag?.name}
              style={{ color: 'white', backgroundColor: '#39424E' }}
            />
            <CardContent>
              {props.quiz?.filter((e) => e.tagId === tag?.id).map((quiz, index) => {
                const point = props.point.find((e) => e.quizId === quiz.id)?.point || 0;
                return (
                  <Card key={`quiz-${quiz.id}`} style={{ position: 'relative', marginTop: index === 0 ? 0 : 12 }}>
                    <CardActionArea onClick={() => history.push(`${ROUTER.QUIZ}/${quiz.id}`)}>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={8}>
                            <div style={{ fontSize: 24, padding: 8 }}>
                              {quiz?.title}
                            </div>
                          </Grid>
                          <Grid item xs={4} style={{ margin: 'auto 0', paddingRight: 8 }}>
                            <div className="cardButton" style={{ float: 'right' }}>{`${point}/100`}</div>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                    <Fab
                      size="small"
                      style={{
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        color: 'rgb(0 0 0 / 50%)',
                        boxShadow: 'none',
                        top: 0,
                        right: 0,
                        width: 24,
                        height: 24,
                        minHeight: 24,
                      }}
                    >
                      <Clear style={{ fontSize: 16 }} />
                    </Fab>
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
  getTagsByCourseId: (id) => dispatch(getTagsByCourseId(id)),
  getCourseById: (courseId) => dispatch(getCourseById(courseId)),
  getPointByCourseId: (courseId) => dispatch(getPointByCourseId(courseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

