import React from 'react';
import { Grid } from '@material-ui/core';

import HomeCourses from '../../containers/Home/HomeCourses';
import HomeRank from '../../containers/Home/HomeRank';

function Home() {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item lg={7} md={8} xs={12}>
        <HomeCourses />
      </Grid>
      <Grid item lg={3} md={4} xs={12}>
        <HomeRank />
      </Grid>
    </Grid>
  );
}

export default Home;
