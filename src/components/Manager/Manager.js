import React from 'react';
import { Grid } from '@material-ui/core';

import Profile from '../../containers/User/Profile';
import UsersList from '../../containers/Manager/UsersList';

function Manager() {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item lg={7} md={8} xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  );
}

export default Manager;
