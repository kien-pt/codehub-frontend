import React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader } from '@material-ui/core';

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

