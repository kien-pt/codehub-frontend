import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AssignmentTurnedIn, AssignmentLate } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';

import { updateCourse } from '../../../reducer/courses';

function UpdateCourseModal(props) {
  const { updatingCourse, setUpdatingCourse } = props;

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    setCode(updatingCourse?.code);
    setName(updatingCourse?.name);
  }
  , [updatingCourse]);

  const handleSubmit = () => {
    props.updateCourse({
      id: updatingCourse.id,
      code,
      name,
    })
    .then(result => setNoti(result))
    .catch();
    setUpdatingCourse(null);
  }

  return (
    <>
      <Dialog
        open={updatingCourse !== null}
        keepMounted
        onClose={() => setUpdatingCourse(null)}
        style={{ minWidth: 640 }}
      >
        <DialogTitle>Thêm khoá học</DialogTitle>
        <DialogContent style={{ marginTop: 12 }}>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ width: '100%' }}>
              <OutlinedInput
                required
                value={code}
                placeholder="Nhập mã khoá học"
                startAdornment={<AssignmentLate position="start" />}
                onChange={(e) => setCode(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <FormControl style={{ width: '100%', padding: '12px 0' }}>
              <OutlinedInput
                required
                value={name}
                placeholder="Nhập tên khoá học"
                startAdornment={<AssignmentTurnedIn position="start" />}
                onChange={(e) => setName(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions style={{ padding: '0 24px 12px 24px' }}>
          <Button variant="outlined" onClick={() => setUpdatingCourse(null)} color="secondary">
            Huỷ
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>
          {noti?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  updateCourse: (id) => dispatch(updateCourse(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(UpdateCourseModal));
