import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';

import { logout } from '../../../reducer/users';

function LogoutModal(props) {
  const history = useHistory();
  const { isLogout, setLogout } = props;
  const [noti, setNoti] = useState(false);

  const logout = () => {
    props.logout(history)
    .then(result => setNoti(result === 'error' ? true : false))
    .catch();
  }

  return (
    <>
      <Dialog open={isLogout} keepMounted onClose={() => setLogout(false)}>
        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có thực sự muốn đăng xuất khỏi hệ thống?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setLogout(false)}>Huỷ</Button>
          <Button variant="contained" color="primary" onClick={() => { logout(); setLogout(false); }}>Đồng ý</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti} autoHideDuration={5000} onClose={() => setNoti(false)}>
        <Alert variant="filled" severity="error" onClose={() => setNoti(false)}>
          Đăng xuất không thành công!
        </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(LogoutModal));
