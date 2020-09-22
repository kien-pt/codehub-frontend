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
import { AccountCircle } from '@material-ui/icons';

import ROUTER from '../../../constant/router';
import logo from '../../../assets/logo.png';

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
        style={{
          background: 'linear-gradient(90deg,#48b1bf,#677ebd)'
        }}
      >
        <Toolbar>
          <Link href={ROUTER.HOME}>
            <img src={logo} alt="logo" width="100px" />
          </Link>
          <Link
            href={ROUTER.HOME}
            className={classes.menuButton}
            style={{ padding: '0 16px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
          >
            <Typography variant="h7">Bài tập</Typography>
          </Link>
          <Typography variant="h7" style={{ padding: '0 16px'}}>Phạm Trung Kiên</Typography>
          <AccountCircle style={{ cursor: 'pointer' }} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppHeader;
