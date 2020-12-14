import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Snackbar,
  Backdrop,
  FormControl,
  OutlinedInput,
  CircularProgress, 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Person, Lock } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { login } from '../../../reducer/users';

function Login(props) {
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
    ).then(result => {
      setNoti(result === 'error' ? true : false);
      const userId = parseInt(localStorage.getItem("userId"));
      if (userId >= 0) history.push(ROUTER.HOME);
    }).catch();
  }

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId"));
    if (userId >= 0) history.push(ROUTER.HOME);
  }, [history]);

  return (
    <Grid container style={{ display: 'flex', height: window.innerHeight }}>
      <Grid item lg={4} md={6} sm={8} xs={10} style={{ margin: 'auto' }}>
        <Card style={{ width: '100%' }}>
          <CardHeader title="Đăng nhập" style={{ color: 'white', backgroundColor: '#39424E' }} />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl style={{ width: '100%' }}>
                <OutlinedInput
                  required
                  startAdornment={<Person position="start" />}
                  onChange={(e) => setUsername(e.target.value)}
                  inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                  style={{ height: 40 }}
                />
              </FormControl>
              <FormControl style={{ width: '100%', padding: '12px 0' }}>
                <OutlinedInput
                  required
                  type="password"
                  startAdornment={<Lock position="start" />}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                  style={{ height: 40 }}
                />
              </FormControl>
              <FormControl style={{ display: 'inline', width: '100%' }}>
                <Button variant="outlined" href={ROUTER.REGISTER} style={{ width: '48%' }}>Đăng ký</Button>
                <Button variant="contained" color="primary" type="submit" style={{ width: '48%', float: 'right' }}> Đăng nhập</Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>

        <Snackbar open={noti} autoHideDuration={6000} onClose={() => setNoti(false)}>
          <Alert variant="filled" severity="error" onClose={() => setNoti(false)}>Sai tên đăng nhập hoặc mật khẩu!</Alert>
        </Snackbar>

        <Backdrop open={props.isLogin} style={{ zIndex: 10 }}><CircularProgress /></Backdrop>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  isLogin: select(state, 'usersReducer', 'isLogin'),
});

const mapDispatchToProps = (dispatch) => ({
  login: (history, payload) => dispatch(login(history, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Login));
