import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { updateUser } from '../../../reducer/users';

function SubmissionList() {
  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title="Bảng chấm bài"
        style={{ backgroundColor: '#39424E', height: 32 }}
      />
      <CardContent style={{ color: 'black' }}>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: select(state, 'usersReducer', 'user'),
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(SubmissionList));
