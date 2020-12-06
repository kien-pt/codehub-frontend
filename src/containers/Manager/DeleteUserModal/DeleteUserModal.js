import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Paper,
  CardHeader,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { Delete, Add } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { deleteUser } from '../../../reducer/users';

function DeleteUserModal(props) {
  const { deletedUser, setDeletedUser } = props;
  const [noti, setNoti] = useState(null);

  const handleDelete = () => {
    props.deleteUser(deletedUser.id)
    .then(result => setNoti(result))
    .catch();
  }

  return (
    <>
      <Dialog
        open={deletedUser !== null}
        keepMounted
        onClose={() => setDeletedUser(null)}
      >
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Bạn có thực sự muốn xoá tài khoản "${deletedUser?.username}" khỏi hệ thống?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeletedUser(null)} color="secondary">Huỷ</Button>
          <Button 
            onClick={() => {
              handleDelete();
              setDeletedUser(null);
            }}
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
  deleteUser: (id) => dispatch(deleteUser(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(DeleteUserModal));
