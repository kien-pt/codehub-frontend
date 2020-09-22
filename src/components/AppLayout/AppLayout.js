import React from 'react';
import { Link, AppBar, Toolbar } from '@material-ui/core';

import ROUTER from '../../constant/router';
import logo from '../../assets/logo.png';

import Home from '../Home';

function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Link href={ROUTER.HOME}>
            <img src={logo} alt="logo" width="128px" />
          </Link>
          <Link
            color="inherit"
            variant="h5"
            underline="none"
            style={{ cursor: 'pointer', width: 80, textAlign: 'center' }}
          >
            Test
          </Link>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '96px 16px' }}>
        <Home />
      </div>
    </>
  );
}

export default App;
