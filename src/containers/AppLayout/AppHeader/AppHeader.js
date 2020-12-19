import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Link,
  Grid,
  Menu,
  Drawer,
  AppBar,
  Avatar,
  Backdrop,
  MenuItem,
  withStyles,
  IconButton,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Person, ExitToApp, Build, ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

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
    isSolving,
    isFetchingQuiz,
    isFetchingTags,
    isFetchingUsers,
    isFetchingCourses,
    isFetchingComments,
    isFetchingSubmissions,
    isFetching_user_point,
    isFetching_server_point,
  } = props;

  const currentTime = Date.parse(new Date());
  const userId = parseInt(localStorage.getItem("userId"));
  const expiredTime = Date.parse(localStorage.getItem("expiredTime"));

  const currentRoute = window.location.pathname;

  const isAdmin = props.user?.admin;
  const username = props.user?.username;
  const fullname = props.user?.fullname;

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
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
          <Grid item sm={7} lg={6} component={Box} display={{ xs: 'none', sm: 'block' }}>
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
          <Grid item sm={5} lg={4} component={Box} display={{ xs: 'none', sm: 'block' }}>
            <div id="user-button" onClick={handleClick}>
              <Avatar style={{ width: 30, height: 30, fontSize: 15, margin: 'auto 4px' }}>{username ? username[0].toUpperCase() : ''}</Avatar>
              <div style={{ lineHeight: '60px' }}>{fullname}</div>
              <ExpandMore style={{ padding: '18px 0' }} />
            </div> 
          </Grid>











          <Grid item xs={1} component={Box} display={{ xs: 'block', sm: 'none' }}>
            <IconButton style={{ marginLeft: -12 }} onClick={() => setOpenMobileMenu(true)}>
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
          </Grid>
          <Grid item xs={10} component={Box} display={{ xs: 'block', sm: 'none' }}>
            <Link href={ROUTER.HOME} style={{ display: 'flex' }}>
              <img src={logo} alt="logo" height="36px" style={{ margin: '0 auto', padding: '12px 0' }} />
            </Link>
          </Grid>
          <Grid item xs={1} component={Box} display={{ xs: 'block', sm: 'none' }}>
            <Avatar onClick={handleClick} style={{ width: 30, height: 30, fontSize: 15, cursor: 'pointer', margin: 'auto 4px' }}>{username ? username[0].toUpperCase() : ''}</Avatar>
          </Grid>

          <Drawer open={openMobileMenu} onClose={() => setOpenMobileMenu(false)} style={{ width: '50%' }}>
            {
              menuList.map((item, index) => (
                <Link
                  className="app-menu-item"
                  key={item.name}
                  href={item.link}
                  style={{
                    margin: '12px 0',
                    lineHeight: '55px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    backgroundColor: (selectedId === index) ? '#1BA94C' : 'none',
                  }}
                >
                  {item.name}
                </Link>
              ))
            }
          </Drawer>
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
        open={
          isSolving ||
          isFetchingTags ||
          isFetchingQuiz ||
          isFetchingUsers ||
          isFetchingCourses ||
          isFetchingComments ||
          isFetchingSubmissions ||
          isFetching_user_point ||
          isFetching_server_point}
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
  isSolving: select(state, 'submissionsReducer', 'isSolving'),
  isFetchingUsers: select(state, 'usersReducer', 'isFetching'),
  isFetchingCourses: select(state, 'coursesReducer', 'isFetching'),
  isFetchingComments: select(state, 'commentsReducer', 'isFetching'),
  isFetchingSubmissions: select(state, 'submissionsReducer', 'isFetching'),
  isFetching_user_point: select(state, 'pointReducer', 'isFetching_user_point'),
  isFetching_server_point: select(state, 'pointReducer', 'isFetching_server_point'),
});

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
  getUserById: (id) => dispatch(getUserById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(AppHeader));
