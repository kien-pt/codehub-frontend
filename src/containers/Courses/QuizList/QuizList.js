import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
  Fab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { Clear } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getCourseById } from '../../../reducer/courses';
import { getTagsByCourseId, getQuizByCourseId, deleteTag } from '../../../reducer/quiz';
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

  const [deletedTag, setDeletedTag] = useState(null);
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    getCourseById(courseId);
    getPointByCourseId(courseId);
    getTagsByCourseId(courseId);
    getQuizByCourseId(courseId);
  }, [courseId, getQuizByCourseId, getCourseById, getPointByCourseId, , getTagsByCourseId]);

  const isAdmin = sessionStorage.getItem("isAdmin") === 'true';

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
                    <IconButton
                      size="small"
                      onClick={() => setDeletedTag(tag)}
                      style={{ float: 'right', marginBottom: 2 }}
                    >
                      <Clear style={{ color: 'white' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              }
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
                        display: isAdmin ? 'inline-flex' : 'none',
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
    
      <Dialog
        open={deletedTag !== null}
        keepMounted
        onClose={() => setDeletedTag(null)}
      >
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Bạn có thực sự muốn xoá danh mục "${deletedTag?.name}" khỏi hệ thống?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletedTag(null)} color="secondary">Huỷ</Button>
          <Button 
            onClick={() => {
              props.deleteTag(deletedTag.id)
              .then(result => setNoti(result))
              .catch();
              setDeletedTag(null);
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
  quiz: select(state, 'quizReducer', 'quiz'),
  tags: select(state, 'quizReducer', 'tags'),
  point: select(state, 'pointReducer', 'point'),
  courses: select(state, 'coursesReducer', 'courses'),
  isFetching: select(state, 'coursesReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getTagsByCourseId: (id) => dispatch(getTagsByCourseId(id)),
  getQuizByCourseId: (id) => dispatch(getQuizByCourseId(id)),
  getCourseById: (courseId) => dispatch(getCourseById(courseId)),
  getPointByCourseId: (courseId) => dispatch(getPointByCourseId(courseId)),
  deleteTag: (id) => dispatch(deleteTag(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(HomeCourses));

