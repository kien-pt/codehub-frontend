import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  OutlinedInput,
  Divider,
} from '@material-ui/core';
import { AssignmentInd, Person } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { updateUser } from '../../../reducer/users';

function SubmissionList(props) {
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
