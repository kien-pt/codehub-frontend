import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Checkbox,
  Snackbar,
  FormControl,
  OutlinedInput,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { Person, Lock, Autorenew, AssignmentInd } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';

import { insertUser } from '../../../reducer/users';

function InsertUserModal(props) {
  const { isInserting, setInserting } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [isAdmin, setAdmin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focus, setFocus] = useState(false);
  const [noti, setNoti] = useState(null);

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setFullname('');
    setAdmin(false);
    setInserting(false);
    setConfirmPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.insertUser({
      username,
      password,
      fullname,
      admin: isAdmin,
    })
    .then(result => setNoti(result))
    .catch();
    resetForm();
  }

  return (
    <>
      <Dialog open={isInserting} keepMounted onClose={() => setInserting(false)}>
        <DialogTitle>Thêm tài khoản</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ width: '100%', paddingBottom: 6 }}>
              <OutlinedInput
                required
                value={username}
                placeholder="Tên đăng nhập"
                startAdornment={<Person position="start" />}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <FormControl style={{ width: '100%', padding: '6px 0' }}>
              <OutlinedInput
                required
                type="password"
                value={password}
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
                value={confirmPassword}
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
            <FormControl style={{ width: '100%', padding: '6px 0 1px 0' }}>
              <OutlinedInput
                required
                value={fullname}
                placeholder="Họ và tên"
                startAdornment={<AssignmentInd position="start" />}
                onChange={(e) => setFullname(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <FormControl style={{ paddingBottom: 12 }}>
              <FormControlLabel label="Trao quyền quản trị viên" control={<Checkbox color="default" />} onChange={() => setAdmin(!isAdmin)} />  
            </FormControl>
            <FormControl style={{ width: '100%' }}>
              <Button disabled={password === '' || password !== confirmPassword} variant="contained" color="primary" type="submit">Đăng ký</Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
        <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>
          {noti?.type === 'success' ? 'Thêm tài khoản thành công!' : 'Thêm tài khoản thất bại!'}
        </Alert>
      </Snackbar>
    </>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  insertUser: (payload) => dispatch(insertUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertUserModal));
