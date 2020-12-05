import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  FormControl,
  OutlinedInput,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentTurnedIn, AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { insertCourse } from '../../../reducer/courses';

function CourseInfor(props) {
 
  return (
    <Card style={{ marginTop: 32 }}>
      <CardHeader
        title="Thống kê"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>

      </CardContent>
    </Card>
);
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  insertCourse: (payload) => dispatch(insertCourse(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(CourseInfor));

