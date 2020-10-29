import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  CardHeader,
  CardContent,
  Grid,
  Card,
  Button,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import { Person, Lock } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import ROUTER from '../../../constant/router';

import { login } from '../../../reducer/users';

function Login(props) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(
      history,
      {
        email: username,
        password,
      }
    );
  }

  return (
    <Grid container style={{ display: 'flex', height: window.innerHeight }}>
      <Grid item lg={4} md={6} sm={8} xs={10} style={{ margin: 'auto' }}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            title="Đăng nhập"
            style={{ color: 'white', backgroundColor: '#39424E' }}
          />
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
              <FormControl style={{ width: '100%', paddingTop: 12 }}>
                <OutlinedInput
                  required
                  type="password"
                  startAdornment={<Lock position="start" />}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                  style={{ height: 40 }}
                />
              </FormControl>
              <FormControl style={{ width: '100%', paddingTop: 12 }}>
                <Button variant="contained" color="primary" type="submit">Đăng nhập</Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
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
)(toJs(Login));
