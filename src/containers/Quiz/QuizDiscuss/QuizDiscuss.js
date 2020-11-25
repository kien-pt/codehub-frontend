import React, { useEffect } from 'react';
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

import { getCommentsByQuizId } from '../../../reducer/comments';

function QuizDiscuss(props) {
  const { getCommentsByQuizId, quizId } = props;

  useEffect(() => {
    getCommentsByQuizId(quizId);
  }, [getCommentsByQuizId, quizId]);

  const commentsList = props.comments.sort((a, b) => Date.parse(a.createAt) - Date.parse(b.createAt));
  // console.log(commentsList);

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thảo luận"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
          {
            commentsList.map((comment) => {
              const date = new Date(Date.parse(comment.createAt));
              console.log(date);
              const month = date.getMonth();
              const day = date.getDate();
              const year = date.getFullYear();
              return (
                <>
                  <Grid container>
                    <Grid item><AccountCircle style={{ fontSize: 32 }} /></Grid>
                    <Grid item direction="column" style={{ marginLeft: 12 }}>
                      <Grid item style={{ fontWeight: 'bold' }}>{comment.userId}</Grid>
                      <Grid item style={{ fontSize: 10, color: '#8c8c8c' }}>{`${day}-${month}-${year}`}</Grid>
                      <Grid item style={{ marginTop: 8 }}>{comment.content}</Grid>
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: '16px 0' }} />
                </>
              );
            })
          }
      </CardContent>
      <CardActions style={{ paddingLeft: 16, paddingRight: 16 }}>
        <TextField placeholder="Để lại lời thảo luận..." variant="outlined" style={{ width: 'calc(100% - 32px)' }} />
        <Send style={{ cursor: 'pointer' }} />
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  comments: select(state, 'commentsReducer', 'comments'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  getCommentsByQuizId: (id) => dispatch(getCommentsByQuizId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizDiscuss));

