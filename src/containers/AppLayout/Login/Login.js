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

import code from '../../../assets/code.png';

function Login(props) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (!(userId >= 0)) history.push(ROUTER.LOGIN);
  }, []);

  console.log(window.innerHeight);

  return (
    <Grid container style={{ display: 'flex', height: window.innerHeight }}>
      <Grid item lg={4} md={6} sm={8} xs={10} style={{ margin: 'auto' }}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            title="Đăng nhập"
            style={{ color: 'white', backgroundColor: '#39424E' }}
          />
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(username, password);
              }
            }>
              <FormControl style={{ width: '100%' }}>
                <OutlinedInput
                  required
                  startAdornment={<Person position="start" />}
                  onChange={(e) => setUsername(e.target.value)}
                  inputProps={{style: {fontSize: 22, paddingLeft: 10, marginLeft: 10 }}}
                  style={{ height: 40 }}
                />
              </FormControl>
              <FormControl style={{ width: '100%', paddingTop: 12 }}>
                <OutlinedInput
                  type="password"
                  required
                  startAdornment={<Lock position="start" />}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{style: {fontSize: 22, paddingLeft: 10, marginLeft: 10 }}}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Login));
