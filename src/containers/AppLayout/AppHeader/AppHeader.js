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
  Avatar,
} from '@material-ui/core';
import { Person, ExitToApp, Build, ExpandMore, AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import code from '../../../assets/code.png';

import { getUserById } from '../../../reducer/users';

function AppHeader(props) {
  const history = useHistory();

  const userId = parseInt(sessionStorage.getItem("userId"));
  const expiredTime = Date.parse(sessionStorage.getItem("expiredTime"));
  const currentTime = Date.parse(new Date());

  const currentRoute = window.location.pathname;

  const isAdmin = props.user?.admin;
  const username = props.user?.username;
  const fullname = props.user?.fullname;

  const menuList = [
    {
      name: 'Bài tập',
      link: ROUTER.HOME,
    }
  ];
  if (isAdmin) menuList.push({
    name: 'Quản lý',
    link: ROUTER.MANAGER,
  });

  const itemFocus = 0;
  if (currentRoute === ROUTER.HOME) {
    
  }

  useEffect(() => {
    if (expiredTime - currentTime <= 0) logout();
    if (!(userId >= 0) && currentRoute !== ROUTER.REGISTER) history.push(ROUTER.LOGIN);
  }, [history, userId, currentTime]);

  useEffect(() => {
    if (userId >= 0) props.getUserById(userId);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogout, setLogout] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("expiredTime");
    history.push(ROUTER.LOGIN);
  }

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
              {
                menuList.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    style={{
                      height: 55,
                      color: 'white',
                      textDecoration: 'none',
                      margin: '0 12px',
                      padding: '0 8px',
                      cursor: 'pointer',
                      lineHeight: '60px',
                      borderBottom: (itemFocus === index) ? '5px solid #1BA94C' : 'none',
                    }}
                  >
                    {item.name}
                  </Link>
                ))
              }
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
                display: 'flex',
                flexDirection: 'row',
                float: 'right',
                cursor: 'pointer'
              }}
            >
              <Link href={ROUTER.HOME}>
                <img
                  src="https://i.pinimg.com/originals/63/db/21/63db2105d5418f5e5c7763d28d9ebb36.jpg"
                  alt="avatar" height="30px" style={{ padding: '15px 6px', borderRadius: '50%' }}
                />
              </Link>
              <div style={{ lineHeight: '60px' }}>{fullname}</div>
              <ExpandMore style={{ padding: '18px 0' }} />
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
          <Typography variant="inherit" noWrap>{username}</Typography>
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
          <Button
            onClick={() => setLogout(false)}
            color="secondary"
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              logout();
              setLogout(false);
            }}
            color="primary"
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: select(state, 'usersReducer', 'user'),
});

const mapDispatchToProps = (dispatch) => ({
  getUserById: (id) => dispatch(getUserById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(AppHeader));
