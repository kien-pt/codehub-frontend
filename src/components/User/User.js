import React from 'react';
import { Grid } from '@material-ui/core';

import Profile from '../../containers/User/Profile';
import SubmissionList from '../../containers/User/SubmissionList';

function User() {
  const temp = window.location.href.split('/');
  const profileId = parseInt(temp[temp.length - 1]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={3} md={4} xs={12}>
        <Profile profileId={profileId} />
      </Grid>
      <Grid item lg={7} md={8} xs={12}>
        <SubmissionList profileId={profileId} />
      </Grid>
    </Grid>
  );
}

export default User;
