import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  AppBar,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { AccountCircle } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import ROUTER from '../../../constant/router';
import logo from '../../../assets/logo.png';
import code from '../../../assets/code.png';
import AppLayout from '../../../components/AppLayout/AppLayout';

import { getQuiz } from '../../../reducer/quiz';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    flexGrow: 1,
  },
}));

function AppHeader(props) {
  useEffect(() => {
    props.getQuiz();
  }, []);
  
  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#39424E', padding: '0 20px' }}
      >
        <Grid container style={{ height: 60 }} spacing={3}>
          <Grid item md={1} xs={false} />
          <Grid item md={5} xs={false}>
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
          <Grid item md={5} xs={false}>
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: () => dispatch(getQuiz()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(AppHeader));
