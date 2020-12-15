import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Link,
  Grid,
  Menu,
  AppBar,
  Avatar,
  Backdrop,
  MenuItem,
  withStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Person, ExitToApp, Build, ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { logout, getUserById } from '../../../reducer/users';

import './AppHeader.css';
import logo from '../../../assets/logo.png';

import LogoutModal from '../LogoutModal';
import PasswordModal from '../PasswordModal';

function AppHeader(props) {
  const history = useHistory();

  const { logout, getUserById } = props;

  const {
    isFetchingTags,
    isFetchingUsers,
    isFetchingPoints,
    isFetchingCourses,
    isFetchingComments,
    isFetchingSubmissions,
  } = props;

  const currentTime = Date.parse(new Date());
  const userId = parseInt(localStorage.getItem("userId"));
  const expiredTime = Date.parse(localStorage.getItem("expiredTime"));

  const currentRoute = window.location.pathname;

  const isAdmin = props.user?.admin;
  const username = props.user?.username;
  const fullname = props.user?.fullname;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogout, setLogout] = useState(false);
  const [isPasswordModal, setPasswordModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

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

  if (currentRoute === ROUTER.HOME && selectedId !== 0) setSelectedId(0);
  if (currentRoute === ROUTER.MANAGER && selectedId !== 1) setSelectedId(1);

  // Auto Logout
  useEffect(() => {
    if (expiredTime - currentTime <= 0) logout(history);
    if (!(userId >= 0) && currentRoute !== ROUTER.REGISTER) history.push(ROUTER.LOGIN);
  }, [history, userId, currentTime, expiredTime, currentRoute, logout]);

  // Get User Information
  useEffect(() => {
    if (userId >= 0) getUserById(userId);
  }, [getUserById, userId]);

  // Handle select logout button
  const handleLogout = () => {
    setLogout(true);
    handleClose();
  };

  // Handle select change password button
  const handlePassword = () => {
    setPasswordModal(true);
    handleClose();
  };

  // Handle select user button
  const handleUser = () => {
    history.push(`${ROUTER.USER}/${userId}`);
    handleClose();
  };

  // Handle open menu
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  // Handle close menu
  const handleClose = () => setAnchorEl(null);

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
      <AppBar position="fixed" style={{ backgroundColor: '#39424E', padding: '0 20px' }}>
        <Grid container justify="center" alignItems="center" style={{ height: 60 }}>
          <Grid item sm={6} lg={5} component={Box} display={{ xs: 'none', sm: 'block' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Link href={ROUTER.HOME}>
                <img src={logo} alt="logo" height="36px" style={{ padding: '12px 0' }} />
              </Link>
              {
                menuList.map((item, index) => (
                  <Link
                    className="app-menu-item"
                    key={item.name}
                    href={item.link}
                    style={{
                      color: 'white',
                      margin: '0 12px',
                      textDecoration: 'none',
                      borderBottom: (selectedId === index) ? '5px solid #1BA94C' : 'none'
                    }}
                  >
                    {item.name}
                  </Link>
                ))
              }
            </div> 
          </Grid>
          <Grid item sm={6} lg={5} component={Box} display={{ xs: 'none', sm: 'block' }}>
            <div id="user-button" onClick={handleClick}>
              <Avatar style={{ width: 30, height: 30, fontSize: 15, margin: 'auto 4px' }}>{username ? username[0].toUpperCase() : ''}</Avatar>
              <div style={{ lineHeight: '60px' }}>{fullname}</div>
              <ExpandMore style={{ padding: '18px 0' }} />
            </div> 
          </Grid>
        </Grid>
      </AppBar>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleUser}>
          <Person fontSize="small" style={{ paddingRight: 16 }} />
          <Typography variant="inherit" noWrap>{username}</Typography>
        </MenuItem>
        <MenuItem onClick={handlePassword}>
          <Build fontSize="small" style={{ paddingRight: 16 }} />
          <Typography variant="inherit" noWrap>Đổi mật khẩu</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToApp fontSize="small" style={{ paddingRight: 16 }} />
          <Typography variant="inherit" noWrap>Đăng xuất</Typography>
        </MenuItem>
      </StyledMenu>

      <LogoutModal isLogout={isLogout} setLogout={setLogout} />
      <PasswordModal isPasswordModal={isPasswordModal} setPasswordModal={setPasswordModal} />

      <Backdrop
        open={isFetchingTags || isFetchingUsers || isFetchingCourses || isFetchingPoints || isFetchingComments || isFetchingSubmissions}
        style={{ zIndex: 10 }}
      >
        <CircularProgress />
      </Backdrop>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: select(state, 'usersReducer', 'user'),
  isFetchingTags: select(state, 'tagsReducer', 'isFetching'),
  isFetchingQuiz: select(state, 'quizReducer', 'isFetching'),
  isFetchingUsers: select(state, 'usersReducer', 'isFetching'),
  isFetchingPoints: select(state, 'pointReducer', 'isFetching'),
  isFetchingCourses: select(state, 'coursesReducer', 'isFetching'),
  isFetchingComments: select(state, 'commentsReducer', 'isFetching'),
  isFetchingSubmissions: select(state, 'submissionsReducer', 'isFetching'),
});

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
  getUserById: (id) => dispatch(getUserById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(AppHeader));
