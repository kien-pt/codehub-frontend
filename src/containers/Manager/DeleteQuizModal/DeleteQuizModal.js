import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 

import toJs from '../../../hoc/ToJS';

import { deleteQuiz } from '../../../reducer/quiz';

function DeleteQuizModal(props) {
  const { deletingQuiz, setDeletingQuiz } = props;

  const [noti, setNoti] = useState(null);

  const handleDelete = () => {
    props.deleteQuiz(deletingQuiz.id)
    .then(result => {
      setNoti(result);
      window.location.reload();
    }).catch();
    setDeletingQuiz(null);
  }

  return (
    <>
      <Dialog open={deletingQuiz !== null} keepMounted onClose={() => setDeletingQuiz(null)}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Bạn có thực sự muốn xoá danh mục "${deletingQuiz?.title}" khỏi hệ thống?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setDeletingQuiz(null)}>Huỷ</Button>
          <Button variant="contained" color="primary" onClick={handleDelete}>Đồng ý</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={5000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>{noti?.message}</Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteQuiz: (id) => dispatch(deleteQuiz(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(DeleteQuizModal));
