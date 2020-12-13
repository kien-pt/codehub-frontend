import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Fab,
  Grid,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import { DeleteForever, Create, Clear } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getCourseById } from '../../../reducer/courses';
import { getPointByUserId } from '../../../reducer/point';
import { getQuizByCourseId } from '../../../reducer/quiz';
import { getTagsByCourseId } from '../../../reducer/tags';

import './QuizList.css';
import UpdateTagModal from '../../Manager/UpdateTagModal';
import DeleteTagModal from '../../Manager/DeleteTagModal';
import DeleteQuizModal from '../../Manager/DeleteQuizModal';

function HomeCourses(props) {
  const history = useHistory();
  const {
    courseId,
    getCourseById,
    getPointByUserId,
    getTagsByCourseId,
    getQuizByCourseId,
  } = props;

  const [deletedTag, setDeletedTag] = useState(null);
  const [updatedTag, setUpdatedTag] = useState(null);
  const [deletingQuiz, setDeletingQuiz] = useState(null);

  const userId = parseInt(localStorage.getItem("userId"));
  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  useEffect(() => {
    getCourseById(courseId);
    getTagsByCourseId(courseId);
    getQuizByCourseId(courseId);
    getPointByUserId(userId);
    // getAllPointByCourseId(courseId);
  }, [courseId, getCourseById, getQuizByCourseId, getTagsByCourseId, userId, getPointByUserId]);

  return (
    <>
      {props.tags?.map((tag) => {
        return (
          <Card key={`tag-${tag?.id}`} style={{ padding: 0, marginBottom: 32 }}>
            <CardHeader
              title={
                <Grid container>
                  <Grid item xs={10}>{tag?.name}</Grid>
                  <Grid item xs={2} style={{ display: isAdmin ? 'block' : 'none' }}>
                    <IconButton className="quiz-edit-button" size="small" onClick={() => setDeletedTag(tag)}>
                      <DeleteForever className="quiz-edit-icon" />
                    </IconButton>
                    <IconButton className="quiz-edit-button" size="small" onClick={() => setUpdatedTag(tag)}>
                      <Create className="quiz-edit-icon" />
                    </IconButton>
                  </Grid>
                </Grid>
              }
              style={{ color: 'white', backgroundColor: '#39424E' }}
            />
            <CardContent>
              {props.quiz?.filter((e) => e.tagId === tag?.id).map((quiz, index) => {
                const point = props.user_point.find((e) => e.quizId === quiz.id)?.point || 0;
                return (
                  <Card key={`quiz-${quiz.id}`} style={{ position: 'relative', marginTop: index === 0 ? 0 : 12 }}>
                    <CardActionArea onClick={() => history.push(`${ROUTER.QUIZ}/${quiz.id}`)}>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={8}><div style={{ fontSize: 24, padding: 8 }}>{quiz?.title}</div></Grid>
                          <Grid item xs={4} style={{ margin: 'auto 0', paddingRight: 8 }}>
                            <div className="cardButton" style={{ float: 'right' }}>{`${point}/100`}</div>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                    <Fab
                      size="small"
                      className="fab-quiz-element"
                      onClick={() => setDeletingQuiz(quiz)}
                      style={{ display: isAdmin ? 'inline-flex' : 'none' }}
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
    
      <UpdateTagModal updatedTag={updatedTag} setUpdatedTag={setUpdatedTag} />
      <DeleteTagModal deletedTag={deletedTag} setDeletedTag={setDeletedTag} />
      <DeleteQuizModal deletingQuiz={deletingQuiz} setDeletingQuiz={setDeletingQuiz} />
    </>
  );
}

const mapStateToProps = (state) => ({
  quiz: select(state, 'quizReducer', 'quiz'),
  tags: select(state, 'tagsReducer', 'tags'),
  user_point: select(state, 'pointReducer', 'user_point'),
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getTagsByCourseId: (id) => dispatch(getTagsByCourseId(id)),
  getQuizByCourseId: (id) => dispatch(getQuizByCourseId(id)),
  getCourseById: (courseId) => dispatch(getCourseById(courseId)),
  getPointByUserId: () => dispatch(getPointByUserId()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

