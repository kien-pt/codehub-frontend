import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Link,
  Grid,
  Menu,
  AppBar,
  MenuItem,
  withStyles,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Person, ExitToApp, Build, ExpandMore, AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import code from '../../../assets/code.png';

function AppHeader(props) {
  const history = useHistory();

  const userId = parseInt(sessionStorage.getItem("userId"));
  const userName = props.students.find((student) => student.id === userId)?.name;
  const studentCode = props.students.find((student) => student.id === userId)?.code;

  useEffect(() => {
    if (!(userId >= 0)) history.push(ROUTER.LOGIN);
  }, [history, userId]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogout, setLogout] = useState(false);

  const handleSelect = () => {
    setLogout(true);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid black',
      minWidth: 180,
      width: anchorEl?.offsetWidth,
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#39424E', padding: '0 20px' }}
      >
        <Grid container justify="center" alignItems="center" style={{ height: 60 }}>
          {/*  Mobile  */}
          <Grid
            item
            xs={2}
            component={Box}
            display={{ xs: 'block', sm: 'none' }}
          >
            <IconButton style={{ color: 'white' }}>
              <Menu />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={8}
            component={Box}
            display={{ xs: 'block', sm: 'none' }}
          >
            <Link href={ROUTER.HOME}>
              <img src={code} alt="logo" height="36px" style={{ display: 'block', margin: '0 auto' }} />
            </Link>
          </Grid>
          <Grid
            item
            xs={2}
            component={Box}
            display={{ xs: 'block', sm: 'none' }}
          >
            <IconButton onClick={handleClick} style={{ float: 'right', color: 'white' }}>
              <AccountCircle />
            </IconButton>
          </Grid>

          {/*  Desktop  */}
          <Grid
            item
            sm={6}
            lg={5}
            component={Box}
            display={{ xs: 'none', sm: 'block' }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Link href={ROUTER.HOME}>
                <img src={code} alt="logo" height="36px" style={{ padding: '12px 0' }} />
              </Link>
              <div
                style={{
                  height: 55,
                  margin: '0 12px',
                  padding: '0 8px',
                  cursor: 'pointer',
                  lineHeight: '60px',
                  borderBottom: '5px solid #1BA94C',
                }}
              >
                Bài tập
              </div>
              <div
                style={{
                  height: 55,
                  margin: '0 12px',
                  padding: '0 8px',
                  cursor: 'pointer',
                  lineHeight: '60px',
                }}
              >
                API
              </div>
            </div>
          </Grid>
          <Grid
            item
            sm={6}
            lg={5}
            component={Box}
            display={{ xs: 'none', sm: 'block' }}
          >
            <div
              onClick={handleClick}
              style={{
                cursor: 'pointer',
                display: 'flex',
                float: 'right',
              }}
            >
              <AccountCircle style={{ padding: '0 4px' }} />
              {userName}
              <ExpandMore />
            </div>
          </Grid>
        </Grid>
      </AppBar>


      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Person fontSize="small" style={{ paddingRight: 16 }} />
          <Typography variant="inherit" noWrap>{studentCode}</Typography>
        </MenuItem>
        <MenuItem>
          <Build fontSize="small" style={{ paddingRight: 16 }} />
          <Typography variant="inherit" noWrap>Đổi mật khẩu</Typography>
        </MenuItem>
        <MenuItem onClick={handleSelect}>
          <ExitToApp fontSize="small" style={{ paddingRight: 16 }} />
          <Typography variant="inherit" noWrap>Đăng xuất</Typography>
        </MenuItem>
      </StyledMenu>


      <Dialog
        open={isLogout}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => setLogout(false)}
      >
        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có thực sự muốn đăng xuất khỏi hệ thống?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogout(false)} color="secondary">
            Huỷ
          </Button>
          <Button onClick={() => setLogout(false)} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  students: select(state, 'studentsReducer', 'students'),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(AppHeader));
