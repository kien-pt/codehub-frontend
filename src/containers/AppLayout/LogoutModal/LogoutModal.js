import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Person, Lock } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import ROUTER from '../../../constant/router';

import { login } from '../../../reducer/users';

function LogoutModal(props) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [noti, setNoti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(
      history,
      {
        username,
        password,
      }
    ).then(result => setNoti(result === 'error' ? true : false))
    .catch();
  }

  return (
    <Dialog
      open={isLogout}
      keepMounted
      onClose={() => setLogout(false)}
    >
      <DialogTitle>Xác nhận đăng xuất</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có thực sự muốn đăng xuất khỏi hệ thống?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setLogout(false)}
          color="secondary"
        >
          Huỷ
        </Button>
        <Button
          onClick={() => {
            logout();
            setLogout(false);
          }}
          color="primary"
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>

    <Snackbar open={noti} autoHideDuration={6000} onClose={() => setNoti(false)}>
      <Alert variant="filled" severity="error" onClose={() => setNoti(false)}>
        Đăng xuất thất bại hoặc mật khẩu!
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  login: (history, payload) => dispatch(login(history, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(LogoutModal));
