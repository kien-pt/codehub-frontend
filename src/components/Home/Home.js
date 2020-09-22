import { Grid } from '@material-ui/core';
import React from 'react';

import HomeCourses from '../../containers/Home/HomeCourses';
import HomeRank from '../../containers/Home/HomeRank';

function Home() {
  return (
    <Grid container spacing={3}>
      <Grid item md={9} xs={12}>
        <HomeCourses />
      </Grid>
      <Grid item md={3} xs={12}>
        <HomeRank />
      </Grid>
    </Grid>
  );
}

export default Home;
