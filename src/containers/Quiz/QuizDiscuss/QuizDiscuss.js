import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Fab,
  Grid,
  Button,
  Avatar,
  Divider,
  Snackbar,
  TextareaAutosize,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Clear } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { insertComment, deleteComment } from '../../../reducer/comments';

function QuizDiscuss(props) {
  const { quizId } = props;

  const [noti, setNoti] = useState(null);
  const [comment, setComment] = useState('');

  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  const handleSubmit = (e) => {
    e.preventDefault();
    props.insertComment({ quizId, content: comment })
    .then(result => setNoti(result))
    .catch();
    setComment('');
  }

  const handleDelete = (id) => {
    props.deleteComment(id, quizId)
    .then(result => setNoti(result))
    .catch();
  }

  const commentsList = props.comments.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader title="Thảo luận" style={{ color: 'white', backgroundColor: '#39424E' }} />
      <CardContent style={{ paddingBottom: 0, minHeight: 370, maxHeight: 370, overflow: 'auto' }}>
        {
          commentsList.map((comment, index) => {
            const date = new Date(Date.parse(comment.createdAt));
            const month = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();
            return (
              <div key={comment.createdAt}>
                <Grid container style={{ position: 'relative' }}>
                  <Grid item><Avatar style={{ marginTop: 6 }}>{comment.user.username[0].toUpperCase()}</Avatar></Grid>
                  <Grid item style={{ marginLeft: 12, maxWidth: 'calc(100% - 52px)' }}>
                    <Grid item style={{ fontWeight: 'bold' }}>{comment.user.fullname}</Grid>
                    <Grid item style={{ fontSize: 10, color: '#8c8c8c' }}>{`${day}-${month}-${year}`}</Grid>
                    <Grid item style={{ marginTop: 4 }}>{comment.content}</Grid>
                  </Grid>
                  <Fab
                      size="small"
                      className="fab-quiz-element"
                      onClick={() => handleDelete(comment.id)}
                      style={{ display: isAdmin ? 'inline-flex' : 'none' }}
                    >
                      <Clear style={{ fontSize: 16 }} />
                    </Fab>
                </Grid>
                <Divider style={{ marginTop: 8, marginBottom: (index !== commentsList.length - 1) ? 12 : 0 }} />
              </div>
            );
          })
        }
      </CardContent>
      <CardActions style={{ paddingLeft: 16, paddingRight: 16 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <TextareaAutosize className="text-area" value={comment} rowsMin={1} onChange={(e) => setComment(e.target.value)} style={{ width: 'calc(100% - 32px)' }} />
          <Button variant="contained" type="submit" color="primary" style={{ marginLeft: 4, height: 32, minHeight: 32, minWidth: 50 }}>Gửi</Button>
        </form>
      </CardActions>




      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>
          {noti?.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  comments: select(state, 'quizReducer', 'comments'),
  usersList: select(state, 'usersReducer', 'usersList'),
});

const mapDispatchToProps = (dispatch) => ({
  insertComment: (payload) => dispatch(insertComment(payload)),
  deleteComment: (id, quizId) => dispatch(deleteComment(id, quizId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizDiscuss));

