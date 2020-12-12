import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Grid,
  Button,
  Divider,
} from '@material-ui/core';
import { Send, AccountCircle } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getCommentsByQuizId } from '../../../reducer/comments';

function QuizStatistic(props) {
  const history = useHistory();

  const { quizId } = props;

  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thống kê"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={10}>Tổng số lượng bài nộp:</Grid>
          {/* <Grid item xs={2} style={{ textAlign: 'end' }}>{props.quiz?.length}</Grid> */}
          <Grid item xs={10}>Tổng số người làm đúng:</Grid>
          {/* <Grid item xs={2} style={{ textAlign: 'end' }}></Grid> */}
        </Grid>
        <div style={{ display: isAdmin ? 'block' : 'none' }}>
          <Divider style={{ margin: '8px 0' }} />
          <Button variant="outlined" style={{ width: '100%' }}>Xoá bài tập</Button>
          <Button
            variant="contained"
            color="primary"
            href={`${ROUTER.UPDATE_QUIZ}/${quizId}`}
            style={{ width: '100%', marginTop: 8 }}
          >
            Sửa bài tập
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizStatistic));

