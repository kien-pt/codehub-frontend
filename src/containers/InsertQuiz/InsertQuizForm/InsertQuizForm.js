import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CardActionArea,
  DialogContentText,
  DialogActions,
  Snackbar,
  Fab,
  Typography,
  TextareaAutosize,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AddBox, Clear } from '@material-ui/icons';

import InsertCourseModal from '../../Courses/InsertCourseModal';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import './InsertQuizForm.css';

function InsertQuizForm(props) {
  const [isInserting, setInserting] = useState(false);
  const [deletedCourse, setDeletedCourse] = useState(null);
  const [noti, setNoti] = useState(null);

  const isAdmin = sessionStorage.getItem("isAdmin") === 'true';

  const handleClick = (inserting) => {
    setInserting(inserting);
  }

  return (
    <Card>
      <CardHeader
        title="Thêm bài tập"
        style={{ color: 'white', backgroundColor: '#39424E' }}
      />
      <CardContent>
        <TextareaAutosize className="text-area" rowsMin={3} />
        <strong>Input:</strong>
        <TextareaAutosize className="text-area" rowsMin={1} />
        <strong>Output:</strong>
        <TextareaAutosize className="text-area" rowsMin={1} />
        <strong>Ví dụ:</strong>
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
)(toJs(InsertQuizForm));

