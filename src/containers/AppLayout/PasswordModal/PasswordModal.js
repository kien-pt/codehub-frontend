import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Snackbar,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Lock, Autorenew } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';

import { updateUser } from '../../../reducer/users';

function PasswordModal(props) {
  const { isPasswordModal, setPasswordModal } = props;
  
  const [noti, setNoti] = useState(null);
  const [password, setPassword] = useState('');
  const [focus, setFocus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateUser({
      id: parseInt(localStorage.getItem("userId")),
      password,
    })
    .then(result => setNoti(result))
    .catch();
    setPasswordModal(false);
  }

  return (
    <>
      <Dialog open={isPasswordModal} keepMounted onClose={() => setPasswordModal(false)}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ width: '100%', padding: '6px 0' }}>
              <OutlinedInput
                required
                type="password"
                placeholder="Mật khẩu"
                startAdornment={<Lock position="start" />}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <FormControl style={{ width: '100%', padding: '6px 0' }}>
              <OutlinedInput
                required
                type="password"
                placeholder="Xác nhận mật khẩu"
                startAdornment={<Autorenew position="start" />}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <span style={{ display: (focus && password !== confirmPassword) ? 'inline' : 'none', color: 'red' }}>Mật khẩu không khớp!</span>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setPasswordModal(false)}>Huỷ</Button>
          <Button disabled={password === '' || password !== confirmPassword} variant="contained" color="primary" onClick={handleSubmit}>Đồng ý</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>{noti?.message}</Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(PasswordModal));
