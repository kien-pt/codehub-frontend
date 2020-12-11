import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Grid,
  Divider,
} from '@material-ui/core';
import { Send, AccountCircle } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { insertComment } from '../../../reducer/comments';

function QuizDiscuss(props) {
  const { quizId } = props;
  const [comment, setComment] = useState('');

  const handleClick = () => {
    props.insertComment({
      quizId,
      content: comment,
    });
  }

  const commentsList = props.comments.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thảo luận"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
          {
            commentsList.map((comment) => {
              const date = new Date(Date.parse(comment.createdAt));
              const month = date.getMonth();
              const day = date.getDate();
              const year = date.getFullYear();
              return (
                <>
                  <Grid container>
                    <Grid item><AccountCircle style={{ fontSize: 32 }} /></Grid>
                    <Grid item direction="column" style={{ marginLeft: 12 }}>
                      <Grid item style={{ fontWeight: 'bold' }}>{comment.user.fullname}</Grid>
                      <Grid item style={{ fontSize: 10, color: '#8c8c8c' }}>{`${day}-${month}-${year}`}</Grid>
                      <Grid item style={{ marginTop: 4 }}>{comment.content}</Grid>
                    </Grid>
                  </Grid>
                  <Divider style={{ marginTop: 8, marginBottom: 16 }} />
                </>
              );
            })
          }
      </CardContent>
      <CardActions style={{ paddingLeft: 16, paddingRight: 16 }}>
        <form>
          <TextField value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Để lại lời thảo luận..." variant="outlined" style={{ width: 'calc(100% - 32px)' }} />
          <Send onClick={handleClick} style={{ cursor: 'pointer' }} />
        </form>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  usersList: select(state, 'usersReducer', 'usersList'),
  comments: select(state, 'quizReducer', 'comments'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  insertComment: (payload) => dispatch(insertComment(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizDiscuss));

