import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Backdrop,
  FormControl,
  OutlinedInput,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import {
  Lock,
  Person,
  Autorenew,
  AssignmentInd
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { insertUser } from '../../../reducer/users';

function Register(props) {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focus, setFocus] = useState(false);
  const [noti, setNoti] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.insertUser({
      username,
      password,
      fullname,
    })
    .then(result => setNoti(result))
    .catch();
  }

  // Handle close noti modal
  const handleClose = () => {
    if (noti.type === 'success') history.push(ROUTER.LOGIN);
    setNoti(null);
  }
  
  return (
    <>
      <Grid container style={{ display: 'flex', height: window.innerHeight }}>
        <Grid item lg={4} md={6} sm={8} xs={10} style={{ margin: 'auto' }}>
          <Card style={{ width: '100%' }}>
            <CardHeader
              title="Đăng ký"
              style={{ color: 'white', backgroundColor: '#39424E' }}
            />
            <CardContent>
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
                  <Button disabled={password === '' || password !== confirmPassword} variant="contained" color="primary" type="submit">Đăng ký</Button>
                </FormControl>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={noti !== null} keepMounted onClose={handleClose}>
        <DialogTitle>{`Đăng ký ${noti?.type === 'success' ? 'thành công' : 'thất bại'}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              noti?.type === 'success'
              ? 'Bạn đã đăng ký thành công tài khoản. Xin mời đăng nhập!'

              : 'Đăng ký tài khoản không thành công. Tài khoản đã tồn tại!'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions><Button onClick={handleClose} color="primary">Tiếp tục</Button> </DialogActions>
      </Dialog>

      <Backdrop open={props.isFetching} style={{ zIndex: 10 }}><CircularProgress /></Backdrop>
    </>
  );
}

const mapStateToProps = (state) => ({
  isFetching: select(state, 'usersReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  insertUser: (payload) => dispatch(insertUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Register));
