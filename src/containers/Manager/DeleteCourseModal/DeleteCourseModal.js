import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 

import toJs from '../../../hoc/ToJS';

import { deleteCourse } from '../../../reducer/courses';

function DeleteCourseModal(props) {
  const { deletedCourse, setDeletedCourse } = props;
  const [noti, setNoti] = useState(null);

  const handleDelete = () => {
    props.deleteCourse(deletedCourse.id)
    .then(result => setNoti(result))
    .catch();
    setDeletedCourse(null);
  }

  return (
    <>
      <Dialog
        open={deletedCourse !== null}
        keepMounted
        onClose={() => setDeletedCourse(null)}
      >
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Bạn có thực sự muốn xoá khoá học "${deletedCourse?.name}" khỏi hệ thống?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletedCourse(null)} color="secondary">Huỷ</Button>
          <Button 
            onClick={handleDelete}
            color="primary"
          >
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
  deleteCourse: (id) => dispatch(deleteCourse(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(DeleteCourseModal));
