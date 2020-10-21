import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

function QuizDiscuss(props) {
  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thảo luận"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
      </CardContent>
      <CardActions style={{ paddingLeft: 16, paddingRight: 16 }}>
        <TextField placeholder="Để lại lời thảo luận..." variant="outlined" style={{ width: 'calc(100% - 32px)' }} />
        <Send style={{ cursor: 'pointer' }} />
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  quizList: select(state, 'quizReducer', 'quiz'),
  isFetching: select(state, 'quizReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(QuizDiscuss));

