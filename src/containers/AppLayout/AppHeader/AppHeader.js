import React from 'react';
import { connect } from 'react-redux';
import { Link, AppBar, Grid } from '@material-ui/core';
import { ExpandMore, AccountCircle } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import ROUTER from '../../../constant/router';

import code from '../../../assets/code.png';

function AppHeader(props) {
  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#39424E', padding: '0 20px' }}
      >
        <Grid container justify="center" style={{ height: 60 }}>
          <Grid item lg={5} sm={6}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Link href={ROUTER.HOME}>
                <img src={code} alt="logo" height="36px" style={{ padding: '10px 0' }} />
              </Link>
              <div
                style={{
                  cursor: 'pointer',
                  margin: '0 24px',
                  padding: '18px 6px 0',
                  borderBottom: 'solid 5px #1BA94C',
                }}
              >
                Bài tập
              </div>
            </div>
          </Grid>
          <Grid item lg={5} sm={6}>
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                float: 'right',
                padding: '18px 0',
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(AppHeader));
