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
import { useHistory } from 'react-router-dom';
import { Person, Lock } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import ROUTER from '../../../constant/router';


function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.login(
    //   history,
    //   {
    //     username,
    //     password,
    //   }
    // );
  }
  
  return (
    <Grid container style={{ display: 'flex', height: window.innerHeight }}>
      <Grid item lg={4} md={6} sm={8} xs={10} style={{ margin: 'auto' }}>
        <Card style={{ width: '100%' }}>
          <CardHeader
            title="Đăng ký"
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
              <FormControl style={{ width: '100%' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Đăng ký
                </Button>
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
  Register: (history, payload) => dispatch(Register(history, payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Register));
