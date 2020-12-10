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

import { deleteTag } from '../../../reducer/quiz';

function DeleteTagModal(props) {
  const { deletedTag, setDeletedTag } = props;

  const [noti, setNoti] = useState(null);

  const handleDelete = () => {
    props.deleteTag(deletedTag.id)
    .then(result => setNoti(result))
    .catch();
    setDeletedTag(null);
  }

  return (
    <>
      <Dialog open={deletedTag !== null} keepMounted onClose={() => setDeletedTag(null)}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Bạn có thực sự muốn xoá danh mục "${deletedTag?.name}" khỏi hệ thống?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setDeletedTag(null)}>Huỷ</Button>
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
  deleteTag: (id) => dispatch(deleteTag(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(DeleteTagModal));
