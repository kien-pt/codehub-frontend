import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Button,
  Avatar,
  Divider,
  TextareaAutosize,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { insertComment } from '../../../reducer/comments';

function QuizDiscuss(props) {
  const { quizId } = props;
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.insertComment({
      quizId,
      content: comment,
    });
    setComment('');
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
                <Grid container>
                  <Grid item><Avatar style={{ marginTop: 6 }}>{comment.user.username[0].toUpperCase()}</Avatar></Grid>
                  <Grid item style={{ marginLeft: 12 }}>
                    <Grid item style={{ fontWeight: 'bold' }}>{comment.user.fullname}</Grid>
                    <Grid item style={{ fontSize: 10, color: '#8c8c8c' }}>{`${day}-${month}-${year}`}</Grid>
                    <Grid item style={{ marginTop: 4 }}>{comment.content}</Grid>
                  </Grid>
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
          <Button variant="contained" type="submit" color="primary" style={{ marginLeft: 4, height: 32, minWidth: 50 }}>Gửi</Button>
        </form>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  comments: select(state, 'quizReducer', 'comments'),
  usersList: select(state, 'usersReducer', 'usersList'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  insertComment: (payload) => dispatch(insertComment(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizDiscuss));

