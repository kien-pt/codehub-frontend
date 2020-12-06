import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { Person, Lock, Autorenew, AssignmentInd } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { insertUser } from '../../../reducer/users';

function InsertUserModal(props) {
  const { isInserting, setInserting } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focus, setFocus] = useState(false);
  const [noti, setNoti] = useState(null);

  const handleSubmit = (e) => {
    setInserting(false);
    e.preventDefault();
    props.insertUser({
      username,
      password,
      fullname,
    })
    .then(result => setNoti(result))
    .catch();
  }

  return (
    <>
      <Dialog
        open={isInserting}
        keepMounted
        onClose={() => setInserting(false)}
      >
        <DialogTitle>Thêm tài khoản</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ width: '100%', paddingBottom: 6 }}>
              <OutlinedInput
                required
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
            <FormControl style={{ width: '100%', padding: '6px 0 12px 0' }}>
              <OutlinedInput
                required
                placeholder="Họ và tên"
                startAdornment={<AssignmentInd position="start" />}
                onChange={(e) => setFullname(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 40 }}
              />
            </FormControl>
            <FormControl style={{ width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Đăng ký
              </Button>
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  insertUser: (payload) => dispatch(insertUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(InsertUserModal));
