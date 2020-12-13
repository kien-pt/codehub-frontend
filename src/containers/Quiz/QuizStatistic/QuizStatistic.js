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

import { getPointByQuizId } from '../../../reducer/point';
import { getCommentsByQuizId } from '../../../reducer/comments';

function QuizStatistic(props) {
  const history = useHistory();

  const { quizId, getPointByQuizId } = props;

  const isAdmin = localStorage.getItem("isAdmin") === 'true';

  useEffect(() => {
    getPointByQuizId(quizId);
  }, [getPointByQuizId, quizId]);

  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thống kê"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={10}>Tổng số lượng bài nộp:</Grid>
          <Grid item xs={2} style={{ textAlign: 'end' }}>{props.submissions?.length}</Grid>
          <Grid item xs={10}>Tổng số người làm đúng:</Grid>
          <Grid item xs={2} style={{ textAlign: 'end' }}>{props.server_point?.filter((point) => point.point === 100).length || 0}</Grid>
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
  server_point: select(state, 'pointReducer', 'server_point'),
  submissions: select(state, 'submissionsReducer', 'submissions'),
});

const mapDispatchToProps = (dispatch) => ({
  getPointByQuizId: (id) => dispatch(getPointByQuizId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizStatistic));

