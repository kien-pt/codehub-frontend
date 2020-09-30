import React from 'react';
import { Grid } from '@material-ui/core';

import HomeCourses from '../../containers/Home/HomeCourses';
import HomeRank from '../../containers/Home/HomeRank';

function Home() {
  return (
    <Grid container spacing={3}>
      <Grid item md={1} xs={false} />
      <Grid item md={7} xs={12}>
        <HomeCourses />
      </Grid>
      <Grid item md={3} xs={12}>
        <HomeRank />
      </Grid>
      <Grid item md={1} xs={false} />
    </Grid>
  );
}

export default Home;
