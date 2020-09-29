import React from 'react';
import {
  Link,
  AppBar,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { AccountCircle } from '@material-ui/icons';

import ROUTER from '../../../constant/router';
import logo from '../../../assets/logo.png';
import code from '../../../assets/code.png';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    flexGrow: 1,
  },
}));

function AppHeader() {
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#39424E', padding: '0 20px' }}
      >
        <Grid container style={{ height: 60 }} spacing={3}>
          <Grid item md={1} xs={0} />
          <Grid item md={5} xs={0}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Link href={ROUTER.HOME}>
                <img src={code} alt="logo" height="36px" />
              </Link>
              <div
                style={{
                  cursor: 'pointer',
                  padding: '6px 24px',
                }}
              >
                Bài tập
              </div>
            </div>
          </Grid>
          <Grid item md={5} xs={0}>
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                float: 'right',
                padding: '4px 0',
              }}
            >
              <AccountCircle style={{ padding: '0 4px' }} />
              18070737
              <ExpandMore />
            </div>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

export default AppHeader;
