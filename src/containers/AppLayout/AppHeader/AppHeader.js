import React from 'react';
import { Link, AppBar, Toolbar } from '@material-ui/core';

import ROUTER from '../../../constant/router';
import logo from '../../../assets/logo.png';

function AppHeader() {
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
            color="white"
            variant="h7"
            underline="none"
            style={{ cursor: 'pointer', padding: '0 16px', textAlign: 'center', fontWeight: 'bold' }}
          >
            Bài tập
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppHeader;
