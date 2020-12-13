import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Avatar,
  Button,
  Divider,
  Snackbar,
  Typography,
  CardHeader,
  CardContent,
  FormControl,
  OutlinedInput,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { AssignmentInd, Person } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';

import { getProfile, updateUser } from '../../../reducer/users';

import './Profile.css';
import avatar from '../../../assets/avatar.jpg';

function Profile(props) {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [isEditting, setEditting] = useState(false);
  const [noti, setNoti] = useState(null);

  const { profile, profileId, getProfile } = props;
  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    getProfile(profileId);
  }, [getProfile, profileId]);

  useEffect(() => {
    setUsername(props.user?.username || '');
  }, [props.user]);

  useEffect(() => {
    setFullname(props.user?.fullname || '');
  }, [props.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateUser({
      id: parseInt(localStorage.getItem("userId")),
      username,
      fullname,
    })
    .then(result => setNoti(result))
    .catch();
    setEditting(false);
  }

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader title={<Avatar id="profile-avatar">{profile?.username[0].toUpperCase()}</Avatar>} style={{ backgroundColor: '#39424E', height: 32 }} />
      <CardContent style={{ height: 220 }} />
      <CardContent style={{ color: 'black' }}>
        <Typography variant="h5">{profile?.fullname}</Typography>
        <Typography variant="caption" display="block" style={{ color: 'a2a2a2' }}>{`@${profile?.username}`}</Typography>
        <div style={{ display: (profileId === userId) ? 'block' : 'none' }} >
          <Divider style={{ margin: '8px 0' }} />
          <form onSubmit={handleSubmit} style={{ display: isEditting ? 'block' : 'none', marginBottom: 4 }}>
            <FormControl style={{ width: '100%', paddingBottom: 6 }}>
              <OutlinedInput
                required
                placeholder="Tên đăng nhập"
                value={username}
                startAdornment={<Person position="start" />}
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 36 }}
              />
            </FormControl>
            <FormControl style={{ width: '100%', padding: '6px 0 12px 0' }}>
              <OutlinedInput
                required
                placeholder="Họ và tên"
                value={fullname}
                startAdornment={<AssignmentInd position="start" />}
                onChange={(e) => setFullname(e.target.value)}
                inputProps={{style: {fontSize: 18, paddingLeft: 10, marginLeft: 10 }}}
                style={{ height: 36 }}
              />
            </FormControl>
            <FormControl style={{ display: 'inline', width: '100%' }}>
              <Button variant="outlined" onClick={() => setEditting(false)} style={{ width: '48%' }}>Huỷ</Button>
              <Button variant="contained" color="primary" type="submit" style={{ width: '48%', float: 'right' }}>Lưu</Button>
            </FormControl>
          </form>
          <Button variant="outlined" onClick={() => setEditting(true)} style={{ display: isEditting ? 'none' : 'block', width: '100%' }}>
            Sửa thông tin
          </Button>
        </div>

        <Snackbar open={noti !== null} autoHideDuration={6000} onClose={() => setNoti(null)}>
          <Alert variant="filled" severity={noti?.type} onClose={() => setNoti(null)}>{noti?.message}</Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: select(state, 'usersReducer', 'user'),
  profile: select(state, 'usersReducer', 'profile'),
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch(getProfile(id)),
  updateUser: (payload) => dispatch(updateUser(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(Profile));
